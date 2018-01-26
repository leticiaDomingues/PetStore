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
			});	
	}
})();