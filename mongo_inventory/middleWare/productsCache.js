var myCache = require("../helper/nodeCache");
const redisClient = require("../helper/redisCache");

const productsCache = async (req, res, next) => {
	const data = myCache.get("allProductsMongo");
	const redisData = await redisClient.get("allProductsMongo");
	if (redisData != null) {
		res.status(200).send(redisData);
		console.log(`redisCache`);
	} else if (data != null) {
		res.status(200).send(data);
		console.log(`nodeCache`);
	} else {
		console.log(`did not hit cache`);
		next();
	}
};
module.exports = productsCache;
