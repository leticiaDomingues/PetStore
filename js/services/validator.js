(function() {
	'use strict';

	angular
		.module('app')
		.factory('ValidatorService', validatorService);

	function validatorService() {
		let errors = {
			displayUsernameError : {display: 'none'},
			displayPasswordError : {display: 'none'},
			borderUsernameError : {border: '1px solid #ced4da'},
			borderPasswordError : {border: '1px solid #ced4da'}
		};

		function validadeFields(user) {
			if(user.username != "" && user.username != undefined
				&& user.password != "" && user.password != undefined) {
				cleanErrors();
				return true;
			}

			showErrors(user);
			return false;
		};

		function showErrors(user) {
			cleanErrors();
			if(user.username == undefined || user.username == "") {
				errors.displayUsernameError.display = 'inline-block';
				errors.borderUsernameError.border = '0.5px solid rgba(255, 0, 0, .3)';
			}
			
			if(user.password == undefined || user.password == "") {
				errors.displayPasswordError.display = 'inline-block';
				errors.borderPasswordError.border = '0.5px solid rgba(255, 0, 0, .3)';
			}
		}

		function cleanErrors() {
			errors.displayUsernameError = {display: 'none'};
			errors.displayPasswordError = {display: 'none'};
			errors.borderUsernameError = {border: '1px solid #ced4da'};
			errors.borderPasswordError = {border: '1px solid #ced4da'};
		}

		return {
			errors : errors,
			validadeFields : validadeFields,
			showErrors : showErrors,
			cleanErrors : cleanErrors
		};
	}
})();