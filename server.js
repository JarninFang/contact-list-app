var mongoose = require('mongoose');
var express = require('express');
var bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/contactlist');
require('./contact.server.model')();

var app = express();

var Contact = require('mongoose').model('Contact');

app.use(express.static(__dirname + '/public'));

// Use the 'body-parser' and 'method-override' middleware functions
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

app.get('/contactlist', function(req, res) {
  Contact.find({}, function(err, contacts) {
    console.log(contacts);
    res.json(contacts);  
  });
  console.log('I received a get request');
});

app.post('/contactlist', function(req, res) {
  var contact = new Contact(req.body);
  contact.save(function(err, contact) {
    if(err) res.send(err);
    res.json(contact);
  });
});

app.delete('/contactlist/:id', function(req, res) {
  var id = req.params.id; 
  Contact.remove({_id: id}, function(err, contact) {
    if(err) res.send(err);
    res.json(contact);
  });
});

app.get('/contactlist/:id', function(req, res) {
  var id = req.params.id;
  Contact.findOne({_id: id}, function(err, contact) {
    if(err) res.send(err);
    res.json(contact);
  });
});

app.put('/contactlist/:id', function(req, res) {
  var id = req.params.id;
  Contact.findOneAndUpdate({_id: id}, req.body, function(err, contact) {
    console.log('New = ' + contact);
    if(err) res.send(err);
    res.json(contact);
  });
});
app.listen(3000);

console.log('Server running on port 3000');
