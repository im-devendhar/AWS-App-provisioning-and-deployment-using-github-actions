resource "aws_lb" "app" {
  name               = "app-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
  security_groups    = [aws_security_group.alb_sg.id]
  tags = { Name = "app-alb" }
}

resource "aws_lb_target_group" "app_tg" {
  name     = "app-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  health_check {
    path = "/"
    port = "traffic-port"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.app.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

resource "aws_lb_target_group_attachment" "ec2" {
  target_group_arn = aws_lb_target_group.app_tg.arn
  target_id        = aws_instance.app.id
  port             = 8080
}

output "alb_dns_name" {
  value = aws_lb.app.dns_name
}
