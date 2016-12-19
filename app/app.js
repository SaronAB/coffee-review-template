'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.
module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.bootstrap'
]);


myApp.config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
          $locationProvider.hashPrefix('!');

          $routeProvider.
          when('/coffees',                        //main page of website
          {
            controller: 'View1Ctrl',
            templateUrl: 'coffees/coffees.html'
          }).
          when('/reviewsjson/:coffeeId/:coffeeBrand',       //navigates to the comments
          {
            controller: 'View2Ctrl',
            templateUrl: 'reviews/reviews.html'
          }).
            
            
          otherwise({redirectTo: '/coffees'});                //if unknown extension, redirects back to main page
}]);


myApp.controller('View2Ctrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
	$http.get('reviewsjson/' + $routeParams.coffeeId + '.json').success(function(data){                //each brand has its own reviews json file
		$scope.reviews = data;
    $scope.name = $routeParams.coffeeBrand;                       //used to feature brand name at the top of the review table
	});
}]);


myApp.controller('View1Ctrl',['$scope',function($scope){
  
  $scope.coffees =                              //database of coffees
  [
       {'id': 1,
       'brand': "Average Andy's Coffee",
       'name': 'Regular Coffee',
       'country': 'Denmark',
       'reviews': [
               {'rating': 3,
               'comment': "Could've been crispier",
               'reviewer': "Chris P. Bacon"
               }
       ]
       },
       
       {'id': 2,
       'brand': "Jimmy's Coffee",
       'name': 'Mocha',
       'country': 'America',
       'reviews': [
              {'rating': 10,
              'comment': 'What everyone should drink in the morning!',
              'reviewer': 'Earl Lee Riser'
              },
              {'rating': 10,
              'comment': 'A genius of everything coffee',
              'reviewer': 'Bob'
              }
       ]
       },
       
       {'id': 3,
       'brand': "We Did Our Best",
       'name': 'Latte',
       'country': 'France',
       'reviews': [
              {'rating': 1,
              'comment': " a 'latte' yuckiness.",
              'reviewer': 'Tim Burr'
              },
              {'rating': 1,
              'comment': 'Is this even coffee?',
              'reviewer': 'Sue Flay'
              },
               {'rating': 1,
              'comment': 'The grossest thing I have ever had.',
              'reviewer': 'Myles Long'
              },
               {'rating': 5,
              'comment': 'I dont know what the fuss is about, i dont think its too bad!',
              'reviewer': 'Sara Bellum'
              }
       ]
       },
       {'id': 4,
       'brand': "Jimmy's Special Coffee",
       'name': 'Americano',
       'country': 'America',
       'reviews': [
              {'rating': 10,
              'comment': 'If I could rate it higher, I would!',
              'reviewer': 'Justin Case'
              },
              {'rating': 10,
              'comment': 'He does it again!',
              'reviewer': 'Eileen Dover'
              }
       ]
       }];
  
    $scope.orderProp = 'name';
  
}]);
