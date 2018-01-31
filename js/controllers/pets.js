(function() {
	'use strict';

	angular
		.module('app')
		.controller('PetsController', petsController);

	petsController.$inject = ['$scope','PetsService', 'PetsHttp'];

	function petsController($scope, PetsService) {
		var self = this;

		//pagination var
		$scope.currentPage = 1;
		self.paginatedPets = [];
  		self.numPerPage = 8
  		self.paginationClasses=['disabled',''];
  		self.pages = [];
  		self.numberOfPages;


		//get pets from API
		self.pets = [];
		let petsBD = PetsService.query({pet: 'pet', findByStatus: 'findByStatus', status: 'disponivel'});
		petsBD.$promise.then(function() {
			petsBD.forEach(function(pet) { 
				pet.photoIndex = 0; 
				pet.numberOfPhotos = pet.photoUrls.length;

				//fixing API bug
				if(pet.id!=9205436248879931000)
					self.pets.push(pet);
			});


		    self.paginatePets();
		    self.numberOfPages = Math.ceil(self.pets.length / self.numPerPage);

		    for(let i=0; i<self.numberOfPages; i++)
		    	self.pages[i] = (i==0) ? 'active' : '';


		    console.log(self.pets);
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
			let aux = ($scope.currentPage-1) * self.numPerPage;
			let pet = (mainGrid) ? self.pets[index+aux] : self.clickedPet;

			if((direction == 'next' && pet!=undefined && pet.photoIndex>= pet.numberOfPhotos-1) ||
				(direction == 'prev' && pet!=undefined && pet.photoIndex == 0))
				return {opacity:0};

			return {opacity:1};
		}
		self.changeImage = function(index, mainGrid, direction) {
			let aux = ($scope.currentPage-1) * self.numPerPage;
			let pet = (mainGrid) ? self.pets[index+aux] : self.clickedPet;

			if(direction=='next') {
				if(pet.photoIndex < pet.numberOfPhotos)
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
			let aux = ($scope.currentPage-1) * self.numPerPage;
			self.clickedPet = self.pets[index+aux];
			$('#petDetailsModal').modal('toggle');
		}
		self.closePetDetailsModal = function() {
			$('#petDetailsModal').modal('hide')
		}

		//control pagination
		$scope.$watch("currentPage", function() {
		     self.paginatePets();
 		});
 		self.paginatePets = function() {
 			let begin = (($scope.currentPage - 1) * self.numPerPage);
		   	let end = begin + self.numPerPage;

		    self.paginatedPets = self.pets.slice(begin, end);
 		}
		self.changePage = function(index) {
			switch(index) {
				case -1: $scope.currentPage--;
						 break;
				case 0:  $scope.currentPage++;
						 break;
				default: $scope.currentPage = index;
			}

			if($scope.currentPage == self.pages.length) self.paginationClasses=['','disabled'];
			if($scope.currentPage == 1) self.paginationClasses=['disabled',''];
			for(let i=0; i<self.numberOfPages; i++) {
		    	self.pages[i] = (i==$scope.currentPage-1) ? 'active' : '';
			}
		}
	}
})();