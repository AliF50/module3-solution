(function () {
    var app = angular.module("NarrowItDownApp", []);

    app.controller('NarrowItDownController', ['$scope', 'MenuSearchService', function ($scope, MenuSearchService) {

        this.NarrowItDown = function (search) {
            this.results = MenuSearchService.getMatchedMenuItems(search);
        };

    }]);

    app.service('MenuSearchService', ['$http', function ($http) {
        var menuData = [];
        this.getMatchedMenuItems = function (term) {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (response) {
                menuData = response.data;

                console.log(menuData.menu_items.length);
                var foundItems = [];
                var lowerCase;
                for (var i = 0; i < menuData.menu_items.length; i++) {
                    lowerCase = menuData.menu_items[i].name.toLowerCase();
                    if (lowerCase.indexOf(term.toLowerCase()) > 0) {
                        foundItems.push(menuData.menu_items[i]);
                    }

                }
                // console.log(foundItems);
                return foundItems;
            });

        };
                }]);

}());