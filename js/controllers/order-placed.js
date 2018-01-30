(function() {
	'use strict';

	angular
		.module('app')
		.controller('OrderPlacedController', orderPlacedController);

	orderPlacedController.$inject = ['PetsHttp', '$routeParams', '$location'];

	function orderPlacedController(PetsHttp, $routeParams, $location) {
		var self = this;
		self.photoIndex=0;

		//get - order and pet info
		let promise = PetsHttp.getOrder($routeParams.id);
		promise.then(function(data) {
			self.order = data;
			self.order.shipDate = self.formatDate(self.order.shipDate);

			let promise = PetsHttp.getPet(self.order.petId);
			promise.then(function(data) {
				self.pet = data;
		    }, function(){}); 
	    }, function(){}); 

		//control thumbnail arrows
		self.changeImage = function(direction) {
			if(direction=='next') {
				if(self.photoIndex < self.pet.photoUrls.length) 
					self.photoIndex++;
			}
			else if(direction=='prev') {
				if(self.photoIndex > 0)
					self.photoIndex--;
			}
		};
		self.hideArrows = function(direction) {
			if((direction == 'next' && self.pet != undefined && self.photoIndex >= self.pet.photoUrls.length-1) ||
				(direction == 'prev' && self.pet != undefined && self.photoIndex == 0))
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