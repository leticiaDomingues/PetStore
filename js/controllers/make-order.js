(function() {
	'use strict';

	angular
		.module('app')
		.controller('MakeOrderController', makeOrderController);

	makeOrderController.$inject = ['PetsService', '$routeParams'];

	function makeOrderController(PetsService, $routeParams) {
		var self = this;

		self.pet = PetsService.get({id:$routeParams.id});
		self.photoIndex=0;

		self.changeImage = function(direction) {
			if(direction=='next') {
				if(self.photoIndex < self.pet.photoUrls.length) {
					self.photoIndex++;
				}
				else {

				}
			}
			else if(direction=='prev') {
				if(self.photoIndex > 0) {
					self.photoIndex--;
				} else {
					//TODO: left arrow disabled
				}
			}
		}
	}
})();