define(['jquery', 'knockout'], function ($, ko) {

	var companyDetailViewModel = function (data) {

		var _companySettingService = abp.services.app.companySetting;
		var _$form = $('#CompanyDetailForm');


		var self = this;
		self.Submitted = ko.observable(false);

		self.Id = ko.observable(data.id);
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

			var companyDetails = _$form.serializeFormToObject();
			companyDetails.id = self.Id();

			abp.ui.setBusy(_$form);
			_companySettingService.updateCompanyDetails(companyDetails).done(function () {
				location.reload(true);
			}).always(function () {
				abp.ui.clearBusy(_$form);
			});
		}

	};

	var companySettingViewModel = function (data) {
		var self = this;
		self.CompanyDetailViewModel = new companyDetailViewModel(data);
	};

	return companySettingViewModel;
});