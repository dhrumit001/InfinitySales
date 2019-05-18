$(function () {
    $('#ReturnUrlHash').val(location.hash);

	var $resetPasswordForm = $('#ResetPasswordForm');

	$resetPasswordForm.validate({
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
        }
    });

	$resetPasswordForm.submit(function (e) {
        e.preventDefault();

		if (!$resetPasswordForm.valid()) {
            return;
        }

        abp.ui.setBusy(
			$('#ResetPasswordArea'),

            abp.ajax({
                contentType: 'application/x-www-form-urlencoded',
				url: $resetPasswordForm.attr('action'),
				data: $resetPasswordForm.serialize()
            })
        );
    });

	$resetPasswordForm.find('input[type=text]:first-child').focus();
});
