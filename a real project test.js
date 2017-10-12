
var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
//var rooms = require("./../data/rooms.json");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var assert = require("assert");
var url = "mongodb://localhost:27017/myproject";

var router = express.Router();
module.exports = router;

router.get("/", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db
      .collection("rooms")
      .find()
      .toArray(function(error, rooms) {
        res.render("rooms/list", {
          title: "Admin Rooms",
          rooms: rooms
        });
        db.close();
      });
  });
});

router
  .route("/add")
  .get(function(req, res) {
    res.render("rooms/add");
  })
  .post(function(req, res) {
    var room = {
      name: req.body.name,
      id: uuid.v4()
    };

    // rooms.push(room);
    // insert into mongodb
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      db.collection("rooms").insertOne(room, function(error, result) {
        res.redirect(req.baseUrl);
        db.close();
      });
    });
  });

router
  .route("/edit/:id")
  .all(function(req, res, next) {
    var roomId = req.params.id;

    MongoClient.connect(url, function(err, db) {
      //assert.equal(null, err);
      console.log("Connected correctly to server");
      db
        .collection("rooms")
        .find()
        .toArray(function(error, roomsresult) {
          //console.log(roomsresult);
          let rooms;
          rooms = roomsresult;
          /// mongo end
          var room = _.find(rooms, r => r.id === roomId);
          if (!room) {
            res.sendStatus(404);
            return;
          }
          res.locals.room = room;
          next();
          db.close();
        });
    });
  })
  .get(function(req, res) {
    res.render("rooms/edit");
  })
  .post(function(req, res) {
    var name = req.body.name;
    var roomId = req.params.id;

    var filter = { id: roomId };

    var newRoom = {
      name: name,
      id: roomId
    };
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      db
        .collection("rooms")
        .updateOne(filter, newRoom, function(error, result) {
          res.redirect(req.baseUrl);
          db.close();
        });
    });
    // res.locals.room.name = req.body.name;
  });

router.get("/delete/:id", function(req, res) {
  var roomId = req.params.id;

  rooms = rooms.filter(r => r.id !== roomId);

  res.redirect(req.baseUrl);
});
