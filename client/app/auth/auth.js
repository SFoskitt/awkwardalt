
/* SHORTLY-ANGULAR */

// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service

angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

// $scope.user on the inside

// $scope.user = {
//   username: "ben",
//   password: "ben"
// }


/* AWKWARDALPS */

// 'use strict';

// angular.module('lunchCorgi.signup', ['ngRoute'])

// .controller('SignUpCtrl', [function($scope, Users) {
//   $scope.user = {};

//   $scope.signin = function () {
//     Auth.signin($scope.user)
//       .then(function (token) {
//         $window.localStorage.setItem('com.corgi', token);
//         $location.path('/');
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   };

//   $scope.signup = function() {
//     Users.signup($scope.user)
//       .then(function(token){
//         $window.localStorage.setItem('com.corgi', token);
//         $location.path('/');
//       })
//       .catch(function(error){
//         console.log(error);
//       });
//   };

// }]);
