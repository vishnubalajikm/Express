var router = require('express').Router();
var Card = require('../models/list');
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
  // console.log(card);
  card.save(function(){
    console.log("Saved");
  });
  res.render('index');
});

module.exports = router;
