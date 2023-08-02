import { describe, it } from "@jest/globals";
import app from "../request";
import type { Brand, Category, Model } from "@prisma/client";

describe("model api", () => {
  describe("create model without name, brandId, categoryIds", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/models").send({});
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create model without name", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/models").send({
        brandId: "test",
        categoryIds: ["test"],
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create model without brandId", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/models").send({
        name: "test",
        categoryIds: ["test"],
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create model without categoryIds", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/models").send({
        name: "test",
        brandId: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });

  let model: Model | null = null;
  let brand: Brand | null = null;
  let category: Category | null = null;

  describe("creating 1 brand and 1 category for model", () => {
    it("should return a 200 status code", async () => {
      const resBrand = await app.post("/api/brands").send({
        name: "test",
        picture: "test",
      });

      expect(resBrand.statusCode).toBe(200);
      expect(resBrand.body).toHaveProperty("id");
      expect(resBrand.body).toHaveProperty("createdAt");
      expect(resBrand.body).toHaveProperty("updatedAt");
      expect(resBrand.body.name).toBe("test");
      expect(resBrand.body.picture).toBe("test");
      brand = resBrand.body;

      const resCategory = await app.post("/api/category").send({
        name: "test",
        picture: "test",
      });
      expect(resCategory.statusCode).toBe(200);
      expect(resCategory.body).toHaveProperty("id");
      expect(resCategory.body).toHaveProperty("createdAt");
      expect(resCategory.body).toHaveProperty("updatedAt");
      expect(resCategory.body.name).toBe("test");
      category = resCategory.body;
    });
  });

  describe("create model with name, brandId, categoryIds", () => {
    it("should return a 200 status code", async () => {
      if (brand == null || category == null) {
        throw new Error("brandId or categoryId is null");
      }
      const res = await app.post("/api/models").send({
        name: "test",
        brandId: brand.id,
        categoryIds: [category.id],
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test");
      expect(res.body.brandId).toBe(brand.id);
      expect(res.body.categoryIds).toEqual([category.id]);
      model = res.body;
    });
  });

  describe("get model by id", () => {
    it("should return a 200 status code", async () => {
      if (model == null) {
        throw new Error("model is null");
      }
      const res = await app.get(`/api/models/${model.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test");
      expect(res.body.brandId).toBe(brand?.id);
      expect(res.body.categoryIds).toEqual([category?.id]);
    });
  });

  describe("update model by id", () => {
    it("should return a 200 status code", async () => {
      if (model == null) {
        throw new Error("model is null");
      }
      const res = await app.put(`/api/models/${model.id}`).send({
        name: "test2",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe("test2");

      model = res.body;
    });
  });

  describe("delete model by id", () => {
    it("should return a 200 status code", async () => {
      if (model == null) {
        throw new Error("model is null");
      }
      const res = await app.delete(`/api/models/${model.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe("test2");
    });
  });

  describe("delete brand by id", () => {
    it("should return a 200 status code", async () => {
      if (brand == null) {
        throw new Error("brand is null");
      }
      const res = await app.delete(`/api/brands/${brand.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe("test");
    });
  });

  describe("delete category by id", () => {
    it("should return a 200 status code", async () => {
      if (category == null) {
        throw new Error("category is null");
      }
      const res = await app.delete(`/api/category/${category.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe("test");
    });
  });
  describe("checking if everything is deleted", () => {
    it("should return a 404 status code", async () => {
      if (model == null) {
        throw new Error("model is null");
      }
      const res = await app.get(`/api/models/${model.id}`);
      expect(res.statusCode).toBe(404);
    });

    it("should return a 404 status code", async () => {
      if (brand == null) {
        throw new Error("brand is null");
      }
      const res = await app.get(`/api/brands/${brand.id}`);
      expect(res.statusCode).toBe(404);
    });

    it("should return a 404 status code", async () => {
      if (category == null) {
        throw new Error("category is null");
      }
      const res = await app.get(`/api/categories/${category.id}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
