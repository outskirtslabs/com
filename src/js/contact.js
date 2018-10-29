import $ from 'jquery';
function mailchimpSub(args) {
    var params = $.param(args)
    console.log('params', params);
    $.ajax({
        url: '//outskirtslabs.us10.list-manage.com/subscribe/post-json?u=c4826abcc2a59d7b85945c582&amp;id=808c64c880&c=?',
        type: 'GET',
        cache: false,
        data: params,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data['result'] != "success") {
                //ERROR
                console.log('MC ERROR', data['msg']);
            } else {
                //SUCCESS - Do what you like here
                console.log('MC SUCCESS', data['msg']);
            }
        }
    });
}
$(document).ready(function() {
    $('#contact-new-project').change( function() {
        if( $(this).is(':checked')) {
            $('#contact-message').closest('.form-group').hide();
        } else {
            $('#contact-message').closest('.form-group').show();
        }
    });
    $('#contact-message').closest('.form-group').hide();
    $('#contact-form').submit(function() {

        var buttonCopy = $('#contact-form button').html(),
            errorMessage = $('#contact-form button').data('error-message'),
            sendingMessage = $('#contact-form button').data('sending-message'),
            okMessage = $('#contact-form button').data('ok-message'),
            hasError = false;

        $('#contact-form .error-message').remove();

        $('.requiredField').each(function() {
            if(!$(this).closest('.form-group').is(':visible'))
                return;
            if($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).parents('.controls').append('<span class="error-message" style="display:none;">'+errorText+'.</span>').find('.error-message').fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
                console.log("first");
            } else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).parents('.controls').append('<span class="error-message" style="display:none;">'+invalidEmail+'.</span>').find('.error-message').fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                console.log("email");
                }
            }
        });

        if(hasError) {
            $('#contact-form button').html('<i class="fa fa-times"></i>'+errorMessage);
            setTimeout(function(){
                $('#contact-form button').html(buttonCopy);
            },2000);
        }
        else {
            var fs = "https://formspree.io/casey@outskirtslabs.com";
            $('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>'+sendingMessage);
            var formInput = $(this).serialize();
            if( $('#contact-new-project').is(':checked') ) {
                $.post(fs, formInput, function(data){
                    setTimeout(function(){
                        window.location.href = "https://outskirtslabs.com/getstarted/freeconsultation"
                    },500);
                });
            } else {
                $.post(fs, formInput, function(data){
                    $('#contact-form button').html('<i class="fa fa-check"></i>'+okMessage);
                    setTimeout(function(){
                        $('#contact-form button').html(buttonCopy);
                    },2000);
                });
            }
        }
        return false;
    });
});
