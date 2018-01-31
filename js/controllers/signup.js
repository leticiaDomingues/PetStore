(function() {
	'use strict';

	angular
		.module('app')
		.controller('SignupController', signupController);

	signupController.$inject = ['$scope','PetsHttp',  '$location', 'ValidatorService', '$localStorage'];

	function signupController($scope, PetsHttp, $location, ValidatorService, $localStorage) {
		var self = this;
		self.signupError = { display: 'none'};

		self.user = {
			firstName : "",
			lastName : "",
			email : "",
			username : "",
			password : ""
		}

		//redirect to the home page if user is already logged-in
		if($localStorage.user)
			$location.path('/');

		self.signup = function() {
			console.log(self.user);

			let promise = PetsHttp.signup(self.user);

			promise.then(function(data) {
				//put user in the session variable
				$localStorage.user = data.config.data;
				//update main view (username)
				$scope.$parent.$parent.currentUser = $localStorage.user;

				//redirect to home 
				$location.path('/');
		    }, function(data){
		    	self.signupError = { display: 'block'};
	            console.log(data);
	        }); 				
			
		};

		self.cleanFields = function() {
			self.user.firstName = "";
			self.user.lastName = "";
			self.user.email = "";
			self.user.username = "";
			self.user.password = "";
		};
	}
})();