// SERVER-SIDE JAVASCRIPT

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),

var mongoose = require('mongoose'),
   
mongoose.connect('mongodb://localhost/user'),

var User = require('./models/user');

});    


// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));


// Posts

// pre-seeded post data
var posts =[
  {id: 1, author: "Alan", text: "Hiked 8 miles this weekend! Finally made it out to the waterfall."},
  {id: 3, author: "Celeste", text: "On the other side of the cloud, a silver lining."},
  {id: 2, author: "Bette", text: "Garden starting to produce veggies! Best tomato ever."},
  {id: 4, author: "Daniel", text: "Been relearning geometry to help niece -- owning triangles so hard right now."},
  {id: 5, author: "Evelyn", text: "We need team jackets!"},
];
var totalPostCount = 9;


// ROUTES

// Static file route(s)

// get all users
app.get('/api/users', function (req, res) {
  //find all phrases in db
  User.find(function (err, users){
    res.json(users)
  });
});


// create new user

// get all posts
app.post('/api/users', function (req, res) {
  // create new users with the form data (req.body)
  var newUser = new User({
    author:req.body.author,
    text: req.body.text

  });
  //save new user in db
  newUser.save(function (err, savedUser){
    res.json(savedUser)
  });
 
});

// get one user
app.get('/api/users/:id', function (req, res) {
  // set the value of id
  var targertId = req.params.id;

  //find user in db by id
  User.findOne({_id: targertId}, function(err, foundUser){
    res.json(foundUser);
  });
  
  });

  // update user
  app.put('/api/users/:id', function(req, res){
    // set the value of the id
    var targetId = req.params.id;

    //find user in db by id
    User.findOne({_id: targetId}, function (err, founduser){
      //update the user's word and definition
      foundUser.author = req.body.author;
      foundUser.text = req.body.text;

      // save updated id in db
      foundUser.save(function (err, savedUser){
res.json(savedUser);

      });

    });

// delete user
app.delete('/api/userss/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find user in db by id and remove
  User.findOneAndRemove({_id: targetId}, function (err, deletedUser) {
    res.json(deletedUser);
  });
}); 

app.listen(3000, function(){
  console.log('server started on localhost:3000');
}) ;
 