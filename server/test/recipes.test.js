process.env.NODE_ENV = "test";

const { RecipeModel } = require("../models/recipe");
const { UserModel } = require("../models/user");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

before((done) => {
  RecipeModel.deleteMany({}, function (err) {});
  UserModel.deleteMany({}, function (err) {});
  done();
});

after((done) => {
  // RecipeModel.deleteMany({}, function (err) {});
  // UserModel.deleteMany({}, function (err) {});
  done();
});

describe("recipe route tests", function () {
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

  it("GET /api/recipes should return an empty array", (done) => {
    chai
      .request(server)
      .get("/api/recipes")
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res.body);
        res.body.should.be.a("array");
        res.body.length.should.be.equal(0);
        done();
      });
  });
});
