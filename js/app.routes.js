(function() {
	'use strict';
	angular
		.module('app')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'view/pets.html'
			})
			.when('/makeOrder/:id', {
				templateUrl : 'view/make-order.html'
			})
			.when('/orderPlaced/:id', {
				templateUrl : 'view/order-placed.html'
			})
			.when('/login/:previousPage', {
				templateUrl : 'view/login.html'
			})
			.when('/login', {
				templateUrl : 'view/login.html'
			})
			.when('/signup', {
				templateUrl : 'view/signup.html'
			})
			.when('/searchOrder', {
				templateUrl : 'view/search-order.html'
			});
	}
})();