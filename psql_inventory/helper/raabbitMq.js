const amqp = require("amqplib");

const connectToChannel = async () => {
	try {
		let connection = await amqp.connect(
			"amqps://anjsyyjb:1Mg1VT6yjF0iyHyq8L2VtP3wRkdqIkqv@armadillo.rmq.cloudamqp.com/anjsyyjb"
		);
		return connection.createChannel();
	} catch (e) {
		console.error("failed to create amqp channel: ", e);
	}
};

let channel;
module.exports = publishToQueue = async (data, queueName) => {
	if (channel == null) {
		channel = await connectToChannel();
	}
	return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
};
