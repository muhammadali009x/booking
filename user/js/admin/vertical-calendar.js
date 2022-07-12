
        new VerticalEventCalendar({
            el: '#booking-calendar',
            eventHeaderName: 'Tours'
        });
        var baseColumnWidth = ($('.vec-header-toolbar').width() - $('.vec-event-header').width() - 5) / 30;

        baseColumnWidth = parseInt(baseColumnWidth);
        var baseEventHeight = 25;

        (function ($) {
            $('.vec-view-container .vc-time-area').each(function () {
                $(this).find('table').attr('width', 'auto');
                $(this).find(".vec-time-text").css("width", baseColumnWidth).css("max-width", baseColumnWidth);
            });
            $('.vec-view-container .vec-events-bg').each(function () {
                $(this).find('table').attr('width', 'auto');
                $(this).find(".vec-event-time-td").css("width", baseColumnWidth).css("max-width", baseColumnWidth);
            });

            $('.vec-event-containers').each(function () {
                var me = this;
                var maxT = 0;
                var items = $(this).find('.vec-event-item');
                if (!items.length) {
                    return;
                }
                var id = $(this).data('id');
                items.each(function (i, v) {
                    var t = 0;
                    items.each(function (i2, v2) {

                        if (i2 !== i && i2 < i) {
                            if ($(v).data('from') <= $(v2).data('to') && $(v).data('to') >= $(v2).data('from')) {
                                t++;
                            }
                        }
                    });

                    $(this).css({
                        left: baseColumnWidth * (parseInt($(this).data('from')) - 1),
                        width: baseColumnWidth * (parseInt($(this).data('to') - parseInt($(this).data('from')) + 1)),
                        top: baseEventHeight * t + (t * 2) + 1
                    });
                    $(this).removeClass('d-none');

                    if (t > maxT) maxT = t;
                });

                $(this).css({
                    height: (baseEventHeight + 1) * (maxT + 1) + 2
                });

                $('.vec-events .vec-event-' + id).css({
                    height: (baseEventHeight + 1) * (maxT + 1) + 2
                });

            })

        })(jQuery);

    </script>