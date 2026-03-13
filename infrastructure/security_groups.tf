# Public EC2 Security Group (allow HTTP 80 from Internet, optional SSH from your IP)
resource "aws_security_group" "ec2_public_sg" {
  name        = "ec2-public-sg"
  description = "Public EC2 SG: allow HTTP from Internet (and optional SSH)"
  vpc_id      = aws_vpc.main.id

  # HTTP for the site
  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # (Optional) SSH from YOUR laptop IP (replace x.x.x.x/32)
  # ingress {
  #   description = "Allow SSH from my IP"
  #   from_port   = 22
  #   to_port     = 22
  #   protocol    = "tcp"
  #   cidr_blocks = ["x.x.x.x/32"]
  # }

  # Egress anywhere
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "ec2-public-sg" }
}

