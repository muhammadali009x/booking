$('.has-datepicker').daterangepicker({
    singleDatePicker: true,
    showCalendar: false,
    autoUpdateInput: false, //disable default date
    sameDate: true,
    autoApply: true,
    disabledPast: true,
    enableLoading: true,
    showEventTooltip: true,
    classNotAvailable: ['disabled', 'off'],
    disableHightLight: true,
    locale: {
        format: 'YYYY/MM/DD'
    }
}).on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('YYYY/MM/DD'));
});