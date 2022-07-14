var express = require("express");

var router = express.Router();
var {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/inventory");
const productsCache = require("../middleWare/productsCache");

router.get("/", productsCache, getAllProducts);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
