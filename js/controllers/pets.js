(function() {
	'use strict';

	angular
		.module('app')
		.controller('PetsController', petsController);

	petsController.$inject = ['PetsService'];

	function petsController(PetsService) {
		var self = this;

		//get pets from API
		self.pets = PetsService.query({pet: 'pet', findByStatus: 'findByStatus', status: 'disponivel'});
		self.pets.$promise.then(function() {
			self.pets.forEach(function(pet) { pet.photoIndex = 0 });
		}, function() {});

		//initialize categories 
		self.categories = ['Cachorro', 'Gato', 'Hamister'];
		self.category = "";
		self.categoriesClass = ['bold', '', '', ''];

		//initialize filters 
		self.filters = {};
		self.filters.bread = ['Ragdoll', 'Persa', 'Labrador', 'Poodle com Cocker', 'Cocker', 'Poodle Toy' , 'Golden Retriever', 'Rex', 'Sírio'];
		self.filters.size = ['Filhote', 'Adulto'];
		self.filters.gender = ['Fêmea', 'Macho'];
		self.selectedFilters = [];

		
		//control thumbnail arrows
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
		};


		//control categories and filters
		self.chooseCategory = function($event, index) {
			self.category = (index > -1) ? self.categories[index] : "";

			self.categoriesClass = ['','','',''];
			self.categoriesClass[index+1] = 'bold';

		}
		self.chooseFilter = function(filter) {
			let index = self.selectedFilters.indexOf(filter);

			if(index > -1)
				self.selectedFilters.splice(index, 1);
			else
				self.selectedFilters.push(filter);
		}

		//control modal
		self.openPetDetailsModal = function(index) {
			self.clickedPet = self.pets[index];
			$('#petDetailsModal').modal('toggle');
		}
		self.closePetDetailsModal = function() {
			$('#petDetailsModal').modal('hide')
		}
	}
})();