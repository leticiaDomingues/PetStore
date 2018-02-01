(function() {
	'use strict';

	angular
		.module('app')
		.controller('MyProfileController', myProfileController);

	myProfileController.$inject = ['$scope','PetsHttp',  '$location', '$localStorage'];

	function myProfileController($scope, PetsHttp, $location, $localStorage) {
		var self = this;

		//internal error and success message
		self.messages = [{ display: 'none'},{display:'none'}];

		//firstName, lastName, email, username, password
		self.maxLength = [30,30,50,20,20];
		self.ngDirtyWhenSubmitted="";

		//redirect to the home page if user is not logged-in
		if(!$localStorage.user)
			$location.path('/');

		self.user = angular.copy($localStorage.user);

		self.edit = function() {
			//clean messages
			self.messages = [{ display: 'none'}, {display:'none'}];

			let promise = PetsHttp.editUser($localStorage.user.username, self.user);
			promise.then(function(data) {
				//put user in the session variable
				$localStorage.user = angular.copy(self.user);
				//update main view (username)
				$scope.$parent.$parent.currentUser = angular.copy($localStorage.user);

				self.messages[1] = { display: 'block'};
		    }, function(data){
		    	self.messages[0] = { display: 'block'};
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