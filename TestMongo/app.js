/**
 * Created by My Laptop on 10/9/2017.
 */

var path = require("path");
var mongoose = require("mongoose");
var User = require("./models/model.js");
// console.log(User);
var dbURI = "mongodb://localhost/User";

// dbURI, { useMongoClient: true }
mongoose.connect(dbURI);

mongoose.Promise = global.Promise;
mongoose.set("debug", true);

mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection open to " + dbURI);
});

mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
var Deen = new User({
  displayName: "deen john",
  email: "dj.itbhu@gmail.com"
});

Deen.save();
//console.log(res);
