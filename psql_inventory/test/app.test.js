var request = require("supertest");
var app = require("../app");

describe("controllers", () => {
	it("getAll", () => {
		return request(app)
			.get("/inventory")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							products_id: expect.any(Number),
							productname: expect.any(String),
							productprice: expect.any(Number),
							sku: expect.any(String),
						}),
					])
				);
			});
	});
	it.skip("create", () => {
		return request(app)
			.post("/inventory")
			.send({ productname: "Jacket", sku: 20, productprice: 1000 })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						products_id: expect.any(Number),
						productname: expect.any(String),
						productprice: expect.any(Number),
						sku: expect.any(String),
					})
				);
			});
	});

	it.skip("update", () => {
		var id = 1;
		return request(app)
			.patch(`/inventory/${id}`)
			.send({ productname: "T-shirt", sku: 20, productprice: 1000 })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						products_id: expect.any(Number),
						productname: expect.any(String),
						productprice: expect.any(Number),
						sku: expect.any(String),
					})
				);
			});
	});
	it.skip("delete", () => {
		const id = 12;
		return request(app)
			.delete(`/inventory/${id}`)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				console.log(res);
			});
	});
});
