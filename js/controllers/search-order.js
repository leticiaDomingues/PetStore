(function() {
	'use strict';

	angular
		.module('app')
		.controller('SearchOrderController', searchOrderController);

	searchOrderController.$inject = ['PetsHttp','$location', '$localStorage'];

	function searchOrderController(PetsHttp, $location, $localStorage) {
		var self = this;
		self.photoIndex=0;
		self.showPet = {display:'none'};
		self.showError = {display:'none'};


		self.searchOrder = function() {
			if(self.orderId != undefined && self.orderId != "") {
				//get - order and pet info
				let promise = PetsHttp.getOrder(self.orderId);
				promise.then(function(data) {
					self.order = data;
					self.order.shipDate = self.formatDate(self.order.shipDate);

					let promise = PetsHttp.getPet(self.order.petId);
					
					self.showPet = {display:'flex'};
					self.showError = {display:'none'};
					promise.then(function(data) {
						self.pet = data;
				    }, function(){}); 
			    }, function(){
			    	self.showPet = {display:'none'};
					self.showError = {display:'inline-block'};
			    });
			} else {
				self.showPet = {display:'none'};
				self.showError = {display:'none'};
			}
		};

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