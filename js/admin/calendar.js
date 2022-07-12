
        var calendarEl, calendar, lastId, formModal;
        $('#items_tab').on('show.bs.tab', function (e) {
            calendarEl = document.getElementById('dates-calendar');
            lastId = $(e.target).data('id');
            if (calendar) {
                calendar.destroy();
            }
            calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: ['dayGrid', 'interaction'],
                header: {},
                selectable: true,
                selectMirror: false,
                allDay: false,
                editable: false,
                eventLimit: true,
                defaultView: 'dayGridMonth',
                firstDay: daterangepickerLocale.first_day_of_week,
                events: {
                    url: "https://bookingfleet.com/BookingFleet/public/admin/module/hotel/77/availability/loadDates",
                    extraParams: {
                        id: lastId,
                    }
                },
                loading: function (isLoading) {
                    if (!isLoading) {
                        $(calendarEl).removeClass('loading');
                    } else {
                        $(calendarEl).addClass('loading');
                    }
                },
                select: function (arg) {
                    formModal.show({
                        start_date: moment(arg.start).format('YYYY-MM-DD'),
                        end_date: moment(arg.end).format('YYYY-MM-DD'),
                    });
                },
                eventClick: function (info) {
                    var form = Object.assign({}, info.event.extendedProps);
                    form.start_date = moment(info.event.start).format('YYYY-MM-DD');
                    form.end_date = moment(info.event.start).format('YYYY-MM-DD');
                    console.log(form);
                    formModal.show(form);
                },
                eventRender: function (info) {
                    $(info.el).find('.fc-title').html(info.event.title);
                }
            });
            calendar.render();
        });

        $('.event-name:first-child a').trigger('click');

        formModal = new Vue({
            el: '#bravo_modal_calendar',
            data: {
                lastResponse: {
                    status: null,
                    message: ''
                },
                form: {
                    id: '',
                    price: '',
                    start_date: '',
                    end_date: '',
                    is_instant: '',
                    enable_person: 0,
                    min_guests: 0,
                    max_guests: 0,
                    active: 0,
                    number: 1
                },
                formDefault: {
                    id: '',
                    price: '',
                    start_date: '',
                    end_date: '',
                    is_instant: '',
                    enable_person: 0,
                    min_guests: 0,
                    max_guests: 0,
                    active: 0,
                    number: 1
                },
                person_types: [

                ],
                person_type_item: {
                    name: '',
                    desc: '',
                    min: '',
                    max: '',
                    price: '',
                },
                onSubmit: false
            },
            methods: {
                show: function (form) {
                    $(this.$el).modal('show');
                    this.lastResponse.message = '';
                    this.onSubmit = false;

                    if (typeof form != 'undefined') {
                        this.form = Object.assign({}, form);
                        if (typeof this.form.person_types == 'object') {
                            this.person_types = Object.assign({}, this.form.person_types);
                        }

                        if (form.start_date) {
                            var drp = $('.has-daterangepicker').data('daterangepicker');
                            drp.setStartDate(moment(form.start_date).format(bookingCore.date_format));
                            drp.setEndDate(moment(form.end_date).format(bookingCore.date_format));

                        }
                    }
                },
                hide: function () {
                    $(this.$el).modal('hide');
                    this.form = Object.assign({}, this.formDefault);
                    this.person_types = [];
                },
                saveForm: function () {
                    this.form.target_id = lastId;
                    var me = this;
                    me.lastResponse.message = '';
                    if (this.onSubmit) return;

                    if (!this.validateForm()) return;

                    this.onSubmit = true;
                    this.form.person_types = Object.assign({}, this.person_types);
                    $.ajax({
                        url: 'https://bookingfleet.com/BookingFleet/public/admin/module/hotel/77/availability/store',
                        data: this.form,
                        dataType: 'json',
                        method: 'post',
                        success: function (json) {
                            if (json.status) {
                                if (calendar)
                                    calendar.refetchEvents();
                                me.hide();
                            }
                            me.lastResponse = json;
                            me.onSubmit = false;
                        },
                        error: function (e) {
                            me.onSubmit = false;
                        }
                    });
                },
                validateForm: function () {
                    if (!this.form.start_date) return false;
                    if (!this.form.end_date) return false;

                    return true;
                },
                addItem: function () {
                    console.log(this.person_types);
                    this.person_types.push(Object.assign({}, this.person_type_item));
                },
                deleteItem: function (index) {
                    this.person_types.splice(index, 1);
                }
            },
            created: function () {
                var me = this;
                this.$nextTick(function () {
                    $('.has-daterangepicker').daterangepicker({ "locale": { "format": bookingCore.date_format } })
                        .on('apply.daterangepicker', function (e, picker) {
                            console.log(picker);
                            me.form.start_date = picker.startDate.format('YYYY-MM-DD');
                            me.form.end_date = picker.endDate.format('YYYY-MM-DD');
                        });

                    $(me.$el).on('hide.bs.modal', function () {

                        this.form = Object.assign({}, this.formDefault);
                        this.person_types = [];

                    });

                })
            },
            mounted: function () {
                // $(this.$el).modal();
            }
        });
