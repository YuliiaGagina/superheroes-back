const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const getAll = require("./getAll");

app.get("api/superheroes", getAll);
const { DB_HOST, PORT = 8800 } = process.env;

require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/superheroes", () => {
  it("should return all superheroes", async () => {
    const res = await request(app).get("/api/superheroes", getAll);
    expect(res.statusCode).toBe(200);

    // expect(Array.isArray(res.body)).toBe(true);
    // const [superhero] = res.body;
    // expect(typeof superhero._id).toBe("string");
  });
});

describe("GET /api/superheroes/:id", () => {
  test("should return a superhero", async () => {
    const res = await request(app).get(
      "/api/superheroes/6471cdd386241fced090ae7b"
    );
    expect(res.statusCode).toBe(200);
    // expect(res.body.nickname).toBe("Iron Man");
  });
});
