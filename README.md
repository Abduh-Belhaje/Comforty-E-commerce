# Comforty E-commerce

## Overview

Comforty E-commerce is a web application providing a seamless shopping experience, allowing users to browse products, manage their shopping cart, and complete purchases.


## Features

 - User registration and authentication
 - Product browsing and filtering
 - Shopping cart management
 - Order processing


## Technologies Used

 - Frontend: React, Tailwind CSS
 - Backend: Java Spring Boot
 - Database: PostgreSQL
 - Others: Docker, Stripe (for payments) , Amazon S3 for blob storage


## Getting Started

### Prerequisites

 - Docker 

### Starting

 - Clone thethe repository:
   ```sh
      git clone https://github.com/Abduh-Belhaje/Comforty-E-commerce.git

 - Pull the Backend image:
    ```sh
       docker pull abdo001/comforty:v2

  - Pull the Frontend image:
    ```sh
       docker pull rida999/comforty:v2

  - Run docker-compose file :
    ```sh
        cd backend
        docker-compose up -d --build
    
  - Restore the database Backup :
    ```sh
        docker exec -i postgres-db psql -U postgres -d comfortyDB < backup.sql



## Contact

For any questions or feedback, please feel free to open an issue on GitHub Issues.


