define(['knockout'], function (ko) {

	var roleViewModel = function (data) {
		var self = this;
		self.Name = data.Name;
		self.DisplayName = data.DisplayName;
		self.IsUserRole = ko.observable(data.UserIsInRole);
	};

	var editUserViewModel = function (data) {

		var _userService = abp.services.app.user;
		var _$modal = $('#UserAddEditModal');
		var _$form = $('#UserAddEditForm');


		var self = this;
		self.Submitted = ko.observable(false);

		self.ModalTitle = ko.observable();
		self.Id = ko.observable();
		self.Name = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.Surname = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.EmailAddress = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted() && self.Action() === "Add"; } } });
		self.Password = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted() && self.Action() === "Add"; } } }).extend({
			minLength: 6 });
		self.ConfirmPassword = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted() && self.Action() === "Add"; } } }).extend({
			mustEqual: { params: self.Password, message: "Password and Confirm Password do not match", onlyIf: function () { return self.Submitted(); } }
		}).extend({ minLength: 6 });
		self.IsActive = ko.observable();
		self.Roles = ko.observableArray(createRoleArray());
		self.Action = ko.observable();

		self.Action.subscribe(function (newValue) {
			self.ModalTitle(newValue === "Add" ? "Add user" : "Edit user");
		});

		self.Add = add;
		self.Edit = edit;
		self.Submit = function () {
			save();
		};

		var validatedObj = ko.validatedObservable({
			Name: self.Name,
			Surname: self.Surname,
			EmailAddress: self.EmailAddress,
			Password: self.Password,
			ConfirmPassword: self.ConfirmPassword
		});

		init();

		function init() {
			//$.AdminBSB.input.activate(_$form);

			_$modal.on('shown.bs.modal', function () {
				_$form.find('input[type=text]:first').focus();
			});
		}

		function createRoleArray(roles, grantedRoles) {

			var roleModelArray = [];
			$.each(roles, function (index, element) {
				roleModelArray.push(new roleViewModel({ Name: element.name, DisplayName: element.displayName, IsUserRole: $.inArray(element.Name, grantedRoles) !== -1 }));
			});
			return roleModelArray;
		}

		function save() {

			self.Submitted(true);
			if (validatedObj.errors().length) {
				return;
			}

			var user = _$form.serializeFormToObject();
			user["IsActive"] = $("#IsActive").is(":checked");

			debugger
			user.roleNames = [];
			var _$roleCheckboxes = $("input[name='Role']:checked:visible");
			if (_$roleCheckboxes) {
				for (var roleIndex = 0; roleIndex < _$roleCheckboxes.length; roleIndex++) {
					var _$roleCheckbox = $(_$roleCheckboxes[roleIndex]);
					user.roleNames.push(_$roleCheckbox.val());
				}
			}

			abp.ui.setBusy(_$form);

			if (self.Id()) {
				_userService.update(user).done(function () {
					_$modal.modal('hide');
					location.reload(true);
				}).always(function () {
					abp.ui.clearBusy(_$form);
				});
			} else {
				_userService.create(user).done(function () {
					_$modal.modal('hide');
					location.reload(true);
				}).always(function () {
					abp.ui.clearBusy(_$form);
				});
			}
		}

		function add() {
			formInitialState();
			self.Action("Add");
		}

		function edit(userId) {
			self.Action("Edit");
			formInitialState();
			abp.ui.setBusy(_$modal);
			_userService.getUserForEdit({ id: userId }).done(function (response) {
				self.Id(response.user.id);
				self.Name(response.user.name);
				self.Surname(response.user.surname);
				self.EmailAddress(response.user.emailAddress);
				self.IsActive(response.user.isActive);

				self.Roles(createRolesArray(response.roles, response.user.roleNames));
			}).always(function () {
				abp.ui.clearBusy(_$modal);
			});

		}

		function formInitialState() {
			self.Id(0);
			self.Name(null);
			self.Surname(null);
			self.EmailAddress(null);
			self.IsActive(true);
			self.Submitted(false);
			self.Roles(createRolesArray(data));
		}

	};

	function createRolesArray(roles, userRoles) {
		var roleModelArray = [];

		$.each(roles, function (index, element) {
			roleModelArray.push(new roleViewModel({ Name: element.name, DisplayName: element.displayName, UserIsInRole: $.inArray(element.normalizedName, userRoles) !== -1 }));
		});
		return roleModelArray;
	}

	return editUserViewModel;

});