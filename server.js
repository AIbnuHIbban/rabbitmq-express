const express = require("express");
const bodyParser = require("body-parser");
const createOrder = require("./producers/createOrder");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/order", (req, res) => {
  const order = req.body;
  order.id = new Date().getTime(); // Simulate unique ID
  createOrder(order);
  res.status(200).send("Order received");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
