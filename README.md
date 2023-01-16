# merchant-service-api
[![Generic badge](https://img.shields.io/badge/npm-v14.16.1-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/node-6.14.12-green.svg)](https://shields.io/)


RESTful API for merchant service built with ExpressJS
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [RESTful API Endpoints](#restful-api-endpoints)
* [Setup](#setup)

## General info
Merchant Service app is service that handles the catalog of products owned by merchants. The user of this service is merchant. This service allows merchants to register or create account and remove its account. When a merchant registers, their password is hashed and stored in the database for added security. The application also includes features for merchants to manage their products, such as adding, viewing, updating, and deleting products. This merchant service app built using Node.js, a popular JavaScript runtime for building server-side applications. It also uses Sequelize, an ORM (Object-Relational Mapping) library for Node.js. This application use MySQL Database as the persistence storage.

### Architecture Diagram of Merchant Service
![architecture-diagram](/src/assets/image/merchant-service-architecture.png)
* **Merchant Service App:** This is the frontend application that users interact with to register, login, and browse/add products.
* **API Gateway:** This component acts as an entry point for incoming API requests. It routes requests to the appropriate service and can also handle tasks such as authentication.
* **Merchant Service:** This component provides the core functionality for the merchant, such as managing products and adding merchants.
* **Merchant Service Database:** This component stores all the data related to merchants and products, such as merchant and product information, user information, and other records.

### ERD of Merchant Service
![erd](/src/assets/image/merchants-service-erd.png)

This merchant service has two entities :
* **Merchants:** which represents a merchant or a business user that sells products.
* **Products:** which represents the products that are sold by merchants.

The relationship between these entities is a **one-to-many** relationship, which means that one merchant can have many products but one product is associated with only one merchant. 


## Technologies
Project is created with:
* node : 14.16.1
* express : 4.18.2
* sequelize : 6.27.0
* mysql2 : 2.3.3

## RESTful API Endpoints
### API Endpoints
RESTful API Endpoints are shown in the table below:
| Method | Endpoint | Description |
| --- | --- | --- | 
| POST | `/api/auth/register` | Register merchant as user | 
| POST | `/api/auth/login` | Login merchant |
| GET | `/api/merchant` | list of merchants |
| GET | `/api/merchant/{id}` | Get a merchant |
| PUT | `/api/merchant/{id}` | Update a merchant |
| DELETE | `/api/merchant/{id}` | Delete a merchant |
| POST | `/api/merchant/product` | Add product |
| GET | `/api/merchant/{merchantId}/product` | Get products from a merchant |
| GET | `/api/merchant/{merchantId}/product/{id}` | Get a specific product from a merchant |
| PUT | `/api/merchant/{merchantId}/product/{id}` | Update a specific product from a merchant |
| DELETE | `/api/merchant/{merchantId}/product/{id}` | Delete a specific product from a merchant |

### API Endpoint parameters
```
POST /api/auth/register
```
| Parameter | Type | Description | 
| --- | --- | ---|
| name | string | **Required**. Minimum length : 3, Maximum length : 50 |
| email | string | **Required**. Must be an email, Minimum length : 10 |
| password | string | **Required**. Minimum length : 6 |
| address | text | **Required** | |
| phone_number | number | **Required** |
```
POST /api/auth/login
```
| Parameter | Type | Description | 
| --- | --- | --- |
| email | string | **Required**. Must be an email, Minimum length : 10 |
| password | string | **Required**. Minimum length : 6 |
```
PUT /api/merchant/:id
```
| Parameter | Type | Description | 
| --- | --- | --- |
| name | string | **Required**. Minimum length : 3, Maximum length : 50 |
| email | string | **Required**. Must be an email, Minimum length : 10 |
| password | string | **Required**. Minimum length : 6 |
| address | text | **Required** | |
| phone_number | number | **Required** |
```
POST /api/merchant/product
```
| Parameter | Type | Description | 
| --- | --- | --- |
| merchant_id | number | **Optional** |
| name | string | **Required**. Minimum length : 3, Maximum length : 50 |
| quantity | number | **Required**. Minimum : 1 |
| price | number | **Required**. Minimum : 1000 |
```
PUT /api/merchant/:merchantId/product/:id
```
| Parameter | Type | Description | 
| --- | --- | --- |
| name | string | **Required**. Minimum length : 3, Maximum length : 50 |
| quantity | number | **Required**. Minimum : 1 |
| price | number | **Required**. Minimum : 1000 |

### Postman Collection
You can test this API by using the postman application. Please [**Click here**](https://github.com/androsyahreza/merchant-service-api/tree/main/src/assets/postman-collection) to view the postman collection that was created for this application.

## Setup
To run this project, install it locally using npm:
```
$ cd merchant-service-api
$ npm install
$ npm start
```
