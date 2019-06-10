define(['jquery', 'knockout'], function ($, ko) {

	var changePasswordViewModel = function (data) {

		var _userSettingService = abp.services.app.userSetting;
		var _$form = $('#ChangePasswordForm');
		
		var self = this;
		self.Submitted = ko.observable(false);

		self.CurrentPassword = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.NewPassword = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } }).extend({ minLength: 6 });
		self.ConfirmPassword = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } }).extend({ minLength: 6 }).extend({
			mustEqual: { params: self.NewPassword, message: 'Wrong password confirmation.', onlyIf: function () { return self.Submitted(); } }
			
		});

		self.Submit = function () {
			save();
		};

		var validatedObj = ko.validatedObservable({
			CurrentPassword: self.CurrentPassword,
			NewPassword: self.NewPassword,
			ConfirmPassword: self.ConfirmPassword
		});

		function save() {

			self.Submitted(true);
			if (validatedObj.errors().length) {
				return;
			}

			var settingDetails = _$form.serializeFormToObject();

			abp.ui.setBusy(_$form);

			_userSettingService.changePassword(settingDetails).done(function () {
				
				location.reload(true);
			}).always(function () {
				abp.ui.clearBusy(_$form);
			});

		}

	};

	return changePasswordViewModel;

});