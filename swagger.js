const swaggerautogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Animals and Ice Cream API",
    description: "API for managing animals and ice cream flavors",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// this will generate the swagger.json file
swaggerautogen(outputFile, endpointsFiles, doc);
