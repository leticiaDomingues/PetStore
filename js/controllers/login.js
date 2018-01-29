(function() {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', loginController);

	loginController.$inject = ['PetsService',  '$location', 'ValidatorService'];

	function loginController(PetsService, $location, ValidatorService) {
		var self = this;
		self.errors = ValidatorService.errors;

		self.user = {
			username : "",
			password : ""
		}

		self.logar = function() {
			if(ValidatorService.validadeFields(self.user)) {

				//TODO: requisicao
			}
		};
	}
})();