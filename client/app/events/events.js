
/* SHORTLY-ANGULAR */

angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};

  $scope.getLinks = function(){
   Links.getLinks($scope.data)
     .then(function(data){
       $scope.data['links'] = data;
       console.log("links data is ", data);
     })
     .catch(function(error){
       console.error(error);
     });
  }; 
  $scope.getLinks();
});


/* AWKWARDALPS */

// angular.module('lunchCorgi.events', [])

// .controller('EventsController', function($scope, Events) {

//   $scope.event = {}
  
//   //if $scope.invalid is true, it will display an error message in the view
//   $scope.invalid = false

//   $scope.joinEvent = function() {
    
//   // add companion function here for 
//   // add joinEvent function in Services.js
//   }

//   $scope.addEvent = function() {
//     // check that all fields in the events.html form are filled out
//     if ($scope.event.description !== "" &&
//         $scope.event.location !== "" &&
//         $scope.event.datetime !== "" ) {
//           $scope.invalid = false
//           Events.addEvent($scope.event)
//           .then(function(newEvent) {
//             $scope.event = newEvent
//           })
//         } else {
//           $scope.invalid = true
//         }     
//   }

//   // first page of events is page number 0; when more events are viewed, the page number is increased
//   $scope.pageNumber = 0

//   // eventsList is an array used in the template (with ng-repeat) to populate the list of events.
//   $scope.eventsList = {}

//   $scope.viewAllEvents = function() {
//     Events.getEvents($scope.pageNumber)
//     .then(function(data) {
//       $scope.eventsList = data
//     })
//   }

//   $scope.nextPage = function() {
//     $scope.pageNumber++
//     $scope.viewAllEvents()
//   }
  
//   $scope.prevPage = function() {
//     // only go back a page if the page number is greater than 0
//     if ($scope.pageNumber > 0) {
//       $scope.pageNumber--
//       $scope.viewAllEvents()
//     }
//   }
  
//   $scope.viewAllEvents()
// })

