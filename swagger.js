const swaggerautogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Animals and Ice Cream API",
    description: "API for managing animals and ice cream flavors",
  },
  host: "cse341project2-ckvu.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// this will generate the swagger.json file
swaggerautogen(outputFile, endpointsFiles, doc);
