const { UserModel } = require("../models/user");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("recipe route tests", function () {
  let user = new UserModel({
    first_name: "Testing",
    last_name: "gintesT",
    password: "Testing",
    email: "test@example.com",
  })._id.toString();

  const userTestObj = {
    first_name: "Test",
    last_name: "Successful",
    email: "test@example.com",
    password: "Testing123",
  };

  const recipeTestObj = {
    recipeMissingName: {
      recipe: {
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingIngredients: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
      },
    },
    recipeMissingDescription: {
      recipe: {
        recipe_name: "Test1",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingDirections: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingServings: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        prep_time: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingPrep: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingCook: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingAuthor: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeInvalidAuthor: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: "a1b2c3d4e5f6g7h8i9j0",
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingIngredientName: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
    recipeMissingIngredientAmount: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: user,
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
          },
        ],
      },
    },
    newRecipeSuccess: {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        author: "",
        source: "potluck",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    },
  };

  let runs = [
    {
      it: "fail when provided data missing the recipe_name.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingName,
        response: { error: "MissingFields", missingFields: ["recipe_name"] },
      },
    },
    {
      it: "fail when provided data missing the recipe description.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingDescription,
        response: { error: "MissingFields", missingFields: ["description"] },
      },
    },
    {
      it: "fail when provided data missing the recipe directions.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingDirections,
        response: { error: "MissingFields", missingFields: ["directions"] },
      },
    },
    {
      it: "fail when provided data missing the recipe servings.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingServings,
        response: { error: "MissingFields", missingFields: ["servings"] },
      },
    },
    {
      it: "fail when provided data missing the recipe prep time.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingPrep,
        response: { error: "MissingFields", missingFields: ["prep_time"] },
      },
    },
    {
      it: "fail when provided data missing the recipe cook time.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingCook,
        response: { error: "MissingFields", missingFields: ["cook_time"] },
      },
    },
    {
      it: "fail when provided data missing the recipe author.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingAuthor,
        response: { error: "MissingFields", missingFields: ["author"] },
      },
    },
    {
      it: "fail when provided data with an invalid recipe author.",
      opt: {
        status: 401,
        postData: recipeTestObj.recipeInvalidAuthor,
        response: {
          error: "InvalidAuthor",
          message: "Provided author is not registered",
        },
      },
    },
    {
      it: "fail when provided data missing the recipe ingredient name.",
      opt: {
        status: 406,
        postData: recipeTestObj.recipeMissingIngredientName,
        response: {
          error: "MissingFields",
          missingFields: ["ingredient_name"],
        },
      },
    },
  ];

  it("GET /api/recipes should return an empty array from the database", (done) => {
    chai
      .request(server)
      .get("/api/recipes")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.equal(0);
        done();
      });
  });

  runs.forEach((run) => {
    it(`POST /api/recipes should ${run.it}`, (done) => {
      chai
        .request(server)
        .post("/api/recipes")
        .send(run.opt.postData)
        .end((err, res) => {
          res.should.have.status(run.opt.status);
          if (run.opt.status === 201) {
            // update the response with data added by mongoose schema
            run.opt.response._id = res.body._id;
            run.opt.response.ingredients[0]._id = res.body.ingredients[0]._id;
            run.opt.response.__v = 0;
            run.opt.response.comments = [];
            run.opt.response.created_date = res.body.created_date;
            run.opt.response.tags = [];
          }
          expect(res.body).to.deep.equal(run.opt.response);
          done();
        });
    });
  });
  it("POST /api/recipes should create a new recipe in the database", (done) => {
    chai
      .request(server)
      .post("/api/user/register")
      .send(userTestObj)
      .end((err, res) => {
        recipeTestObj.newRecipeSuccess.recipe.author = res.body.userId;
        chai
          .request(server)
          .post("/api/recipes")
          .send(recipeTestObj.newRecipeSuccess)
          .end((err, res) => {
            res.should.have.status(201);
            expect(res.body.recipe_name).to.equal(
              recipeTestObj.newRecipeSuccess.recipe.recipe_name
            );
            done();
          });
      });
  });

  it("GET /api/recipes should now return an array with 1 entry from the database", (done) => {
    chai
      .request(server)
      .post("/api/user/register")
      .send(userTestObj)
      .end((err, res) => {
        recipeTestObj.newRecipeSuccess.recipe.author = res.body.userId;
        chai
          .request(server)
          .post("/api/recipes")
          .send(recipeTestObj.newRecipeSuccess)
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/recipes")
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.equal(1);
                expect(res.body[0].recipe_name).to.equal(
                  recipeTestObj.newRecipeSuccess.recipe.recipe_name
                );
                done();
              });
          });
      });
  });
});
