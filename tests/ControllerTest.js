/**
 * Testing Controllers
 */
describe("Testing MobiApp -", function() {

    // Arrange
    var mockScope, controller, backend, mockInterval, mockTimeout;

    beforeEach(angular.mock.module("MobiApp"));

    beforeEach(angular.mock.inject(function($httpBackend) {
        backend = $httpBackend;
        backend.expect("GET", "data/getUser.json").respond(
            {
                "users":
                    [{
                        "First": "Bugs",
                        "Last": "Bunny",
                        "Age": 23
                    },
                        {
                            "First": "Homer",
                            "Last": "Simpson",
                            "Age": 30
                        },
                        {
                            "First": "Mickey",
                            "Last": "Mouse",
                            "Age": 19
                        },
                        {
                            "First": "Charlie",
                            "Last": "Brown",
                            "Age": 52
                        },
                        {
                            "First": "Donald",
                            "Last": "Duck",
                            "Age": 27
                        }]
            }
        );
    }));


    beforeEach(angular.mock.inject(function($controller, $rootScope, $http, $interval, $timeout) {
        mockScope = $rootScope.$new();
        mockInterval = $interval;
        mockTimeout = $timeout;
        $controller("ListCtrl", {
            $scope : mockScope,
            $http : $http,
            $interval : mockInterval,
            $timeout : mockTimeout
        });
        backend.flush();
    }));

    beforeEach(angular.mock.inject(
        function( _$location_, _$route_, _$rootScope_ ) {
            location = _$location_;
            route = _$route_;
            rootScope = _$rootScope_;
        }));

    it('should test routes', inject(function ($route) {
        expect($route.routes['/list'].controller).toBe('ListCtrl');
        expect($route.routes['/list'].templateUrl).toEqual('views/list.html');

        expect($route.routes['/edit'].controller).toBe('EditCtrl');
        expect($route.routes['/edit'].templateUrl).toEqual('views/edit.html');

    }));


    // Act and Assess
    it("Makes an Ajax request", function() {
        backend.verifyNoOutstandingExpectation();
    });

    it("Processes the data", function() {
        expect(mockScope.users).toBeDefined();
        expect(mockScope.users.length).toEqual(5);
    });


});