(function() {
	'use strict';

	angular
		.module('app')
		.controller('SearchOrderController', searchOrderController);

	searchOrderController.$inject = ['$scope', 'PetsHttp','$location', '$localStorage', 'UserOrdersHttp'];

	function searchOrderController($scope, PetsHttp, $location, $localStorage, UserOrdersHttp) {
		var self = this;
		self.photoIndex=0;
		self.showError = {display:'none'};
		self.orders = [];
		self.user = $localStorage.user;

		//redirect to the home page if user is not logged-in
		if(!$localStorage.user)
			$location.path('/');
		
		//get orders by user
		let promise = UserOrdersHttp.getOrders(self.user.username);
		promise.then(function(result) {
			if(result == 'null') {
				self.showError = {display:'inline-block'};
			}
			else {
				self.showError = {display:'none'};
				for(let order in result) {
				   let promise = PetsHttp.getOrder(order);
					promise.then(function(data) {
						data.shipDate = self.formatDate(data.shipDate);
						self.orders.push(data);

						self.orders.forEach(function(o) { 
							let promise = PetsHttp.getPet(o.petId);
							promise.then(function(d) {
								o.pet = d;
								o.pet.photoIndex = 0;
						    }, function(){}); 						
						});
				    }, function(){}); 
				}
			}
	    }, function(){}); 

		//watch orders variable, to display error messages when necessary.
	    $scope.$watch("sOrderCtrl.orders |  filter:sOrderCtrl.orderId ", function(filtered) {
		    self.filteredOrders = filtered;

		    if(self.filteredOrders.length == 0)
		    	self.showError = {display:'block'};
		    else 
		    	self.showError = {display:'none'};
 		}, true);

		//control thumbnail arrows
		self.changeImage = function(pet, direction) {
			if(direction=='next') {
				if(pet.photoIndex < pet.photoUrls.length) 
					pet.photoIndex++;
			}
			else if(direction=='prev') {
				if(pet.photoIndex > 0)
					pet.photoIndex--;
			}
		};
		self.hideArrows = function(pet, direction) {
			if((direction == 'next' && pet != undefined && pet.photoIndex >= pet.photoUrls.length-1) ||
				(direction == 'prev' && pet != undefined && pet.photoIndex == 0))
				return {opacity:0};

			return {opacity:1};
		}

		//deixa a data no formato dd/MM/yyyy
		self.formatDate = function(date) {
			return date.substring(8, 10) + '/' +
				date.substring(5, 7) + '/' +
				date.substring(0, 4);
		}
	}
})();