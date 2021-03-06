# Shopping-cart-app

Description:
 - This app shows a simple shopping cart implementation

#### Approach:
 - A cart is uniquely identifiable so that it can be abandoned and retrieved by its ID
 - A cart can contain many items/products
 - An item should contain basic information(price, name, and quantity)
 - A cart contain information about aggregate information such as total summaries
(subtotal, discounts, taxes, total)
 
## Features and Requirements

- [Node](https://nodejs.org/en/download/current/)
- Mongoose ([Mongoose](http://mongoosejs.com/))
- Load environment variables from .env
- [Yarn] (https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## postman-collection
- [collection] (https://www.getpostman.com/collections/c68aa6c9f1e30b559640)

## Getting Started

#### Clone the repo and make it yours:

```bash
git clone https://github.com/kazeem08/shopping-cart.git
```

```
cd shopping-cart
```

```
rm -rf .git
```

#### Install dependencies:
 
```bash
 yarn
```

#### Set environment variables:

- set environment variables for the application by using the env.sample.txt as a guide

## Running the application

The command below starts the application

```bash
yarn start
```


## schema design
<p align="center">
  <a href="https://ibb.co/P9F9qhx"><img src="https://i.ibb.co/F0m0Rw6/Screenshot-2022-02-07-at-09-44-17.png" alt="Screenshot-2022-02-07-at-09-44-17" border="0"></a><br />
</p>