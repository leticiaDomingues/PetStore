(function() {
	'use strict';

	angular
		.module('app')
		.factory('UserOrdersHttp', userOdersHttp);

	userOdersHttp.$inject = ['$http'];

	function userOdersHttp($http) {
		let baseUrl = 'https://opus-pets.firebaseio.com/';	

		function getOrders(username) {
			let url = baseUrl + '/cliente-pedidos/' + username + '.json';
	        return $http.get(url).then(function(result){
			  	return result.data;
	        });
		};

		function addOrder(username, orderId) {
			let url = baseUrl + '/cliente-pedidos/' + username + '/' + orderId + '.json';
			let order = { id : orderId }
			return $http.put(url, order);
		};

		return {
			getOrders : getOrders,
			addOrder : addOrder
		};
	}
})();