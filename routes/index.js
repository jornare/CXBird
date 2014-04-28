
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CXBird' });
};

exports.menu = function(req, res){
  res.render('menu', { });
};

exports.player = function(req, res){
  res.render('player', {  });
};

exports.drawing = function(req, res){
  res.render('drawing', {  });
};

exports.game = function(req, res){
  res.render('game', {  });
};

exports.highscores = function(req, res){
  res.render('highscores', { });
};