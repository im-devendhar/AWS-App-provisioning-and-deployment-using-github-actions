
# VPC & Networking


output "vpc_id" {
  description = "ID of the main VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  value       = aws_vpc.main.cidr_block
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = [
    aws_subnet.public_subnet_1.id,
    aws_subnet.public_subnet_2.id
  ]
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = [
    aws_subnet.private_subnet_1.id,
    aws_subnet.private_subnet_2.id
  ]
}

output "igw_id" {
  description = "Internet Gateway ID"
  value       = aws_internet_gateway.igw.id
}

output "nat_gateway_id" {
  description = "NAT Gateway ID (in a public subnet)"
  value       = aws_nat_gateway.ngw.id
}

output "public_route_table_id" {
  description = "Public route table ID"
  value       = aws_route_table.public_rt.id
}

output "private_route_table_id" {
  description = "Private route table ID"
  value       = aws_route_table.private_rt.id
}


# Security Groups


output "alb_security_group_id" {
  description = "Security Group ID for the ALB"
  value       = aws_security_group.alb_sg.id
}

output "ec2_security_group_id" {
  description = "Security Group ID attached to the EC2 instance"
  value       = aws_security_group.ec2_sg.id
}


# ECR


output "ecr_repository_name" {
  description = "ECR repository name"
  value       = aws_ecr_repository.poc.name
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.poc.repository_url
}


# EC2


output "ec2_instance_id" {
  description = "EC2 instance ID (application node in private subnet)"
  value       = aws_instance.app.id
}

output "ec2_private_ip" {
  description = "Private IP of the EC2 instance"
  value       = aws_instance.app.private_ip
}

output "ec2_subnet_id" {
  description = "Subnet ID where the EC2 instance is placed"
  value       = aws_instance.app.subnet_id
}


# Load Balancer

output "alb_arn" {
  description = "Application Load Balancer ARN"
  value       = aws_lb.app.arn
}

output "alb_dns_name" {
  description = "Public DNS name of the ALB"
  value       = aws_lb.app.dns_name
}

output "alb_zone_id" {
  description = "Route53 zone ID to alias records to the ALB"
  value       = aws_lb.app.zone_id
}

output "alb_listener_http_arn" {
  description = "HTTP listener ARN for the ALB (port 80)"
  value       = aws_lb_listener.http.arn
}

output "alb_target_group_arn" {
  description = "Target group ARN for the app"
  value       = aws_lb_target_group.app_tg.arn
}

output "alb_target_group_name" {
  description = "Target group name for the app"
  value       = aws_lb_target_group.app_tg.name
}


output "app_endpoint_http" {
  description = "HTTP endpoint via ALB (use this to test your app)"
  value       = "http://${aws_lb.app.dns_name}"
}

output "app_container_port_hint" {
  description = "Application/container port expected by target group"
  value       = 8080
}

