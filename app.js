(function () { //IEFE

    var app = angular.module("NarrowItDownApp", []); //Declare module

    app.directive("foundItemsInList", function () { //Declare directive
        var ddo = {
            templateUrl: 'list.html',
            scope: {
                found: '<',
                onRemove: '&'
            }
        };

        return ddo;
    });

    app.controller('NarrowItDownController', ['$scope', 'MenuSearchService', function ($scope, MenuSearchService) {
        var narrow = this;

        narrow.search = "";

        narrow.NarrowItDown = function (search) {
            if (narrow.search === "") {
                narrow.found = [];
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(narrow.search);
            promise.then(function (response) {
                    narrow.found = response;
                })
                .catch(function (error) {
                    console.log("Something went wrong", error);
                });
        };


        narrow.remove = function (index) {
            this.found.splice(index, 1);
        };

    }]);

    app.service('MenuSearchService', ['$http', function ($http) {
        var menuData = [];
        this.getMatchedMenuItems = function (term) {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (response) {
                menuData = response.data;

                // console.log(menuData.menu_items);
                var foundItems = [];
                var lowerCase;
                for (var i = 0; i < menuData.menu_items.length; i++) {
                    lowerCase = menuData.menu_items[i].description.toLowerCase();
                    if (lowerCase.indexOf(term.toLowerCase()) >= 0) {
                        foundItems.push(menuData.menu_items[i]);
                    }

                }
                //console.log(foundItems.length);
                return foundItems;
            });
        };
                }]);

}());