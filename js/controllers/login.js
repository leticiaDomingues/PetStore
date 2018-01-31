(function() {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', loginController);

	loginController.$inject = ['$scope','PetsHttp',  '$location', '$localStorage' ,'$routeParams'];

	function loginController($scope, PetsHttp, $location, $localStorage, $routeParams) {
		var self = this;

		//validation variables
		self.incorrectCredentials = { display: 'none'};
		self.ngDirtyWhenSubmitted="";

		//location variable
		self.previousPage = ($routeParams.previousPage) ? $routeParams.previousPage : "home";


		//user object
		self.user = {
			username : "",
			password : ""
		}

		//redirect to home if user is already logged-in
		if($localStorage.user)
			$location.path('/');

		self.logar = function() {
			let promise = PetsHttp.login(self.user);

			//success - user found
			promise.then(function(success) {
				if(success) {
					//variavel de sessao do user
					$localStorage.user = success;
					//atualiza a view
					$scope.$parent.$parent.currentUser = $localStorage.user;

					if(self.previousPage=='home')
						$location.path('/');
					else if(self.previousPage.indexOf('makeOrder') > -1)
						$location.path('/makeOrder/' + self.previousPage.substring(9));
				} else {
					self.incorrectCredentials = { display: 'block'};
				}
		    }, 
		    //error - user not found
		    function(){
	            self.incorrectCredentials = { display: 'block'};
	        }); 				
		};

		self.dirtyWhenSubmitted = function() {
			self.ngDirtyWhenSubmitted="ng-dirty";
		};
	}
})();