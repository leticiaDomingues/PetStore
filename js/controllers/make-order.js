(function() {
	'use strict';

	angular
		.module('app')
		.controller('MakeOrderController', makeOrderController);

	makeOrderController.$inject = ['PetsService', '$routeParams', '$location'];

	function makeOrderController(PetsService, $routeParams, $location) {
		var self = this;

		self.pet = PetsService.get({pet: 'pet', id:$routeParams.id});
		self.photoIndex=0;

		self.changeImage = function(direction) {
			if(direction=='next') {
				if(self.photoIndex < self.pet.photoUrls.length) {
					self.photoIndex++;
				}
				else {
					//TODO: right arrow disabled
				}
			}
			else if(direction=='prev') {
				if(self.photoIndex > 0) {
					self.photoIndex--;
				} else {
					//TODO: left arrow disabled
				}
			}
		};


		self.makeOrder = function() {
			//order object with the correct data
			self.order = PetsService.get({store: 'store', order: 'order', id:3});
			self.order.$promise.then(function() {
				self.order.id = self.generateId();
				self.order.petId = self.pet.id;
				self.order.quantity = 1;
				self.order.shipDate = self.shipDate;
				self.status = 'placed';
				self.complete = 'false';
			}, function() {});
			
			//POST request
			self.result = PetsService.save(
				{
					store: 'store',
					order: 'order'
				}, 
				JSON.parse(angular.toJson(self.order)),
				//caso tenha sucesso
				function(data, status, headers, config) {
					$location.path('/');
				},
				//caso tenha falha
				function(data) {
					console.log(data);
				}
			);
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