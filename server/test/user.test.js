const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("The different tests for /user/register", () => {
  const userTestObjs = {
    successful: {
      full_name: "Test",
      email: "test@example.com",
      password: "Testing123",
    },
    missingName: {
      email: "test@example.com",
      password: "Testing123",
    },
    missingEmail: {
      full_name: "Test",
      password: "Testing123",
    },
    missingPassword: {
      full_name: "Test",
      email: "test@example.com",
    },
    missingEmailAndPassword: {
      full_name: "Test",
    },
  };

  let runs = [
    {
      it: "fail when provided data missing the full_name.",
      opt: {
        status: 422,
        postData: userTestObjs.missingName,
        response: { error: "MissingFields", missingFields: ["full_name"] },
      },
    },
    {
      it: "fail when provided data missing the email.",
      opt: {
        status: 422,
        postData: userTestObjs.missingEmail,
        response: { error: "MissingFields", missingFields: ["email"] },
      },
    },
    {
      it: "fail when provided data missing the password.",
      opt: {
        status: 422,
        postData: userTestObjs.missingPassword,
        response: { error: "MissingFields", missingFields: ["password"] },
      },
    },
    {
      it: "fail when provided data missing the email and password.",
      opt: {
        status: 422,
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
  runs.forEach((run) => {
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

  it(`POST /api/user/register should fail if provided the same email after someone is registered with it.`, (done) => {
    const expectedResponse = {
      error: "UserExists",
      message: `User already exists with email: ${userTestObjs.successful.email}`,
    };
    chai
      .request(server)
      .post("/api/user/register")
      .send(userTestObjs.successful)
      .end((err, res) => {
        chai
          .request(server)
          .post("/api/user/register")
          .send(userTestObjs.successful)
          .end((err, res) => {
            res.should.have.status(409);
            let body = res.body;
            expect(body).to.deep.equal(expectedResponse);
            done();
          });
      });
  });
});

describe("LOGIN - The different tests for /user/login", () => {
  var userId;
  var loginData;
  const userData = {
    full_name: "Test",
    email: "test@example.com",
    password: "Testing123",
  };

  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/user/register")
      .send(userData)
      .end((err, res) => {
        if (err) throw err;
        userId = res.body.userId;
        done();
      });
  });

  it("should fail to log in when provided no login information", (done) => {
    chai
      .request(server)
      .post("/api/user/login")
      .send()
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(400);
      });
    done();
  });

  it("should fail to log in when provided just the password", (done) => {
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        password: "incorrect password",
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(400);
        done();
      });
  });

  it("should fail to log in when provided just the email", (done) => {
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        email: userData.email,
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(400);
        done();
      });
  });

  it("should fail to log in when provided incorrect information", (done) => {
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        email: userData.email,
        password: "incorrect password",
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(401);
        res.body.should.have.property("message").and.to.be.a("string");
        res.body.message.should.be.equal("Invalid Credentials");
        done();
      });
  });

  it("should successfully log in when provided correct information", (done) => {
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        email: userData.email,
        password: userData.password,
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.header.should.have.property("auth-token").and.to.be.a("string");
        res.body.should.have.property("authenticated").and.to.be.equal(true);
        done();
      });
  });
});
