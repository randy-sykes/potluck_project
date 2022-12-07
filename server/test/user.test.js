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
        postData: userTestObjs.missingFirstName,
        response: { error: "MissingFields", missingFields: ["first_name"] },
      },
    },
    {
      it: "fail when provided data missing the last_name.",
      opt: {
        status: 400,
        postData: userTestObjs.missingLastName,
        response: { error: "MissingFields", missingFields: ["last_name"] },
      },
    },
    {
      it: "fail when provided data missing the email.",
      opt: {
        status: 400,
        postData: userTestObjs.missingEmail,
        response: { error: "MissingFields", missingFields: ["email"] },
      },
    },
    {
      it: "fail when provided data missing the password.",
      opt: {
        status: 400,
        postData: userTestObjs.missingPassword,
        response: { error: "MissingFields", missingFields: ["password"] },
      },
    },
    {
      it: "fail when provided data missing the email and password.",
      opt: {
        status: 400,
        postData: userTestObjs.missingEmailAndPassword,
        response: {
          error: "MissingFields",
          missingFields: ["email", "password"],
        },
      },
    },
    {
      it: "be successful if provided correct data.",
      opt: {
        status: 201,

        postData: userTestObjs.successful,
        randomId: true,
        response: {
          message: `Created user for email: ${userTestObjs.successful.email}`,
          userId: "",
        },
      },
    },
    {
      it: "fail if provided the same email after someone is registered with it.",
      opt: {
        status: 409,
        postData: userTestObjs.successful,
        response: {
          error: "UserExists",
          message: `User already exists with email: ${userTestObjs.successful.email}`,
        },
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
          let body = res.body;
          if (run.opt.randomId) {
            run.opt.response.userId = body.userId;
          }
          expect(body).to.deep.equal(run.opt.response);
          done();
        });
    });
  });
});
