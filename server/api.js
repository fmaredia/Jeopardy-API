var Question = require('./models/questions');
var Episodes = require('./models/episodes');
var Categories = require('./models/categories');
var express = require('express');
var routes = express.Router();


// get a random single question
routes.get('/questions/random', function (req, res) {
  Question.random().then(function(randQ){
    res.send(randQ)
  })
})

//all episodes (/episodes)
routes.get('/episodes', function (req, res) {
  Episodes.all().then(function(episodes){
    res.send(episodes)
  })
})

//all categories (/categories)
routes.get('/categories', function (req, res) {
  Categories.all().then(function(categories){
    res.send(categories)
  })
})

//all finalJeopardy
routes.get('/finaljeopardy', function (req, res) {
  Question.findAllBy('round', 'Final Jeopardy!').then(function(final){
    res.send(final)
  })
})

//all questions of a certain category (/questions/:category)
//all questions from an episode (/questions/:episode)
//all questions with media (/questions/media)
//all questions without media (/questions/nomedia)
//all questions from a date range (/questions/date/[object])
module.exports = routes;