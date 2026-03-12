var "region" {
    default = "us-east-1"
}

var "vpc_cidr" {
    default = "10.0.0.0/16"
}

var "public_subnet_1_cidr"{
    default = "10.0.1.0/24"
}

var "public_subnet_2_cidr"{
    default = "10.0.2.0/24"
}

var "private_subnet_1_cidr"{
    default = "10.0.3.0/24"
}

var "private_subnet_2_cidr"{
    default = "10.0.4.0/24"
}