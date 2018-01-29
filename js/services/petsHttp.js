(function() {
	'use strict';

	angular
		.module('app')
		.factory('PetsHttp', petsHttp);

	petsHttp.$inject = ['$http'];

	function petsHttp($http) {
		let baseUrl = 'http://petstore.swagger.io/v2';	

		function login(user) {
	        return $http.get(baseUrl + '/user/' + user.username).then(function(result){
	        	if(result.data.password == user.password) {
			  		return result.data;
			  	}
	            return null;
	        });
		};

		function originalLogin(user) {
			$http({
			    url: baseUrl + '/user/login', 
			    method: "GET",
			    params: {username: user.username,
			    		 password: user.password}
			})
			  .success(function(data, status, headers, config) {
			  	console.log(data);
			  	console.log(status);
			    // 400/500 errors show up here
				if (status == 400)
				{
					console.log('Should never happen')
				}
			  }).
			  error(function(data, status, headers, config) {});
		};

		return {
			login : login,
			originalLogin : originalLogin
		};
	}
})();