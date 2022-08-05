const pool = require("../db");
const publishToQueue = require("../helper/raabbitMq");
var myCache = require("../helper/nodeCache");
var redisClient = require("../helper/redisCache");

async function getAllProducts(req, res) {
	try {
		const { rows } = await pool.query("select * from products");
		res.status(200).json(rows);
		myCache.set("allProducts", rows);
		redisClient.setEx("allProducts", 30, JSON.stringify(rows));
	} catch (error) {
		res.status(401).json(error);
	}
}
const createProduct = async (req, res) => {
	const { productname, sku, productprice } = req.body;
	try {
		const { rows } = await pool.query(
			"insert into products(productname,sku,productprice) values($1,$2,$3) returning *",
			[productname, sku, productprice]
		);

		publishToQueue(rows[0], "create");
		res.status(200).json(rows[0]);
	} catch (error) {
		res.status(401).json(error);
	}
};
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { productname, sku, productprice } = req.body;
		const { rows } = await pool.query(
			"update products set productname=$1,productprice=$2,sku=$3 where products_id=$4 returning *",
			[productname, productprice, sku, id]
		);
		publishToQueue(rows[0], "update");
		res.status(200).json(rows[0]);
	} catch (error) {
		res.status(401).json(error);
	}
};
const deleteProduct = async (req, res) => {
	try {
		// const { id } = req.params;
		const { itemsForDeletion } = req.body;
		await pool.query(`delete from products where products_id=ANY($1)`, [
			itemsForDeletion,
		]);
		res.status(200).send("Delete Succesful");
		publishToQueue(itemsForDeletion, "delete");
		console.log("Deleted from psql");
	} catch (error) {
		res.status(401).send(`Psql Error, Message:${error.message}`);
	}
};

module.exports = {
	getAllProducts,
	deleteProduct,
	updateProduct,
	createProduct,
};
