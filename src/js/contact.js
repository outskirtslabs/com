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
//    $('#contact-message').closest('.form-group').hide();
});
