var router = require('express').Router();
var Card = require('../models/list');

var Filter = require("../lib/Filter");
var Priority = require("../lib/Priority");

var ListMap = require('../lib/list-map');
var BoardMap = require('../lib/board-map');
var PriorityMap = require('../lib/priority-map');

router.get('/', function(req, res){
  res.render('index');
});

router.post('/ticket', function(req, res){
  var card = new Card();
  var ticket = Filter.filter(req.body.subject);
  console.log(ticket);
  card.title = req.body.subject;
  card.description = req.body.description;
  card.listId = ListMap[ticket.category] || "gd63gB3ayJWf6q7dg";
  card.boardId = BoardMap[ticket.category] || "f6T2sEZwpvyTPKSRu";
  card.userId = "HyBakhBFrMjJDMaDv";
  card.labelIds.push(PriorityMap[ticket.priority]);
  console.log(card);
  // card.save(function(){
  //   console.log("Saved");
  // });
  res.render('index');
});

module.exports = router;
