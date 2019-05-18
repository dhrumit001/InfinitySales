define(['knockout'], function (ko) {

	var _roleService = abp.services.app.role;
	var _$modal = $('#RoleCreateModal');
	var _$form = _$modal.find('form');

	//addEditRoleModal();
	$('#RefreshButton').click(function () {
		refreshRoleList();
	});

	$('.delete-role').click(function () {
		var roleId = $(this).attr("data-role-id");
		var roleName = $(this).attr('data-role-name');

		deleteRole(roleId, roleName);
	});

	$('.add-role').click(function () {
		$("#RoleAddEditModal").modal("show");
		ko.contextFor(document.getElementById("RoleAddEditModal")).$data.Add();
	});

	$('.edit-role').click(function (e) {
		$("#RoleAddEditModal").modal("show");
		var roleId = $(this).attr("data-role-id");
		ko.contextFor(document.getElementById("RoleAddEditModal")).$data.Edit(roleId);
		e.preventDefault();
	});

	_$modal.on('shown.bs.modal', function () {
		_$modal.find('input:not([type=hidden]):first').focus();
	});

	function refreshRoleList() {
		location.reload(true); //reload page to see new role!
	}

	function deleteRole(roleId, roleName) {
		abp.message.confirm(
			abp.utils.formatString(abp.localization.localize('AreYouSureWantToDelete', 'InfinitySales'), roleName),
			function (isConfirmed) {
				if (isConfirmed) {
					_roleService.delete({
						id: roleId
					}).done(function () {
						refreshRoleList();
					});
				}
			}
		);
	}

});