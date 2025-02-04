const amqp = require("amqplib/callback_api");

function createOrder(order) {
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = "order_queue";
      const msg = JSON.stringify(order);

      channel.assertQueue(queue, {
        durable: true,
      });
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });

      console.log(" [x] Sent '%s'", msg);
    });
  });
}

module.exports = createOrder;
