/**
 * Controllers Module
 */

app.controller('ListCtrl',function($scope,$rootScope, $http,dataUrl,$location,userService){
    /*
     * Check to see if data is available to display, else make an Ajax call to Get users
     */
    if(angular.equals({}, userService.getUser())){
        $scope.data = {};
        $http({
            url: dataUrl
        }).success(function(data){
            $scope.users = data.users
            $rootScope.rootUsers = $scope.users; // Using rootScope for get user list to display edited data
        }).error(function(data, status) {
            console.log(status)
            $scope.data.error = {};
            $scope.data.error.status = status;

        });
    }
    else{
        /*
         *  Changing Object to display Edited user
         */
        $scope.users = $rootScope.rootUsers;
    }
    $scope.edit = function(user){
        // console.log(user);
        userService.setUser(user);
        $location.path('/edit');
    }

});
app.controller('EditCtrl',function($scope,$location,userService){

    if(!angular.equals({}, userService.getUser())){
        $scope.user = userService.getUser();
    }
    else{
        $location.path('/list');
    }
    $scope.save = function(user){
        if(angular.isDefined(user)){
            userService.setUser(user);
            $location.path('/list')
        }

    }
});