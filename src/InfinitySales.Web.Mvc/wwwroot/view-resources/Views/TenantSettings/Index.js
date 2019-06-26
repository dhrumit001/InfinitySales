define(['jquery', 'knockout'], function ($, ko) {

	var tenantProfileViewModel = function (data) {

		var _tenantSettingService = abp.services.app.tenantSetting;
		var _$form = $('#TenantProfileSettingsForm');
		
		var self = this;
		self.Submitted = ko.observable(false);

		self.Name = ko.observable(data.name).extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.Street = ko.observable(data.street);
		self.City = ko.observable(data.city);
		self.State = ko.observable(data.state);
		self.Country = ko.observable(data.country);
		self.Phone = ko.observable(data.phone);
		self.Mobile = ko.observable(data.mobile);
		
		self.Submit = function () {
			save();
		};

		var validatedObj = ko.validatedObservable({
			CompanyName: self.Name
		});

		function save() {
			
			self.Submitted(true);
			if (validatedObj.errors().length) {
				return;
			}

			var tenantProfileDetails = _$form.serializeFormToObject();
			
			abp.ui.setBusy(_$form);
			_tenantSettingService.updateTenantProfileSetting(tenantProfileDetails).done(function () {
				location.reload(true);
			}).always(function () {
				abp.ui.clearBusy(_$form);
			});
		}

	};

	var tenantSettingViewModel = function (data) {
		debugger
		var self = this;
		self.TenantProfileViewModel = new tenantProfileViewModel(data);
	};

	return tenantSettingViewModel;
});