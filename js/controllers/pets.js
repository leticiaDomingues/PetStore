(function() {
	'use strict';

	angular
		.module('app')
		.controller('PetsController', petsController);

	petsController.$inject = ['$scope','PetsHttp', '$window'];

	function petsController($scope, PetsHttp, $window) {
		var self = this;

		//pagination var
		$scope.currentPage = 1;
		self.filtered = [];
  		self.numPerPage = 8
  		self.paginationClasses=['disabled',''];
  		self.numberOfPages;
  		self.noPetsAvailable = 'display-none';

		//get pets from API
		self.pets = [];

		//get pets from API
		let promise = PetsHttp.getAvailablePets();
		promise.then(function(data) { 
			data.forEach(function(pet) { 
				pet.photoIndex = 0; 
				pet.numberOfPhotos = pet.photoUrls.length;

				//fixing API bug
				if(pet.id!=9205436248879931000 && pet.id!=9205436248879933620) {
					self.pets.push(pet);

					if(self.filters.breed.indexOf(pet.tags[0].name.toLowerCase()) == -1)
						self.filters.breed.push(pet.tags[0].name.toLowerCase());
				}

				self.calculatePages(true);

				
			});
			console.log(self.pets);
		}, function(){}); 

		//initialize categories 
		self.categories = ['Cachorro', 'Gato', 'Hamister'];
		self.category = "";
		self.categoriesClass = ['bold', '', '', ''];

		//initialize filters 
		self.filters = {};
		self.filters.breed = [];
		//self.filters.breed = ['Ragdoll', 'Persa', 'Labrador', 'Poodle com Cocker', 'Cocker', 'Poodle Toy' , 'Golden Retriever', 'Rex', 'Sírio'];
		self.filters.size = ['Filhote', 'Adulto'];
		self.filters.gender = ['Fêmea', 'Macho'];
		self.selectedFilters = [];

		$scope.$on('cleanFilters', function() {   
	   		$window.location.reload();
	    });

		//control thumbnail arrows
		self.hideArrows = function(pet, mainGrid, direction) {
			if((direction == 'next' && pet!=undefined && pet.photoIndex>= pet.numberOfPhotos-1) ||
				(direction == 'prev' && pet!=undefined && pet.photoIndex == 0))
				return {opacity:0};

			return {opacity:1};
		}
		self.changeImage = function(pet, mainGrid, direction) {
			if(direction=='next') {
				if(pet.photoIndex < pet.numberOfPhotos)
					pet.photoIndex++;
			} else if(direction=='prev') {
				if(pet.photoIndex > 0)
					pet.photoIndex--;
			}
		};

		//control categories and filters
		$scope.$watch("petsCtrl.pets |  filter:search | filter: petsCtrl.category |selectFilters:petsCtrl.selectedFilters", function(filteredPets) {
		    self.filtered = filteredPets;
		    self.calculatePages(false);
		    if(self.filtered.length == 0)
		    	self.noPetsAvailable = '';
		    else 
		    	self.noPetsAvailable = 'display-none';
 		}, true);
		self.chooseCategory = function(index) {
			self.category = (index > -1) ? self.categories[index] : "";

			self.categoriesClass = ['','','',''];
			self.categoriesClass[index+1] = 'bold';

			self.calculatePages(false);
			self.changePage(1);
		}
		self.chooseFilter = function(filter) {
			let index = self.selectedFilters.indexOf(filter);

			if(index > -1)
				self.selectedFilters.splice(index, 1);
			else
				self.selectedFilters.push(filter);

			self.changePage(1);
		}

		//control modal
		self.openPetDetailsModal = function(pet) {
			self.clickedPet = Object.create(pet);
			$('#petDetailsModal').modal('toggle');
		}
		self.closePetDetailsModal = function() {
			$('#petDetailsModal').modal('hide')
		}

		//control pagination
 		self.calculatePages = function(all) {
 			let numOfPets = (all) ? self.pets.length : self.filtered.length;
 			self.numberOfPages = Math.ceil(numOfPets / self.numPerPage);

 			self.pages = [];
		    for(let i=0; i<self.numberOfPages; i++)
		    	self.pages[i] = (i==$scope.currentPage-1) ? 'active' : '';

		    if(self.numberOfPages==0) self.paginationClasses=['display-none','display-none'];
		    else if(self.numberOfPages==0) self.paginationClasses=['disabled','disabled'];
			else {
				if($scope.currentPage == self.pages.length) self.paginationClasses=['','disabled'];
				if($scope.currentPage == 1) self.paginationClasses=['disabled',''];
			}
 		}
		self.changePage = function(index) {
			switch(index) {
				case -1: $scope.currentPage--;
						 break;
				case 0:  $scope.currentPage++;
						 break;
				default: $scope.currentPage = index;
			}

			self.calculatePages(false);			
		}
		self.paginateWithFilter = function() {
			$scope.currentPage = 1;
		}
	}
})();