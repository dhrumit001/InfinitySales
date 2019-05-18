define(['jquery','knockout'], function ($,ko) {

	var _userService = abp.services.app.user;
	var _$modal = $('#UserCreateModal');
	var _$form = _$modal.find('form');

	$('#RefreshButton').click(function () {
		refreshUserList();
	});

	$('.delete-user').click(function () {
		var userId = $(this).attr("data-user-id");
		var userName = $(this).attr('data-user-name');

		deleteUser(userId, userName);
	});

	$('.add-user').click(function () {
		$("#UserAddEditModal").modal("show");
		ko.contextFor(document.getElementById("UserAddEditModal")).$data.Add();
	});

	$('.edit-user').click(function (e) {
		$("#UserAddEditModal").modal("show");
		var userId = $(this).attr("data-user-id");
		ko.contextFor(document.getElementById("UserAddEditModal")).$data.Edit(userId);
		e.preventDefault();
	});

	_$modal.on('shown.bs.modal', function () {
		_$modal.find('input:not([type=hidden]):first').focus();
	});

	function refreshUserList() {
		location.reload(true); //reload page to see new user!
	}

	function deleteUser(userId, userName) {
		abp.message.confirm(
			abp.utils.formatString(abp.localization.localize('AreYouSureWantToDelete', 'InfinitySales'), userName),
			function (isConfirmed) {
				if (isConfirmed) {
					_userService.delete({
						id: userId
					}).done(function () {
						refreshUserList();
					});
				}
			}
		);
	}
});