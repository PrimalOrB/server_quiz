module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    // Create a new Customer
    app.post("/user", user.create);
  
    // Retrieve all Customers
    app.get("/user", user.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/user/:customerId", user.findOne);
  
    // Update a Customer with customerId
    app.put("/user/:customerId", user.update);
  
    // Delete a Customer with customerId
    app.delete("/user/:customerId", user.delete);
  
    // Create a new Customer
    app.delete("/user", user.deleteAll);
  };