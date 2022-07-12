
    $(document).on('click', '#set_paid_btn', function (e) {
        var id = $(this).data('id');
        $.ajax({
            url:bookingCore.url+'/booking/setPaidAmount',
            data:{
                id: id,
                remain: $('#modal-paid-'+id+' #set_paid_input').val(),
            },
            dataType:'json',
            type:'post',
            success:function(res){
                alert(res.message);
                window.location.reload();
            }
        });
    });