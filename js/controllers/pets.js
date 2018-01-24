(function() {
	'use strict';

	angular
		.module('app')
		.controller('PetsController', petsController);

	petsController.$inject = ['PetsService'];

	function petsController(PetsService) {
		var self = this;

		self.pets = PetsService.query({status: 'disponivel'});
		self.pets.$promise.then(function() {
			self.pets.forEach(function(pet) { pet.photoIndex = 0 });
		}, function() {});
		
		console.log(self.pets);

		self.changePetThumbnail = function(index) {
			self.pets[index].photoIndex++;
		}
	}
})();