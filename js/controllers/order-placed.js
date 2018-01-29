(function() {
	'use strict';

	angular
		.module('app')
		.controller('OrderPlacedController', orderPlacedController);

	orderPlacedController.$inject = ['PetsService', '$routeParams', '$location'];

	function orderPlacedController(PetsService, $routeParams, $location) {
		var self = this;

		//get - order and pet info
		self.order = PetsService.get({store: 'store', order: 'order', id:$routeParams.id});
		self.order.$promise.then(function() {
			self.pet = PetsService.get({pet: 'pet', id:self.order.petId});
			self.order.shipDate = self.formatDate(self.order.shipDate);
			console.log(self.order);
		}, function() {});
		self.photoIndex=0;

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
			if((direction == 'next' && self.photoIndex >= self.pet.photoUrls.length-1) ||
				(direction == 'prev' && self.photoIndex == 0))
				return {opacity:0};

			return {opacity:1};
		}

		self.formatDate = function(date) {
			return date.substring(8, 10) + '/' +
				date.substring(5, 7) + '/' +
				date.substring(0, 4);
		}
	}
})();