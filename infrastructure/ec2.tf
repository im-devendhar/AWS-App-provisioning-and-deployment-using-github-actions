
locals {
  ubuntu_ssm_path = "/aws/service/canonical/ubuntu/server/${var.ubuntu_release}/stable/current/amd64/hvm/ebs-gp3/ami-id"
}

data "aws_ssm_parameter" "ubuntu_ami" {
  name = local.ubuntu_ssm_path
}

# IAM (unchanged)
data "aws_iam_policy_document" "ec2_trust" {
  statement {
    actions = ["sts:AssumeRole"]
    principals { type = "Service" identifiers = ["ec2.amazonaws.com"] }
  }
}

resource "aws_iam_role" "ec2_role" {
  name               = "ec2-ecr-ssm-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_trust.json
}

resource "aws_iam_role_policy_attachment" "ecr_read" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_role_policy_attachment" "ssm_core" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2-ecr-ssm-profile"
  role = aws_iam_role.ec2_role.name
}

# PUBLIC EC2 (Ubuntu)
resource "aws_instance" "app" {
  ami                         = data.aws_ssm_parameter.ubuntu_ami.value   # <-- Ubuntu AMI
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.public_subnet_1.id             # keep public if you want public EC2
  associate_public_ip_address = true

  vpc_security_group_ids = [aws_security_group.ec2_public_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  # Ubuntu user_data (apt, ubuntu user, SSM agent)
  user_data = <<-EOF
    #!/bin/bash
    set -euxo pipefail

    # Update & install tools
    apt-get update -y
    apt-get install -y docker.io curl unzip

    systemctl enable --now docker
    usermod -aG docker ubuntu || true

    # Install & enable SSM Agent (snap preferred; fall back to deb)
    if command -v snap >/dev/null 2>&1; then
      snap install core || true
      snap install amazon-ssm-agent --classic || true
      systemctl enable --now snap.amazon-ssm-agent.amazon-ssm-agent.service || true
    else
      curl -fsSL -o /tmp/ssm.deb https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/debian_amd64/amazon-ssm-agent.deb
      dpkg -i /tmp/ssm.deb || apt-get install -f -y
      systemctl enable --now amazon-ssm-agent
    fi
  EOF

  tags = {
    Name = "app-ec2-ubuntu"
  }
}
