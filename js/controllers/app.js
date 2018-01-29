(function() {
	'use strict';

	angular
		.module('app')
		.controller('AppController', appController);

	appController.$inject = ['$scope','PetsHttp', '$location', '$localStorage'];

	function appController($scope, PetsHttp, $location, $localStorage) {
		var self = this;
		$scope.currentUser = $localStorage.user;

		self.logout = function() {
			//remove as variaveis de sessao
			$scope.currentUser = null;
			$localStorage.user = null;

			//retorna para a home page
			$location.path('/');
		}
	}
})();