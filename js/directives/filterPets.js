(function() {
	'use strict';

	angular
		.module('app')
		.filter('selectFilters', selectFilters);


	function selectFilters($filter) {
		return function(list, arrayFilter){
		    if(arrayFilter.length > 0){
		        return $filter("filter")(list, function(listItem){
		          for (var i = 0; i < arrayFilter.length; i++) {
		          	for(var j=0; j<3; j++) {
		              if (arrayFilter[i].toLowerCase() == listItem.tags[j].name.toLowerCase()) 
		                return true;
		          	}
		          }	
		          return false;
		        });
		    } else if(arrayFilter.length == 0){
		    	return $filter("filter")(list, function(listItem){
		        	return true;
		        });
		    }
		};
	}

})();