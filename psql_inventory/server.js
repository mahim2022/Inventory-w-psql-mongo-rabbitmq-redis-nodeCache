const app = require("./app");
const amqplib = require("amqplib");

////Server///
var PORT = 5001;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
/////////////

///////RabbitMq/////////////
(async () => {
	const queue = "tasks";
	const conn = await amqplib.connect(
		"amqps://anjsyyjb:1Mg1VT6yjF0iyHyq8L2VtP3wRkdqIkqv@armadillo.rmq.cloudamqp.com/anjsyyjb"
	);

	ch1 = await conn.createChannel();
	await ch1.assertQueue(queue);
	await ch1.assertQueue("create");
	await ch1.assertQueue("update");
	await ch1.assertQueue("delete");

	// Listener
	//   ch1.consume(queue, (msg) => {
	//     if (msg !== null) {
	//       console.log('Recieved:', msg.content.toString());
	//       ch1.ack(msg);
	//     } else {
	//       console.log('Consumer cancelled by server');
	//     }
	//   });

	// Sender
	// ch2 = await conn.createChannel();

	// setInterval(() => {
	// 	ch2.sendToQueue(queue, Buffer.from("something to do"));
	// }, 5000);
})();
////////
