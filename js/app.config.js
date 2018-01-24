(function() {
	'use strict';
	angular.module('app').value('config', config);

	function config() {
		baseUrl : 'http://petstore.swagger.io/v2'
	}
})();