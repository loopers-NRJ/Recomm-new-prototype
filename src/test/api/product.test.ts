import { describe, it } from "@jest/globals";
import app from "../request";
import type { Product, Model, Brand, Category } from "@prisma/client";

describe("product api", () => {
  describe("create product without userId, modelId, price, pictures, description", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/products").send({});
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create product without userId", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/products").send({
        modelId: "test",
        price: 100,
        pictures: ["test"],
        description: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create product without modelId", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/products").send({
        userId: "test",
        price: 100,
        pictures: ["test"],
        description: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create product without price", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/products").send({
        userId: "test",
        modelId: "test",
        pictures: ["test"],
        description: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create product without pictures", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/products").send({
        userId: "test",
        modelId: "test",
        price: 100,
        description: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create product without description", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/products").send({
        userId: "test",
        modelId: "test",
        price: 100,
        pictures: ["test"],
      });
      expect(res.statusCode).toBe(400);
    });
  });

  let product: Product | null = null;
  let model: Model | null = null;
  let brand: Brand | null = null;
  let category: Category | null = null;
  const userId: string = "64ca0736b0ea3441eab5dd47";
  describe("creating dummy brand, category, model", () => {
    it("should return a 200 status code", async () => {
      const res = await app.post("/api/brands").send({
        name: "test",
        picture: "test",
      });
      expect(res.statusCode).toBe(200);
      brand = res.body;
    });
    it("should return a 200 status code", async () => {
      const res = await app.post("/api/category").send({
        name: "test",
        picture: "test",
      });
      expect(res.statusCode).toBe(200);
      category = res.body;
    });

    it("should return a 200 status code", async () => {
      const res = await app.post("/api/models").send({
        name: "test",
        brandId: brand?.id,
        categoryIds: [category?.id],
      });

      expect(res.statusCode).toBe(200);
      model = res.body;
    });

    it("should return a 200 status code", async () => {
      const res = await app.post("/api/products").send({
        userId,
        modelId: model?.id,
        price: 100,
        pictures: ["test"],
        description: "test",
      });

      expect(res.statusCode).toBe(200);

      product = res.body;
    });
  });

  describe("get product", () => {
    it("should return a 200 status code", async () => {
      if (product === null) {
        throw new Error("product is null");
      }
      const res = await app.get(`/api/products/${product?.id}`);

      expect(res.statusCode).toBe(200);
    });
  });

  describe("update product", () => {
    it("should return a 200 status code", async () => {
      if (product === null) {
        throw new Error("product is null");
      }
      const res = await app.put(`/api/products/${product?.id}`).send({
        price: 1000,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(1000);
      product = res.body;
    });
  });

  describe("delete product", () => {
    it("should return a 200 status code", async () => {
      if (product === null) {
        throw new Error("product is null");
      }
      const res = await app.delete(`/api/products/${product.id}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("delete dummy brand, category, model", () => {
    it("should return a 200 status code", async () => {
      if (brand === null) {
        throw new Error("brand is null");
      }
      const res = await app.delete(`/api/brands/${brand.id}`);
      expect(res.statusCode).toBe(200);
    });

    it("should return a 200 status code", async () => {
      if (category === null) {
        throw new Error("category is null");
      }
      const res = await app.delete(`/api/category/${category.id}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
