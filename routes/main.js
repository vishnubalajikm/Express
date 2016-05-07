var router = require('express').Router();
var Card = require('../models/list');

var Filter = require("../lib/Filter");
var Priority = require("../lib/Priority");
router.get('/', function(req, res){
  res.render('index');
});

router.post('/ticket', function(req, res){
  var card = new Card();
  card.title = req.body.subject;
  card.description = req.body.description;
  card.listId = "nYrEWuXK9rscuNJi6";
  card.boardId = "S5L3ckft2RYs6TXqR";
  card.userId = "y9wrKcXQk9Gm5CTx5";
  var ticket = Filter.filter(req.body.subject);
  card.category = ticket.category;
  card.sub_category = ticket.sub_category;
  card.labelIds.push(card.priority); 
  console.log(ticket);
  // console.log(card);
  card.save(function(){
    console.log("Saved");
  });
  res.render('index');
});

module.exports = router;
