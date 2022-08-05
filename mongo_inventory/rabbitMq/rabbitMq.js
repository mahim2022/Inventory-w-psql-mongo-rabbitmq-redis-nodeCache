var { products } = require("../schema/inventory");

const createProduct = async (data) => {
	try {
		const { productname, productprice, sku } = data;
		const psql_id = data.products_id;
		const found = await products.findOne({ psql_id: psql_id });
		if (!found) {
			const result = await products.create({
				productname,
				productprice,
				sku,
				psql_id,
			});
			// console.log(`product created`);
			if (result) {
				return result;
			}
		} else {
			console.log(`Product already exists`);
		}
		// res.status(200).json(result);
	} catch (error) {
		// res.status(400).send(error);
		console.log(`product creation unsuccesful ${error}`);
	}
};
const updateProduct = async (data) => {
	try {
		const { productname, productprice, sku, products_id } = data;
		const find = await products.findOne({ psql_id: products_id });
		if (find) {
			const result = await products.findOneAndUpdate(
				{ psql_id: products_id },
				{ productname, productprice, sku }
			);
			console.log(`Product Updated`);
		} else {
			console.log(`Error no docs with id`);
		}
	} catch (error) {
		res.status(400).send(error);
	}
};
const deleteProduct = async (data) => {
	try {
		await products.deleteMany({ psql_id: data });
		// res.status(200).send("Deletion Succesful");
		console.log("Mongo Deletion Success");
	} catch (error) {
		// res.status(400).send(error.message);
		console.log(error.message);
	}

	// try {
	// 	const find = await products.findOne({ psql_id: id });
	// 	if (find) {
	// 		await products.findByIdAndDelete(find._id);
	// 		console.log(`product deleted`);
	// 	} else {
	// 		console.log(`Error no doc with such id`);
	// 	}
	// 	// res.status(200).json(result);
	// } catch (error) {
	// 	// res.status(400).send(`No file with the id ${error}`);
	// 	res.status(400).send(`No file with _id : "${error.value}"`);
	// }
};

module.exports = {
	createProduct,
	updateProduct,
	deleteProduct,
};
