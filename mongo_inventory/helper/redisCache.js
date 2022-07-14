var { createClient } = require("redis");

var REDIS_PORT = 6379;

var redisClient = createClient();

redisClient.on("error", async (err) => {
	// await redisClient.disconnect();
	console.log("Redis Client Error", err);
});

redisClient.connect().then(() => console.log(`Redis Server connected`));

module.exports = redisClient;
