(function() {
	'use strict';

	angular
		.module('app')
		.controller('MakeOrderController', makeOrderController);

	makeOrderController.$inject = ['PetsService', 'PetsHttp', '$routeParams', '$location'];

	function makeOrderController(PetsService, PetsHttp, $routeParams, $location) {
		var self = this;

		self.photoIndex=0;
		self.shipDate = new Date();
		self.now = new Date();
		self.shipDate.setDate(self.shipDate.getDate() + 3);
		self.selectedDays = "Em 3 dias";

		//get pet from API
		let promise = PetsHttp.getPet($routeParams.id);
		promise.then(function(success) {
			self.pet = success;
			self.pet.numberOfPhotos = self.pet.photoUrls.length;
	    }, function(){}); 

		//control ship date
	    self.changeShipDate = function(days) {
			self.selectedDays = "Em " + days + " dias";

			self.shipDate = new Date(self.now);
			self.shipDate.setDate(self.shipDate.getDate() + days);
		}

		//create pet order (post request)
		self.makeOrder = function() {
			let order = {
				id : self.pet.id,
				petId : self.pet.id,
				quantity : 1,
				shipDate : self.shipDate,
				status : "placed",
				complete : false
			};

			let promise = PetsHttp.makePetOrder(order);

			//success - order placed
			promise.then(function(success) {
				$location.path('/orderPlaced/' + order.id);
		    }, 
		    //error - order not placed
		    function(data){
	            console.log(data);
	        }); 
		};

		//control thumbnail arrows
		self.changeImage = function(direction) {
			if(direction=='next') {
				if(self.photoIndex < self.pet.numberOfPhotos) 
					self.photoIndex++;
			}
			else if(direction=='prev') {
				if(self.photoIndex > 0)
					self.photoIndex--;
			}
		};
		self.hideArrows = function(direction) {
			if((direction == 'next' && self.pet != undefined && self.photoIndex >= self.pet.numberOfPhotos-1) ||
				(direction == 'prev' && self.pet != undefined && self.photoIndex == 0))
				return {opacity:0};

			return {opacity:1};
		}
	}
})();