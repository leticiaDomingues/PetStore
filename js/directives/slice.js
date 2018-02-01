
(function() {
	'use strict';

	angular
		.module('app')
		.filter('slice', slice);


	function slice() {
		return function(arr, start, end) {
			return (arr || []).slice(start, end);
		};
	}

})();