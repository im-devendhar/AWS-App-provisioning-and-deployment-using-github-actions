# EC2 Outputs (public)
output "ec2_instance_id" {
  description = "Public EC2 instance ID"
  value       = aws_instance.app.id
}

output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.app.public_ip
}

output "ec2_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.app.public_dns
}

output "site_url" {
  description = "Direct HTTP URL to test your app"
  value       = "http://${aws_instance.app.public_dns}"
}

