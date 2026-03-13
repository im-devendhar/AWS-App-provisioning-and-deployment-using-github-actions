resource "aws_ecr_repository" "poc" {
  name                 = "poc-repo"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = { Name = "poc-repo" }
}

resource "aws_ecr_lifecycle_policy" "poc" {
  repository = aws_ecr_repository.poc.name
  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection    = {
          tagStatus     = "any"
          countType     = "imageCountMoreThan"
          countNumber   = 10
        }
        action = { type = "expire" }
      }
    ]
  })
}
