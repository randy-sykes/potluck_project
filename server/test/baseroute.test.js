process.env.NODE_ENV = "test";

const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("Testing the base and wildcard routes", () => {
  it("test default root route...", (done) => {
    // Current returns this:
    let expectedVal =
      "You made it, but there is nothing here. Check out /api/docs";
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.message).to.be.equal(expectedVal);
        done();
      });
  });

  it("test incorrect route...", (done) => {
    // Current returns this:
    let expectedVal = "Why are you here?";
    chai
      .request(server)
      .get("/should-not-exists-ever")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        expect(res.body.error).to.be.equal(expectedVal);
        done();
      });
  });
});
