var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  var refresh = function() {
    $http.get('/contactlist').success(function(res) {
      console.log('I got the data I requested');
      $scope.contactlist = res;
      $scope.contact = "";
    });
  };
  
  //For when the page first loads
  refresh();

  $scope.addContact = function(){
    $http.post('/contactlist', $scope.contact).success(function(res) {
      console.log(res);
      refresh();
    });
  };

  $scope.remove = function(id) {
    $http.delete('/contactlist/' + id).success(function(res) {
      refresh();
    });
  };
  
  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function(res) {
      console.log(res);
      $scope.contact = res;
      console.log($scope.contact.email);
    });
  };

  $scope.update = function() {
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact)
      .success(function(res) {
      refresh();
    });
  };
}]);
