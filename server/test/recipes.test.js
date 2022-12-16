const { UserModel } = require("../models/user");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("recipe route tests", function () {
  var creationApiToken; // Used for the API calls.
  var testApiToken;

  const creationUserObj = {
    full_name: "Test",
    email: "test@example.com",
    password: "Testing123",
  };

  const testUserObj = {
    full_name: "Testing",
    email: "testing@example.com",
    password: "Testing123",
  };

  beforeEach((done) => {
    // Create creation user
    chai
      .request(server)
      .post("/api/user/register")
      .send(creationUserObj)
      .end((err, res) => {
        if (err) throw err;
        chai
          .request(server)
          .post("/api/user/login")
          .send({
            email: creationUserObj.email,
            password: creationUserObj.password,
          })
          .end((err, res) => {
            if (err) throw err;
            creationApiToken = res.header["auth-token"];
            // Create test user that doesn't have permission to edit the recipes
            chai
              .request(server)
              .post("/api/user/register")
              .send(testUserObj)
              .end((err, res) => {
                if (err) throw err;
                chai
                  .request(server)
                  .post("/api/user/login")
                  .send({
                    email: testUserObj.email,
                    password: testUserObj.password,
                  })
                  .end((err, res) => {
                    if (err) throw err;
                    testApiToken = res.header["auth-token"];
                    done();
                  });
              });
          });
      });
  });

  const recipeTestObj = {
    recipeMissingName: {
      recipe: {
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
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
      },
    },
    recipeMissingDescription: {
      recipe: {
        recipe_name: "Test1",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
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
        image_source: "",
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
      it: "fail when provided data missing the recipe name.",
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
        .set("auth-token", creationApiToken)
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
      .post("/api/recipes")
      .set("auth-token", creationApiToken)
      .send(recipeTestObj.newRecipeSuccess)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.recipe_name).to.equal(
          recipeTestObj.newRecipeSuccess.recipe.recipe_name
        );
        done();
      });
  });

  it("GET /api/recipes should now return an array with 1 entry from the database", (done) => {
    chai
      .request(server)
      .post("/api/recipes")
      .set("auth-token", creationApiToken)
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

  it("GET /api/recipes/:recipe_id should return a recipe object with author_name", (done) => {
    chai
      .request(server)
      .post("/api/recipes")
      .set("auth-token", creationApiToken)
      .send(recipeTestObj.newRecipeSuccess)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.recipe_name).to.equal(
          recipeTestObj.newRecipeSuccess.recipe.recipe_name
        );
        let recipe_id = res.body._id;
        chai
          .request(server)
          .get(`/api/recipes/${recipe_id}`)
          .end((err, response) => {
            response.should.have.status(200);
            expect(response.body.author_name).to.equal(
              creationUserObj.full_name
            );
            done();
          });
      });
  });

  it("GET /api/recipes/:recipe_id should return an error if an invalid recipe id provided", (done) => {
    const invalid_id = "asdf1234qsdfasdf12345";
    chai
      .request(server)
      .get(`/api/recipes/${invalid_id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.deep.equal({
          error: "InvalidId",
          message: "Provided recipe id is not a valid ID",
        });
        done();
      });
  });

  it("GET /api/recipes/:recipe_id should return an error if an valid id that doesn't match a recipe id provided", (done) => {
    const incorrect = "639760978cf61611c3d09866";
    chai
      .request(server)
      .get(`/api/recipes/${incorrect}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.deep.equal({
          error: "NotFound",
          message: `No recipe found with the id ${incorrect}`,
        });
        done();
      });
  });

  it("DELETE /api/recipes/:recipe_id should return an error if the user attempting to delete is not the owner.", (done) => {
    let recipeId;
    const expectedReturn = {
      error: "NotAuthor",
      message: "Provided user did not author the specific recipe.",
    };
    chai
      .request(server)
      .post("/api/recipes")
      .set("auth-token", creationApiToken)
      .send(recipeTestObj.newRecipeSuccess)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.recipe_name).to.equal(
          recipeTestObj.newRecipeSuccess.recipe.recipe_name
        );
        recipeId = res.body._id;
        chai
          .request(server)
          .delete(`/api/recipes/${recipeId}`)
          .set("auth-token", testApiToken)
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(401);
            res.body.should.be.deep.equal(expectedReturn);
            done();
          });
      });
  });

  it("DELETE /api/recipes/:recipe_id should return successful if the user attempting to delete is the owner.", (done) => {
    let recipeId;
    chai
      .request(server)
      .post("/api/recipes")
      .set("auth-token", creationApiToken)
      .send(recipeTestObj.newRecipeSuccess)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(201);
        expect(res.body.recipe_name).to.equal(
          recipeTestObj.newRecipeSuccess.recipe.recipe_name
        );
        recipeId = res.body._id;
        chai
          .request(server)
          .delete(`/api/recipes/${recipeId}`)
          .set("auth-token", creationApiToken)
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(204);
            done();
          });
      });
  });

  it("PUT /api/recipes/:recipe_id should return a failure when a user tries to update a recipe that isn't theirs", (done) => {
    let createdRecipe;
    const newRecipe = {
      recipe: {
        recipe_name: "Test1",
        description: "Test1 description",
        directions: "Test1 directions",
        servings: 10,
        prep_time: 10,
        cook_time: 10,
        image_source: "",
        ingredients: [
          {
            ingredient_name: "Test1 ingredient",
            measurement: "Test1 measurement",
            amount: "Test1 amount",
          },
        ],
      },
    };

    const updateFields = {
      servings: 1,
    };
    chai
      .request(server)
      .post("/api/recipes")
      .set("auth-token", creationApiToken)
      .send(newRecipe)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(201);
        expect(res.body.recipe_name).to.equal(newRecipe.recipe.recipe_name);
        createdRecipe = res.body;
        const expectedReturn = {
          message: `Successfully deleted recipe ${res.body.recipe_name} - ${createdRecipe._id}`,
        };
        chai
          .request(server)
          .put(`/api/recipes/${createdRecipe._id}`)
          .set("auth-token", testApiToken)
          .send({
            recipe: {
              ...createdRecipe,
              ...updateFields,
            },
          })
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(401);
            res.body.should.deep.equal({
              error: "UnauthorizedUser",
              message: "User does not own recipe.",
            });
            done();
          });
      });
  });
});
