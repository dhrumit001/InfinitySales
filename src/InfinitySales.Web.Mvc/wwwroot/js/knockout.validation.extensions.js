define(['knockout', 'knockoutValidation'], function (ko) {
	ko.validation.rules['mustEqual'] = {
		validator: function (val, otherVal) {
			return val === ko.unwrap(otherVal);
		},
		message: 'The field must equal {0}'
	};

	ko.validation.rules['remoteValidationRule'] = {
		async: true,
		validator: function (val, parms, callback) {
			var defaults = {
				type: 'POST',
				url: parms.url,
				data: { value: val },
				success: function (response) {
					callback({ isValid: response.success, message: response.success ? "" : response.error.message });
				},
				error: function (response) {
					var result = response.responseJSON;
					callback({ isValid: result.success, message: result.success ? "" : result.error.message });
				}
			};

			var options = $.extend(defaults, parms);

			$.ajax(options);
		}
	};

	ko.validation.registerExtenders();
});