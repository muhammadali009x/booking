
        jQuery(function ($) {
            $(".bravo-user-render-chart").each(function () {
                let ctx = $(this)[0].getContext('2d');
                window.myMixedChartForVendor = new Chart(ctx, {
                    type: 'bar',//line - bar
                    data: earning_chart_data,
                    options: {
                        min: 0,
                        responsive: true,
                        legend: {
                            display: true
                        },
                        scales: {
                            xAxes: [{
                                stacked: true,
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Timeline'
                                }
                            }],
                            yAxes: [{
                                stacked: true,
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Currency: pkr'
                                },
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += tooltipItem.yLabel + " (pkr)";
                                    return label;
                                }
                            }
                        }
                    }
                });
            });
            $(".bravo-user-chart form select").change(function () {
                $(this).closest("form").submit();
            });

            var start = moment().startOf('week');
            var end = moment();
            function cb(start, end) {
                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }
            $('#reportrange').daterangepicker({
                startDate: start,
                endDate: end,
                "alwaysShowCalendars": true,
                "opens": "left",
                "showDropdowns": true,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    'This Year': [moment().startOf('year'), moment().endOf('year')],
                    'This Week': [moment().startOf('week'), end]
                }
            }, cb).on('apply.daterangepicker', function (ev, picker) {
                $.ajax({
                    url: 'https://bookingfleet.com/BookingFleet/public/user/reloadChart',
                    data: {
                        chart: 'earning',
                        from: picker.startDate.format('YYYY-MM-DD'),
                        to: picker.endDate.format('YYYY-MM-DD'),
                    },
                    dataType: 'json',
                    type: 'post',
                    success: function (res) {
                        if (res.status) {
                            window.myMixedChartForVendor.data = res.data;
                            window.myMixedChartForVendor.update();
                        }
                    }
                })
            });
            cb(start, end);
        });
   