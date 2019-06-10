define(['jquery','knockout'],function ($,ko) {

	var permissionViewModel = function (data) {
		var self = this;
		self.Name = data.Name;
		self.DisplayName = data.DisplayName;
		self.IsGranted = ko.observable(data.IsGranted);

	};

	var editRoleViewModel = function (data) {

		var _roleService = abp.services.app.role;
		var _$modal = $('#RoleAddEditModal');
		var _$form = $('#RoleAddEditForm');


		var self = this;
		self.Submitted = ko.observable(false);

		self.ModalTitle = ko.observable();
		self.Id = ko.observable();
		self.Name = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.DisplayName = ko.observable().extend({ required: { params: true, onlyIf: function () { return self.Submitted(); } } });
		self.Description = ko.observable();
		self.IsStatic = ko.observable();
		self.Permissions = ko.observableArray(createPermissionArray());
		self.Action = ko.observable();

		self.Action.subscribe(function (newValue) {
			self.ModalTitle(newValue === "Add" ? "Add role" : "Edit role");
		});

		self.Add = add;
		self.Edit = edit;
		self.Submit = function () {
			save();
		};

		var validatedObj = ko.validatedObservable({
			Name: self.Name,
			DisplayName: self.DisplayName
		});

		init();

		function init() {
			//$.AdminBSB.input.activate(_$form);

			_$modal.on('shown.bs.modal', function () {
				_$form.find('input[type=text]:first').focus();
			});
		}

		function createPermissionArray(permissions, grantedPermissions) {
			
			var permissionModelArray = [];
			$.each(permissions, function (index, element) {
				permissionModelArray.push(new permissionViewModel({ Name: element.name, DisplayName: element.displayName, IsGranted: $.inArray(element.name, grantedPermissions) !== -1 }));
			});
			return permissionModelArray;
		}

		function save() {

			self.Submitted(true);
			if (validatedObj.errors().length) {
				return;
			}

			var role = _$form.serializeFormToObject();
			role.permissions = [];
			var _$permissionCheckboxes = $("input[name='Permission']:checked:visible");
			if (_$permissionCheckboxes) {
				for (var permissionIndex = 0; permissionIndex < _$permissionCheckboxes.length; permissionIndex++) {
					var _$permissionCheckbox = $(_$permissionCheckboxes[permissionIndex]);
					role.permissions.push(_$permissionCheckbox.val());
				}
			}

			abp.ui.setBusy(_$form);
			_roleService.createUpdate(role).done(function () {
				_$modal.modal('hide');
				location.reload(true);
			}).always(function () {
				abp.ui.clearBusy(_$form);
			});
		}

		function add() {
			formInitialState();
			self.Action("Add");
		}

		function edit(roleId) {
			self.Action("Edit");
			formInitialState();
			abp.ui.setBusy(_$modal);
			_roleService.getRoleForEdit({ id: roleId }).done(function (response) {
				self.Id(response.role.id);
				self.Name(response.role.name);
				self.DisplayName(response.role.displayName);
				self.Description(response.role.description);
				self.IsStatic(response.role.isStatic);
				self.Permissions(createPermissionArray(response.permissions, response.grantedPermissionNames));
			}).always(function () {
				abp.ui.clearBusy(_$modal);
			});

		}

		function formInitialState() {
			self.Id(0);
			self.Name(null);
			self.DisplayName(null);
			self.Description(null);
			self.IsStatic(false);
			self.Submitted(false);
			self.Permissions(createPermissionArray(data));
		}

	};

	return editRoleViewModel;
});