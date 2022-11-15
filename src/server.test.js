const request = require("supertest");

const app = require("./server");

describe("The main route", () => {
  it("returns 200 with a GET request", (done) => {
    request(app).get("/").expect(200, done);
  });

  // it("returns a web page");
});
