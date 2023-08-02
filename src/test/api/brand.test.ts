import { describe, it } from "@jest/globals";
import app from "../request";
import type { Brand } from "@prisma/client";

describe("brand api", () => {
  let brand: Brand | null = null;
  describe("create brand without name and picture", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/brands").send({});
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create brand without name", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/brands").send({
        picture: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe("create brand without picture", () => {
    it("should return a 400 status code", async () => {
      const res = await app.post("/api/brands").send({
        name: "test",
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("create brand with name and picture", () => {
    it("should return a 200 status code", async () => {
      const res = await app.post("/api/brands").send({
        name: "test",
        picture: "test",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test");
      expect(res.body.picture).toBe("test");
      brand = res.body;
    });
  });

  describe("get brand with id", () => {
    it("should return a 200 status code", async () => {
      if (brand == null) {
        throw new Error("brandId is null");
      }
      const res = await app.get(`/api/brands/${brand.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test");
      expect(res.body.picture).toBe("test");
    });
  });

  describe("update brand with id", () => {
    it("should return a 200 status code", async () => {
      if (brand == null) {
        throw new Error("brandId is null");
      }
      const res = await app.put(`/api/brands/${brand.id}`).send({
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

  describe("delete brand with id", () => {
    it("should return a 200 status code", async () => {
      if (brand == null) {
        throw new Error("brandId is null");
      }
      const res = await app.delete(`/api/brands/${brand.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
      expect(res.body.name).toBe("test2");
      expect(res.body.picture).toBe("test2");
    });
  });

  describe("get deleted brand with id", () => {
    it("should return a 404 status code", async () => {
      if (brand == null) {
        throw new Error("brandId is null");
      }
      const res = await app.get(`/api/brands/${brand.id}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
