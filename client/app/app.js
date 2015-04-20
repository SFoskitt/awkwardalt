/* SHORTLY-ANGULAR */

angular.module('awkwardalt', [
  'awkwardalt.services',
  'awkwardalt.events',
  'awkwardalt.createEvent',
  'awkwardalt.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/events', {
      templateUrl: 'app/events/events.html',
      controller: 'EventsController'
    })
    .when('/createEvent', {
      templateUrl: 'app/createEvent/createEvent.html',
      controller: 'CreateEventController'
    })
    .when('/', {
      templateUrl: 'app/events/events.html',
      controller: 'EventsController'      
    })
    .when('/:code', {

      controller: 'EventsController'
    })
    // .otherwise({
    //   templateUrl: 'app/links/links.html',
    //   controller: 'LinksController'      
    // })

    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.awkwardalt');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});


/* AWKWARDALPS */

// // Declare app level module which depends on views, and components
// angular.module('lunchCorgi', [
//   'lunchCorgi.services',
//   'lunchCorgi.events',
//   'lunchCorgi.auth',
//   'ngRoute'
//   ])
// .config(function($routeProvider, $httpProvider) {
//   $routeProvider
//       .when('/', {
//         templateUrl: 'client/app/events/eventsPage.html',
//         controller: 'eventController'
//     })
//       .when('/signup', {
//         templateUrl: 'client/app/users/signup.html',
//         controller: 'SignUpCtrl'
//     })
//       .when('/signin', {
//         templateUrl: 'client/app/users/signin.html',
//         controller: 'SignInCtrl'
//     })
// })
// .factory('AttachTokens', function ($window) {
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, Auth) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });


