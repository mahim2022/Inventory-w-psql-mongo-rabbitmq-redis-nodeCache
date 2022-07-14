var { products } = require("../schema/inventory");

const getAllProducts = async (req, res) => {
	try {
		const result = await products.find();

		res.status(200).json(result);
	} catch (error) {
		res.status(400).send(error);
	}
};
const createProduct = async (req, res) => {
	try {
		const { productname, productprice, sku } = req.body;
		const result = await products.create({ productname, productprice, sku });
		res.status(200).json(result);
	} catch (error) {
		res.status(400).send(error);
	}
};
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { productname, productprice, sku } = req.body;
		const result = await products.findByIdAndUpdate(
			{ _id: id },
			{ productname, productprice, sku }
		);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).send(error);
	}
};
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await products.findByIdAndDelete(id);
		res.status(200).json(result);
	} catch (error) {
		// res.status(400).send(`No file with the id ${error}`);
		res.status(400).send(`No file with _id : "${error.value}"`);
	}
};

module.exports = {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};
