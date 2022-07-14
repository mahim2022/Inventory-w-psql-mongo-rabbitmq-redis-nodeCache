require("dotenv").config();
var app = require("./app");

var PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`App running on ${PORT}`);
});

//rabbitMq///////////
const amqplib = require("amqplib");
const {
	createProduct,
	updateProduct,
	deleteProduct,
} = require("./rabbitMq/rabbitMq");

(async () => {
	const queue = "tasks";
	const conn = await amqplib.connect(
		"amqps://anjsyyjb:1Mg1VT6yjF0iyHyq8L2VtP3wRkdqIkqv@armadillo.rmq.cloudamqp.com/anjsyyjb"
	);

	const ch1 = await conn.createChannel();
	await ch1.assertQueue(queue);
	await ch1.assertQueue("create");
	await ch1.assertQueue("update");
	await ch1.assertQueue("delete");

	// Listener
	ch1.consume(queue, (msg) => {
		if (msg !== null) {
			console.log("Recieved:", msg.content.toString());
			ch1.ack(msg);
		} else {
			console.log("Consumer cancelled by server");
		}
	});

	ch1.consume("create", (msg) => {
		if (msg !== null) {
			const data = JSON.parse(msg.content.toString());
			ch1.ack(msg);

			createProduct(data);
		} else {
			console.log("Consumer cancelled by server");
		}
	});

	ch1.consume("update", (msg) => {
		if (msg !== null) {
			const data = JSON.parse(msg.content.toString());
			// createProduct(data);
			ch1.ack(msg);

			updateProduct(data);
			// console.log(data);
		} else {
			console.log("Consumer cancelled by server");
		}
	});

	ch1.consume("delete", (msg) => {
		if (msg !== null) {
			const data = JSON.parse(msg.content.toString());
			ch1.ack(msg);
			deleteProduct(data);

			// createProduct(data);
			// console.log(data);
			// updateProduct(data);
			// console.log(data);
		} else {
			console.log("Consumer cancelled by server");
		}
	});

	// Sender
	//   const ch2 = await conn.createChannel();

	//   setInterval(() => {
	//     ch2.sendToQueue(queue, Buffer.from('something to do'));
	//   }, 1000);
})();
/////
