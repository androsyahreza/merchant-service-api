# merchant-service-api
[![Generic badge](https://img.shields.io/badge/npm-v14.16.1-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/node-6.14.12-green.svg)](https://shields.io/)


RESTful API for merchant service built with ExpressJS
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [RESTful API Endpoints](#restful-api-endpoints)
* [Setup](#setup)

## General info
This is a simple merchant service RESTful API project using nodeJS, expressJS, and sequelize. The database used in this project is MySQL. 

## Technologies
Project is created with:
* node : 14.16.1
* express : 4.18.2
* sequelize : 6.27.0
* mysql2 : 2.3.3

## RESTful API Endpoints
RESTful API Endpoints are shown in the table below:
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register` | Register merchant as user |
| POST | `/login` | Login merchant |
| GET | `/merchant` | list of merchants |
| GET | `/merchant/{id}` | Get a merchant |
| PUT | `/merchant/{id}` | Update a merchant |
| DELETE | `/merchant/{id}` | Delete a merchant |
| POST | `/merchant/product` | Add product |
| GET | `/merchant/{merchantId}/product` | Get products from a merchant |
| GET | `/merchant/{merchantId}/product/{id}` | Get a specific product from a merchant |
| PUT | `/merchant/{merchantId}/product/{id}` | Update a specific product from a merchant |
| DELETE | `/merchant/{merchantId}/product/{id}` | Delete a specific product from a merchant |

## Setup
To run this project, install it locally using npm:
```
$ cd provinces-cities-api
$ npm install
$ npm start
```
