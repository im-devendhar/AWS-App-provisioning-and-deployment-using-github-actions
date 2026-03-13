
# ALB Security Group
resource "aws_security_group" "alb_sg" {
  name        = "alb-sg"
  description = "ALB security group: allow HTTP from Internet"
  vpc_id      = aws_vpc.main.id

  # Inbound 80 from anywhere (add 443 later with ACM)
  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Egress anywhere
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "alb-sg" }
}


# EC2 Security Group
resource "aws_security_group" "ec2_sg" {
  name        = "ec2-sg"
  description = "EC2 app SG: allow only from ALB on 8080"
  vpc_id      = aws_vpc.main.id

 
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "ec2-sg" }
}


# Allow ALB -> EC2 on app port (8080)

resource "aws_security_group_rule" "alb_to_ec2_8080" {
  type                     = "ingress"
  description              = "ALB to EC2 on 8080"
  from_port                = 8080
  to_port                  = 8080
  protocol                 = "tcp"
  security_group_id        = aws_security_group.ec2_sg.id
  source_security_group_id = aws_security_group.alb_sg.id
}
