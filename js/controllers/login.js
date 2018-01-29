(function() {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', loginController);

	loginController.$inject = ['PetsService','$location'];

	function loginController(PetsService, $routeParams, $location) {
		var self = this;

		self.errors = {
			displayUsernameError : {display: 'none'},
			displayPasswordError : {display: 'none'},
			borderUsernameError : {border: '1px solid #ced4da'},
			borderPasswordError : {border: '1px solid #ced4da'}
		}

		self.user = {
			username : "",
			password : ""
		}

		self.logar = function() {
			if(self.validadeFields()) {
				//TODO: requisicao
			}
		};

		self.validadeFields = function() {
			if(self.user.username != "" && self.user.username != undefined
				&& self.user.password != "" && self.user.password != undefined) {
				self.cleanErrors();
				return true;
			}

			self.showErrors();
			return false;
		};

		self.showErrors = function() {
			self.cleanErrors();
			if(self.user.username == "" || self.user.username == undefined) {
				self.errors.displayUsernameError.display = 'inline-block';
				self.errors.borderUsernameError.border = '0.5px solid rgba(255, 0, 0, .3)';
			}
			
			if(self.user.password == "" || self.user.password == undefined) {
				self.errors.displayPasswordError.display = 'inline-block';
				self.errors.borderPasswordError.border = '0.5px solid rgba(255, 0, 0, .3)';
			}
		}

		self.cleanErrors = function() {
			self.errors.displayUsernameError = {display: 'none'};
			self.errors.displayPasswordError = {display: 'none'};
			self.errors.borderUsernameError = {border: '1px solid #ced4da'};
			self.errors.borderPasswordError = {border: '1px solid #ced4da'};
		}
	}
})();