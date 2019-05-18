define(['jquery', 'knockout','knockoutValidation'], function ($, ko) {

	var $loginForm = $('#LoginForm');
	$loginForm.find('input[type=text]:first-child').focus();

	var loginViewModel = function () {

		var self = this;
		self.Submitted = ko.observable(false);
		self.UsernameOrEmailAddress = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.Password = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.ReturnUrlHash = ko.observable(location.hash);

		var validatedObj = ko.validatedObservable({
			UsernameOrEmailAddress: self.UsernameOrEmailAddress,
			Password: self.Password
		});

		self.Submit = function (e) {
			self.Submitted(true);
			if (validatedObj.errors().length) {
				return;
			}

			abp.ui.setBusy(
				$('#LoginArea'),
				abp.ajax({
					contentType: 'application/x-www-form-urlencoded',
					url: $loginForm.attr('action'),
					data: $loginForm.serialize()
				})
			);
		};

	};

	ko.applyBindings(new loginViewModel(), document.getElementById("LoginArea"));
});
