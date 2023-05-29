const express = require("express");
const request = require("supertest");
const app = express()
const getAll = require('./getAll')


app.get("api/superheroes", getAll)

describe("test controller getAll", () =>{
    let server;
    beforeAll((done) => {
        server = app.listen(8800, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(() => {
            done();
        });
    });
    test("getAll return superheroes array", async ()=>{
      const response = await request(app).get("api/superheroes")
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true)
      const [superhero] = respone.body
      expect(typeof superhero.id).toBe("string")
     

    })
})