$(function () {

    $("input").each(function () {
        $('#display').append('<div id="display_' + $(this).attr('id') + '"></ div>')
    });

    $("input").on("change keyup paste click", function () {
        var inputId = $(this).attr("id");
        $("#display_" + inputId).text($(this).val());
    });

});
