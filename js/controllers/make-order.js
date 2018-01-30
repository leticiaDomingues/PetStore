(function() {
	'use strict';

	angular
		.module('app')
		.controller('MakeOrderController', makeOrderController);

	makeOrderController.$inject = ['PetsService', '$routeParams', '$location'];

	function makeOrderController(PetsService, $routeParams, $location) {
		var self = this;

		self.pet = PetsService.get({pet: 'pet', id:$routeParams.id});
		self.pet.$promise.then(function() {
			self.pet.numberOfPhotos = self.pet.photoUrls.length;
		}, function() {});

		self.photoIndex=0;

		self.changeImage = function(direction) {
			if(direction=='next') {
				if(self.photoIndex <self.pet.numberOfPhotos) 
					self.photoIndex++;
			}
			else if(direction=='prev') {
				if(self.photoIndex > 0)
					self.photoIndex--;
			}
		};

		self.hideArrows = function(direction) {
			if((direction == 'next' && self.photoIndex >= self.pet.numberOfPhotos-1) ||
				(direction == 'prev' && self.photoIndex == 0))
				return {opacity:0};

			return {opacity:1};
		}

		self.makeOrder = function() {
			//order object with the correct data
			self.order = PetsService.get({store: 'store', order: 'order', id:3});
			self.order.$promise.then(function() {
				//self.order.id = self.generateId();
				//TODO: ID!!!
				self.order.petId = self.pet.id;
				self.order.quantity = 1;
				self.order.shipDate = self.shipDate;
				self.status = 'placed';
				self.complete = 'false';

				//POST request
				self.result = PetsService.save(
					{
						store: 'store',
						order: 'order'
					}, 
					JSON.parse(angular.toJson(self.order)),
					//caso tenha sucesso
					function(data, status, headers, config) {
						console.log(data);
						$location.path('/orderPlaced/' + self.order.id);
					},
					//caso tenha falha
					function(data) {
						console.log(data);
					}
				);
			}, function() {});
		};

		self.generateId = function() {
			let text = "";
			let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			const ID_LENGTH = 10;

			for(let i=0; i<10; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}
	}
})();