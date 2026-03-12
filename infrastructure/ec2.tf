resource "aws_instance" "example" {
  ami                         = "resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64"
  instance_type               = "t3.micro"

  subnet_id                   = aws_subnet.public_subnet_1.id
  associate_public_ip_address = true    

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  key_name               = "prod.pem"   # For SSH

  tags = {
    Name = "HelloWorld"
  }
}

resource "aws_security_group" "ec2_sg" {
  name   = "ec2-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["YOUR_IP/32"]   # use your laptop IP
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}