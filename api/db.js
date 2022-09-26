const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://StactDevelopment:FSDevelopment@cluster0.wjd99wg.mongodb.net/employeesDb?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", function () {
  console.log("Application is connected to Databse");
});
