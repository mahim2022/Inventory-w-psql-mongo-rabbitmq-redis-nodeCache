var express = require("express");
var router = express.Router();
var {
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/inventory");
var productsCache = require("../middleware/productsCache");

router.get("/", productsCache, getAllProducts);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.post("/delete", deleteProduct);

module.exports = router;
