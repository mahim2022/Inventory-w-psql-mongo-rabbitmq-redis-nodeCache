const pool = require("../db");
const publishToQueue = require("../helper/raabbitMq");

const getAllProducts = async (req, res) => {
	try {
		const { rows } = await pool.query("select * from products");
		res.status(200).json(rows);
	} catch (error) {
		res.status(401).json(error);
	}
};
const createProduct = async (req, res) => {
	const { productname, sku, productprice } = req.body;
	try {
		const { rows } = await pool.query(
			"insert into products(productname,sku,productprice) values($1,$2,$3) returning *",
			[productname, sku, productprice]
		);
		res.status(200).json(rows[0]);
		publishToQueue(rows[0], "create");
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
		res.status(200).json(rows[0]);
		publishToQueue(rows[0], "update");
	} catch (error) {
		res.status(401).json(error);
	}
};
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query("delete from products where products_id=$1", [id]);
		res.status(200).send("Delete Succesful");
		publishToQueue(id, "delete");
	} catch (error) {
		res.status(401).json(error);
	}
};

module.exports = {
	getAllProducts,
	deleteProduct,
	updateProduct,
	createProduct,
};
