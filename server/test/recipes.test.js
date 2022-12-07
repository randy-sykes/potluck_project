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
  RecipeModel.deleteMany({}, function (err) {});
  UserModel.deleteMany({}, function (err) {});
  done();
});

describe("recipe route tests", function () {
  let user = new UserModel({
    first_name: "Testing",
    last_name: "gintesT",
    password: "Testing",
    email: "test@example.com",
  })._id.toString();

  const testObj = {
    newRecipeSuccess: {
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
            amount: "Test1 amount",
          },
        ],
      },
    },
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
  };

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

  it("POST /api/recipes should create a new recipe in the database", (done) => {
    chai
      .request(server)
      .post("/api/recipes")
      .send(testObj.newRecipeSuccess)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.recipe_name).to.equal(
          testObj.newRecipeSuccess.recipe.recipe_name
        );
        done();
      });
  });

  it("GET /api/recipes should now return an array with 1 entry from the database", (done) => {
    chai
      .request(server)
      .get("/api/recipes")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.equal(1);
        expect(res.body[0].recipe_name).to.equal(
          testObj.newRecipeSuccess.recipe.recipe_name
        );
        done();
      });
  });
});
