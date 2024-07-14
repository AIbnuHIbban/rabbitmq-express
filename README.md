# Simple Order Processing System with RabbitMQ and Node.js

![Flow](https://github.com/AIbnuHIbban/rabbitmq-express/blob/master/flow.png?raw=true)

This project demonstrates an order processing system using RabbitMQ and Node.js. The system consists of three main stages: validating orders, checking inventory, and packaging orders. Each stage is handled by a separate consumer.

  
## Demo
[![Demo](https://github.com/AIbnuHIbban/rabbitmq-express/blob/master/screenshot.png?raw=true)](https://github.com/AIbnuHIbban/rabbitmq-express/raw/master/demo.mp4)

## Prerequisites

  

- Node.js

- RabbitMQ

  

## Project Structure
```bash
order-processing-system
├── consumers
│   ├── validateOrder.js
│   ├── checkInventory.js
│   └── packageOrder.js
├── producers
│   └── createOrder.js
├── server.js
└── README.md
```
## Installation  

1. Clone the repository:

```bash
git clone https://github.com/AIbnuHIbban/rabbitmq-express.git

cd rabbitmq-express
```

2. Install dependencies:

```bash
npm install
```


3. Ensure RabbitMQ is installed and running on your local machine.


## Running the Project

1. Start the server:

```bash
node server.js
```


2. Start the consumers in separate terminals or using a process manager like PM2:

```bash
node consumers/validateOrder.js
```

```bash
node consumers/checkInventory.js
```

```bash
node consumers/packageOrder.js
```

## How It Works

1.  **Submit an Order**:

- Send a POST request to `http://localhost:3000/order` with order details.

- Example using `curl`:

```bash
curl -X POST http://localhost:3000/order -H "Content-Type: application/json" -d '{"product":  "laptop",  "quantity":  1}'
```

2.  **Order Validation**:

- The `validateOrder.js` consumer reads the order from `order_queue`, validates it, and forwards it to `check_inventory_queue`.

3.  **Inventory Check**:

- The `checkInventory.js` consumer reads the order from `check_inventory_queue`, checks inventory, and forwards it to `package_order_queue`.

  

4.  **Order Packaging**:

- The `packageOrder.js` consumer reads the order from `package_order_queue` and simulates packaging the order.

## File Descriptions

-  **server.js**: Sets up an Express server to receive orders and send them to RabbitMQ.

-  **producers/createOrder.js**: Sends new orders to the `order_queue`.

-  **consumers/validateOrder.js**: Validates orders from `order_queue` and forwards them to `check_inventory_queue`.

-  **consumers/checkInventory.js**: Checks inventory for orders from `check_inventory_queue` and forwards them to `package_order_queue`.

-  **consumers/packageOrder.js**: Packages orders from `package_order_queue`.