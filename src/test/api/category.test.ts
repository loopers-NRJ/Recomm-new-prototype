import { describe, it } from "@jest/globals";
import app from "../request";
import type { Category } from "@prisma/client";

let category: Category | null = null;

describe("category api", () => {
  describe("create category without name and picture", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/category").send({});
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create category without name", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/category").send({
        picture: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create category without picture", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/category").send({
        name: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("create category with name and picture", () => {
    it("should return a 200 status code", async () => {
      const res = await app.post("/api/category").send({
        name: "test",
        picture: "test",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test");
      expect(res.body.picture).toBe("test");
      category = res.body;
    });
  });

  describe("get category with id", () => {
    it("should return a 200 status code", async () => {
      if (category == null) {
        throw new Error("categoryId is null");
      }
      const res = await app.get(`/api/category/${category.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test");
      expect(res.body.picture).toBe("test");
    });
  });
  describe("get category with invalid id", () => {
    it("should return a 404 status code", async () => {
      const res = await app.get(`/api/category/invalid`);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("get category with non-existent id", () => {
    it("should return a 404 status code", async () => {
      const res = await app.get(`/api/category/5f9a9b2c9d9a9b2c9d9a9b2c`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("update category with id", () => {
    it("should return a 200 status code", async () => {
      if (category == null) {
        throw new Error("categoryId is null");
      }
      const res = await app.put(`/api/category/${category.id}`).send({
        name: "test2",
        picture: "test2",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test2");
      expect(res.body.picture).toBe("test2");
    });
  });
  describe("update category with invalid id", () => {
    it("should return a 400 status code", async () => {
      const res = await app.put(`/api/category/invalid`).send({
        name: "test2",
        picture: "test2",
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("update category with non-existent id", () => {
    it("should return a 404 status code", async () => {
      const res = await app.put(`/api/category/5f9a9b2c9d9a9b2c9d9a9b2c`).send({
        name: "test2",
        picture: "test2",
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("get all categories", () => {
    it("should return a 200 status code", async () => {
      const res = await app.get(`/api/category`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("createdAt");
      expect(res.body[0]).toHaveProperty("updatedAt");
      expect(res.body[0].name).toBe("test2");
      expect(res.body[0].picture).toBe("test2");
    });
  });

  describe("delete category with id", () => {
    it("should return a 200 status code", async () => {
      if (category == null) {
        throw new Error("categoryId is null");
      }
      const res = await app.delete(`/api/category/${category.id}`);
      expect(res.statusCode).toBe(200);
    });
  });
  describe("delete category with invalid id", () => {
    it("should return a 400 status code", async () => {
      const res = await app.delete(`/api/category/invalid`);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("delete category with non-existent id", () => {
    it("should return a 404 status code", async () => {
      const res = await app.delete(`/api/category/5f9a9b2c9d9a9b2c9d9a9b2c`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("check if category was deleted", () => {
    it("should return a 200 status code", async () => {
      const res = await app.get(`/api/category`);
      expect(res.statusCode).toBe(200);
      if (category == null) {
        throw new Error("categoryId is null");
      }
      expect(res.body).not.toContainEqual(category);
    });
  });
});
