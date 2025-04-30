# Prachita's Bakery Web Application – Design Decisions Report

## Project Overview

This full-stack bakery web application allows users to view products, place orders, and track them. It uses a containerized microservice architecture built with React, Flask, PostgreSQL, and RabbitMQ, all orchestrated with Docker Compose.

---

## Features

- View bakery products
- Add new products
- Place orders
- Track order status
- Background order processing via RabbitMQ

---

##  System Architecture Diagram (Text-based)

```plaintext
+------------------+         REST         +------------------+         ORM         +------------------+
|  React Frontend  | <------------------> |   Flask Backend  | <-----------------> |   PostgreSQL DB  |
+------------------+                      +------------------+                    +------------------+
                                                 |
                                                 |  Queue Message
                                                 v
                                        +------------------+
                                        |    RabbitMQ      |
                                        +------------------+
                                                 |
                                                 v
                                        +------------------+
                                        |   Python Worker  |
                                        +------------------+
```
---

## Setup Instructions

1. Prerequisites
    - Docker & Docker Compose installed
    - Git installed

2. Clone repo
    - git clone https://github.com/prachii604/Bakery.git
    - cd bakery-app

3. Start all services
    - docker-compose up --build

4. Access the application
    - Frontend: http://localhost:3000
    - Backend: http://localhost:5000
        - To list all the products: http://localhost:5000/products
        - To list all the orders: http://localhost:5000/order
        - To list status of specific order: http://localhost:5000/order/order_id
    - PostgreSQL: http://localhost:5432
    - RabbitMQ: http://localhost:15672



## API Documentation

### `GET /products`

-   **Description**: Fetch all available products.
    
-   **Response**:
    

`[  {  "id":  1,  "name":  "Chocolate Cake",  "price":  12.50  }, ... ]` 

----------

### `POST /products`

-   **Description**: Add a new product to the catalog.
    
-   **Request Body**:

`{  "name":  "Strawberry Tart",  "price":  6.75  }` 

-   **Response**:


`{  "message":  "Product added successfully"  }` 

----------

### `POST /order`

-   **Description**: Place a new order.
    
-   **Request Body**:

`{  "customer_name":  "Alice",  "product_id":  1  }` 

-   **Response**:

`{  "order_id":  7,  "status":  "Order received"  }` 

----------

### `GET /order/<order_id>`

-   **Description**: Check the status of an order.
    
-   **Example**:

`{  "order_id":  7,  "status":  "Processing"  }`




