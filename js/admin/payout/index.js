$('.dungdt-form-payout-btn').click(function () {
    var ids = $('.check-item:checked').map(function () {
        return $(this).val();
    }).get();
    if (!ids || !ids.length) {
        bookingCoreApp.showError("Please select at lease one item")
        return;
    }
    $('#bulkActionModal').modal('show');
});

$('.edit-payout-btn').click(function () {
    $(this).closest('tr').find('.check-item').prop('checked', true);
    $('.dungdt-form-payout-btn').trigger('click');
})

$('.dungdt-form-payout-delete').click(function () {

    var btn = $(this);
    var ids = $('.check-item:checked').map(function () {
        return $(this).val();
    }).get();
    if (!ids || !ids.length) {
        bookingCoreApp.showError("Please select at lease one item")
        return;
    }
    bookingCoreApp.showConfirm({
        message: 'Do you want to delete those items?',
        callback: function (result) {
            if (result) {
                btn.addClass('loading');
                $.ajax({
                    url: 'https://bookingfleet.com/BookingFleet/public/admin/module/vendor/payout/bulkEdit',
                    data: {
                        action: 'delete',
                        ids: ids
                    },
                    method: 'post',
                    success: function (json) {
                        btn.removeClass('loading');

                        bookingCoreApp.showAjaxMessage(json);

                        if (json.status) {
                            window.location.reload();
                        }
                    },
                    error: function (e) {
                        btn.removeClass('loading');
                        bookingCoreApp.showAjaxError(e);
                    }
                })
            }
        }
    })

});

$('.dungdt-form-payout-save').click(function () {
    var form = $(this).closest('.modal');
    var status = form.find('[name=action]').val();
    if (!status) {
        bookingCoreApp.showError("Status is empty");
        return;
    }
    var ids = $('.check-item:checked').map(function () {
        return $(this).val();
    }).get();
    if (!ids || !ids.length) {
        bookingCoreApp.showError("Please select at lease one item")
        return;
    }

    var data = {
        ids: ids
    }

    form.find('input,textarea,select').serializeArray().map(function (val) {
        data[val.name] = val.value;
    });

    form.addClass('loading');


    $.ajax({
        url: form.data('action'),
        method: 'post',
        data: data,
        success: function (json) {
            form.removeClass('loading');

            if (json.status) {
                form.modal('hide');
            }

            bookingCoreApp.showAjaxMessage(json);

            if (json.status) {
                window.setTimeout(function () {
                    window.location.reload();
                }, 2500);
            }
        },
        error: function (e) {
            form.removeClass('loading');
            bookingCoreApp.showAjaxError(e);
        }
    })

})
