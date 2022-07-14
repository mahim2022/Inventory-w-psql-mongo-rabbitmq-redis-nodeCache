var request = require("supertest");
var app = require("../app");

describe("crud", () => {
	it.skip("getAll", () => {
		return request(app)
			.get("/inventory")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							_id: expect.any(String),
							productname: expect.any(String),
							productprice: expect.any(Number),
							sku: expect.any(String),
							__v: expect.any(Number),
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
						_id: expect.any(String),
						productname: "Jacket",
						productprice: 1000,
						sku: "20",
						__v: expect.any(Number),
					})
				);
			});
	}, 10000);
	it.skip("update", () => {
		var id = "62c922caf2d3a66c8d3743cf";
		return request(app)
			.patch(`/inventory/${id}`)
			.send({ productname: "T-shirt", sku: 20, productprice: 3000 })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						_id: "62c922caf2d3a66c8d3743cf",
						productname: "T-shirt",
						productprice: 3000,
						sku: "20",
						__v: expect.any(Number),
					})
				);
			});
	});
	it.skip("delete", () => {
		const id = "62c938151397ee704158e2b1";
		return request(app).delete(`/inventory/${id}`).expect(200);
	});
	it.skip("delete invalid id", () => {
		const id = "1234";
		return request(app).delete(`/inventory/${id}`).expect(400);
	});
});
