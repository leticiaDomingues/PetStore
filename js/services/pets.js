(function() {
	'use strict';

	angular
		.module('app')
		.factory('PetsService', petsService);


	petsService.$inject = ['$resource'];

	function petsService($resource) {
		return $resource(
			'http://petstore.swagger.io/v2' + '/:pet/:findByStatus/:store/:order/:id',
			{
		      	//status : status
		    }
		);
	}

})();