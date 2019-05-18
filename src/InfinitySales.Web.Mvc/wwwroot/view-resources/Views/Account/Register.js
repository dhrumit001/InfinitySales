define(['jquery','knockout', 'knockoutValidation'], function ($,ko) {

	var $registerForm = $('#RegisterForm');
	$registerForm.find('input[type=text]:first-child').focus();

	var registerViewModel = function (data) {

		var self = this;
		var isValidatingAsync = true;
		self.Submitted = ko.observable(false);
		self.Name = ko.observable(data.name).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.Surname = ko.observable(data.surname).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.TenancyName = ko.observable(data.tenancyName).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } }).extend({ minLength: 3 });;
		self.EmailAddress = ko.observable(data.emailAddress).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } })
			.extend({ email: { params: true, onlyIf: function () { return self.Submitted(); } } })
			.extend({ remoteValidationRule: { params: { url: '/Account/CheckDuplicateUsernameOrEmailAddress' }, onlyIf: function () { return self.Submitted(); } } });

		self.Password = ko.observable(data.password).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } }).extend({ minLength: 6 });

		var validatedObj = ko.validatedObservable({
			Name: self.Name,
			Surname: self.Surname,
			TenancyName: self.TenancyName,
			EmailAddress: self.EmailAddress,
			Password: self.Password
		});

		self.EmailAddress.isValidating.subscribe(function (isValidating) {
			isValidatingAsync = isValidating;
		});

		function isValid() {
			return !isValidatingAsync && !validatedObj.errors().length;
		}

		self.Submit = function (e) {
			self.Submitted(true);
			if (!isValid()) {
				return;
			}

			return true;
		};

	};

	return registerViewModel;
});
