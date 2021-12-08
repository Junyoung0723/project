module.exports = (app) => {
  const person = require("./person.controller.js");
  app.post("/user/join", person.join);
  app.post("/user/login", person.login);
};
