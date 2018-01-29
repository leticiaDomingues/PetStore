(function() {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', loginController);

	loginController.$inject = ['$scope','PetsHttp',  '$location', 'ValidatorService', '$localStorage'];

	function loginController($scope, PetsHttp, $location, ValidatorService, $localStorage, $sessionStorage) {
		var self = this;
		self.errors = ValidatorService.errors;
		self.errors.incorrectCredentials = { display: 'none'};

		self.user = {
			username : "",
			password : ""
		}

		if($localStorage.user)
			$location.path('/');

		self.logar = function() {
			if(ValidatorService.validadeFields(self.user)) {
				let promise = PetsHttp.login(self.user);

				//success - user found
				promise.then(function(success) {
					if(success) {
						//variavel de sessao do user
						$localStorage.user = success;
						//atualiza a view
						$scope.$parent.$parent.currentUser = $localStorage.user;
						$location.path('/');
					} else {
						self.errors.incorrectCredentials = { display: 'block'};
					}
			    }, 
			    //error - user not found
			    function(){
		            self.errors.incorrectCredentials = { display: 'block'};
		        }); 				
			}
		};
	}
})();