var { Schema, model } = require("mongoose");

const productSchema = new Schema({
	products_id: Schema.Types.ObjectId,
	productname: Schema.Types.String,
	productprice: Schema.Types.Number,
	sku: Schema.Types.String,
	psql_id: Schema.Types.Number,
});

const products = model("products", productSchema);

module.exports = { products };
