const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = "package_order_queue";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      (msg) => {
        const order = JSON.parse(msg.content.toString());
        console.log(" [x] Received '%s'", order);

        // Simulate packaging order
        setTimeout(() => {
          console.log(" [x] Packaged order: %s", order.id);

          channel.ack(msg);
        }, 1000);
      },
      {
        noAck: false,
      }
    );
  });
});
