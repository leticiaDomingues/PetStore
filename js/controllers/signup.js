(function() {
	'use strict';

	angular
		.module('app')
		.controller('SignupController', signupController);

	signupController.$inject = ['$scope','PetsHttp',  '$location', '$localStorage'];

	function signupController($scope, PetsHttp, $location, $localStorage) {
		var self = this;

		//internal error and username taken error
		self.errors = [{ display: 'none'},{ display: 'none'}];

		//user object
		self.user = {
			firstName : "",
			lastName : "",
			email : "",
			username : "",
			password : ""
		}

		//firstName, lastName, email, username, password
		self.maxLength = [30,30,50,20,20];
		self.ngDirtyWhenSubmitted="";

		//redirect to the home page if user is already logged-in
		if($localStorage.user)
			$location.path('/');

		self.signup = function() {
			//check if the username is already taken
			let promise = PetsHttp.login(self.user);

			//username taken
			promise.then(function() { 
				self.errors[1] = { display: 'block'};
			}, 
		    //username not taken
		    function(){ 
		    	let promise = PetsHttp.signup(self.user);

				promise.then(function(data) {
					//put user in the session variable
					$localStorage.user = data.config.data;
					//update main view (username)
					$scope.$parent.$parent.currentUser = $localStorage.user;

					//redirect to home 
					$location.path('/');
			    }, function(data){
			    	self.errors[0] = { display: 'block'};
		        }); 
		    }); 
		};

		self.dirtyWhenSubmitted = function() {
			self.ngDirtyWhenSubmitted="ng-dirty";
		}

		self.cleanFields = function() {
			self.user.firstName = "";
			self.user.lastName = "";
			self.user.email = "";
			self.user.username = "";
			self.user.password = "";
		};
	}
})();