const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = "order_queue";
    const nextQueue = "check_inventory_queue";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.assertQueue(nextQueue, {
      durable: true,
    });

    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      (msg) => {
        const order = JSON.parse(msg.content.toString());
        console.log(" [x] Received '%s'", order);

        // Simulate order validation
        setTimeout(() => {
          console.log(" [x] Validated order: %s", order.id);

          // Forward to the next stage
          channel.sendToQueue(nextQueue, Buffer.from(JSON.stringify(order)), {
            persistent: true,
          });

          channel.ack(msg);
        }, 1000);
      },
      {
        noAck: false,
      }
    );
  });
});
