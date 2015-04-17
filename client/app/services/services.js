/* SHORTLY-ANGULAR */

angular.module('shortly.services', [])

.factory('Links', function ($http, $location) {
  // Your code here
  var getLinks = function(data) {
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function(resp){
      return resp.data;
    })
  }

  var addLink = function(link) {
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link
    })
    .then(function () {
      $location.path('/links')
    })
  }

  return {
    getLinks: getLinks,
    addLink: addLink
  }
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});


/* AWKWARDALPS */

// angular.module('lunchCorgi.services', [])

// .factory('Events', function($http) { //when routes are created, we might not use the $http stuff - TBD
  
//   // need to figure out how this will point to the correct MongoDB path.  
//   // this function finds events with time greater than now (that's what Date.now is)...
//   var getEvents = function(pageNum) {
//     return $http({
//       method: 'GET',
//       url: '/api/events'
//       // data: {pageNum: pageNum} //commenting this out for now, but it might be implemented later
//     })
//     .then(function(resp) {
//       return resp.statusCode
//     })

//   };

//   var joinEvent = function(event) {
//       return $http({
//         method: 'POST',
//         url: '/api/events', 
//         data: {event: event.attendeeIDs.push(userID)}
//       })
//       .then(function (resp) {
//         //probably superfluous, but maybe handy for debugging for now - 04/16/2015 - saf
//         alert("You were added to event ", event.description)
//         return resp.statusCode; 
//       });
//   }  

//   var addEvent = function(event) {
//       return $http({
//         method: 'POST',
//         url: '/api/events',
//         data: {event: event}
//       })
//       .then(function (resp) {
//         return resp.statusCode; 
//       });
//   }

//   // return all of our methods as an object, so we can use them in our controllers
//   return {
//     getEvents : getEvents,
//     joinEvent: joinEvent,
//     addEvent : addEvent
//   }

// })
// .factory('Users', function($http){
//   var signup = function(user){
//     return $http({
//       method: 'POST',
//       url: '/api/signup',
//       data: user
//     }).then(function (resp) {
//       return resp.data.token;
//     });
//   }

//   var signin = function(user) {
//     return $http({
//       method: 'POST',
//       url: '/api/signin',
//       data: user
//     }).then(function (resp) {
//       return resp.data.token;
//     });    
//   }

//   return {
//     signup: signup,
//     signin: signin
//   }
// })

