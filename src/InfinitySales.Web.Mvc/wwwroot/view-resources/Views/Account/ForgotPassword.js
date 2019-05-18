$(function () {
    
    var $forgotPasswordForm = $('#ForgotPasswordForm');

    $forgotPasswordForm.validate({
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

    $forgotPasswordForm.submit(function (e) {
        e.preventDefault();
        debugger
        if (!$forgotPasswordForm.valid()) {
            return;
        }

        abp.ui.setBusy(
            $('#forgotPasswordArea'),

            abp.ajax({
                contentType: 'application/x-www-form-urlencoded',
                url: $forgotPasswordForm.attr('action'),
                data: $forgotPasswordForm.serialize()
            })
        );
    });

    $('a.social-login-link').click(function () {
        var $a = $(this);
        var $form = $a.closest('form');
        $form.find('input[name=provider]').val($a.attr('data-provider'));
        $form.submit();
    });

    $forgotPasswordForm.find('input[type=text]:first-child').focus();
});
