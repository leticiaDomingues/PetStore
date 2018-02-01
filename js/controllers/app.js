(function() {
	'use strict';

	angular
		.module('app')
		.controller('AppController', appController);

	appController.$inject = ['$scope','PetsHttp', '$location', '$localStorage'];

	function appController($scope, PetsHttp, $location, $localStorage) {
		var self = this;
		$scope.currentUser = $localStorage.user;
		$scope.pets = [];

		self.activeClass=['active', '',''];

		self.logout = function() {
			//remove as variaveis de sessao
			$scope.currentUser = null;
			$localStorage.user = null;

			//retorna para a home page
			$location.path('/');
		}

		self.changeActiveClass = function(index) {
			switch(index) {
				case 0: self.activeClass = ['active', '', ''];break;
				case 1: self.activeClass = ['', 'active', ''];break;
				case 2: self.activeClass = ['', '', 'active'];break;
			}
		}

		self.refresh = function() {
			$scope.$broadcast ('cleanFilters');     
			self.changeActiveClass(0);
		}
	}
})();