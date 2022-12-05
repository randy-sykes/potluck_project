const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Potluck API",
      description:
        "A simple API to access recipes etc for potluck and Gather 'n Grub",
      version: "0.1.0",
      contact: [
        {
          name: "Randy Sykes",
          email: "randy.sykes@g.austincc.ed",
        },
        {
          name: "Dallas Jahn",
          email: "dallas.jahn@g.austincc.ed",
        },
        {
          name: "Ethan Aurellano",
          email: "ethan.aurellano@g.austincc.ed",
        },
      ],
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
