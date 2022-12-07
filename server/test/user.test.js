const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("Testing the different routes and methods for /user", () => {
  const userTestObjs = {
    successful: {
      first_name: "Test",
      last_name: "Successful",
      email: "test@example.com",
      password: "Testing123",
    },
    missingFirstName: {
      last_name: "Failure",
      email: "test@example.com",
      password: "Testing123",
    },
    missingLastName: {
      first_name: "Test",
      email: "test@example.com",
      password: "Testing123",
    },
    missingEmail: {
      first_name: "Test",
      last_name: "Successful",
      password: "Testing123",
    },
    missingPassword: {
      first_name: "Test",
      last_name: "Successful",
      email: "test@example.com",
    },
    missingEmailAndPassword: {
      first_name: "Test",
      last_name: "Successful",
    },
  };

  let runs = [
    {
      it: "fail when provided data missing the first_name.",
      opt: {
        status: 400,
        message: `MissingFields`,
        postData: userTestObjs.missingFirstName,
        missingFields: ["first_name"],
        fail: true,
      },
    },
    {
      it: "fail when provided data missing the last_name.",
      opt: {
        status: 400,
        message: `MissingFields`,
        postData: userTestObjs.missingLastName,
        missingFields: ["last_name"],
        fail: true,
      },
    },
    {
      it: "fail when provided data missing the email.",
      opt: {
        status: 400,
        message: `MissingFields`,
        postData: userTestObjs.missingEmail,
        missingFields: ["email"],
        fail: true,
      },
    },
    {
      it: "fail when provided data missing the password.",
      opt: {
        status: 400,
        message: `MissingFields`,
        postData: userTestObjs.missingPassword,
        missingFields: ["password"],
        fail: true,
      },
    },
    {
      it: "fail when provided data missing the email and password.",
      opt: {
        status: 400,
        message: `MissingFields`,
        postData: userTestObjs.missingEmailAndPassword,
        missingFields: ["email", "password"],
        fail: true,
      },
    },
    {
      it: "be successful if provided correct data.",
      opt: {
        status: 201,
        message: `Created user for email: ${userTestObjs.successful.email}`,
        postData: userTestObjs.successful,
      },
    },
  ];

  it("POST /api/user/register should return an error message with no data passed", (done) => {
    chai
      .request(server)
      .post("/api/user/register")
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.equal("Please provide a user object.");
        done();
      });
  });
  runs.forEach(function (run) {
    it(`POST /api/user/register should ${run.it}`, (done) => {
      chai
        .request(server)
        .post("/api/user/register")
        .send(run.opt.postData)
        .end((err, res) => {
          res.should.have.status(run.opt.status);
          let body = res.body?.error || res.body.message;
          expect(body).to.equal(run.opt.message);
          if (run.opt.fail) {
            expect(res.body.missingFields).to.be.deep.equal(
              run.opt.missingFields
            );
          }
          done();
        });
    });
  });
});
