/*
* Application File
* */
var app = angular.module("MobiApp",['ngRoute']);
app.constant("dataUrl", "data/getUser.json");
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({
        redirectTo : '/list'
    })
    .when('/list', {
        templateUrl : 'views/list.html',
        controller:'ListCtrl'
    })
    .when('/edit', {
        templateUrl : 'views/edit.html',
        controller:'EditCtrl'
    })
    }])
    .controller("MainCtrl",function($scope){
        $scope.sortByProp = "Age"; // Default sortby - Age
        $scope.sortBy = function(prop){
           $scope.sortByProp = prop;
        }
        $scope.sort = function(item){
            return item[$scope.sortByProp];
        }
    })
    /*
    * Service to set and get user which is used passing user information while in routes
    * */
    .factory('userService',function(){
        var saveUser = {};
        return{
            setUser:function(data){
                saveUser = data;
            },
            getUser:function(){
                return saveUser;
            }
        }
    });
