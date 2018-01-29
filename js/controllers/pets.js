(function() {
	'use strict';

	angular
		.module('app')
		.controller('PetsController', petsController);

	petsController.$inject = ['PetsService'];

	function petsController(PetsService) {
		var self = this;

		self.pets = PetsService.query({pet: 'pet', findByStatus: 'findByStatus', status: 'disponivel'});
		self.pets.$promise.then(function() {
			self.pets.forEach(function(pet) { pet.photoIndex = 0 });
		}, function() {});


		self.categories = ['Cachorro', 'Gato', 'Hamister'];
		self.category = "";

		self.filters = {};
		self.filters.bread = ['Ragdoll', 'Persa', 'Labrador', 'Poodle com Cocker', 'Cocker', 'Poodle Toy' , 'Golden Retriever', 'Rex', 'Sírio'];
		self.filters.size = ['Filhote', 'Adulto'];
		self.filters.gender = ['Fêmea', 'Macho'];
		self.selectedFilters = [];

		/*
		self.hideArrows = function(index, mainGrid, direction) {
			let pet = (mainGrid) ? self.pets[index] : self.clickedPet;

			if((direction == 'next' && pet.photoIndex>= pet.photoUrls.length-1) ||
				(direction == 'prev' && pet.photoIndex == 0))
				return {opacity:0};

			return {opacity:1};
		}

		self.changeImage = function(index, mainGrid, direction) {
			let pet = (mainGrid) ? self.pets[index] : self.clickedPet;

			if(direction=='next') {
				if(pet.photoIndex < pet.photoUrls.length)
					pet.photoIndex++;
			} else if(direction=='prev') {
				if(pet.photoIndex > 0)
					pet.photoIndex--;
			}
		};*/


		self.chooseCategory = function(category) {
			self.category = category;
		}

		self.chooseFilter = function(filter) {
			let index = self.selectedFilters.indexOf(filter);

			if(index > -1)
				self.selectedFilters.splice(index, 1);
			else
				self.selectedFilters.push(filter);
		}

		self.openPetDetailsModal = function(index) {
			self.clickedPet = self.pets[index];
			console.log(self.clickedPet);
			$('#petDetailsModal').modal('toggle');
		}

		self.closePetDetailsModal = function() {
			$('#petDetailsModal').modal('hide')
		}
	}
})();