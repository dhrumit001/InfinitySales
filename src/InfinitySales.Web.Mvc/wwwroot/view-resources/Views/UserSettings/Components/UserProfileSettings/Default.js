define(['jquery', 'knockout'], function ($, ko) {

	var Language = function (name, displayName) {
		this.Name = name;
		this.DisplayName = displayName;
	};

	var userProfileSettingViewModel = function (data) {

		var userProfileSetting = data.userProfileSetting;
		var _$form = $('#UserProfileSettingsForm');
		//_$form.find('.phone-number').inputmask('+99 (999) 999-99-99', { placeholder: '+__ (___) ___-__-__' });

		var self = this;
		self.Submitted = ko.observable(false);

		self.EmailAddress = ko.observable(userProfileSetting.emailAddress);
		self.Name = ko.observable(userProfileSetting.name).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.Surname = ko.observable(userProfileSetting.surname).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.PhoneNumber = ko.observable(userProfileSetting.phoneNumber);
		self.CultureName = ko.observable(userProfileSetting.cultureName).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });

		self.AvailableLanguages = createLanguageArray(data.languages);

		function createLanguageArray(languages) {

			var languagesArray = [];
			$.each(languages, function (index, element) {
				languagesArray.push(new Language(element.name, element.displayName));
			});
			return languagesArray;
		}


		self.Submit = function () {
			save();
		};

		var validatedObj = ko.validatedObservable({
			Name: self.Name,
			Surname: self.Surname,
			PhoneNumber: self.PhoneNumber,
			CultureName: self.CultureName
		});

		function save() {

			self.Submitted(true);
			if (validatedObj.errors().length) {
				return;
			}

			var settingDetails = _$form.serializeFormToObject();

			abp.ui.setBusy(_$form);

			abp.ajax({
				url: '/UserSettings/Update',
				data: JSON.stringify(settingDetails)
			}).done(function () {
				location.reload(true);
			}).always(function () {
				abp.ui.clearBusy(_$form);
			});

		}

	};

	return userProfileSettingViewModel;

});