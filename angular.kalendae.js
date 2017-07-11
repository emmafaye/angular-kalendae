// Requires kalendae.js and moment.js

var module = angular.module('Kalendae', []);

module.factory('kal', ['$window', function($window) {
    return $window.Kalendae;
}]);

module.factory('Moment', ['$window', function($window) {
    return $window.moment;
}]);

module.directive('kalendae', ['$parse', 'kal', 'KalendaeAPI', function($parse, kal, KalendaeAPI) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            var model      = $parse(attrs.ngModel);
            var blackout   = scope.$eval(attrs.blackout);

            var type       = attrs.kalendae === 'dropdown' ? kal.Input : kal;
            var datePicker = new type(element[0], {
                mode       : attrs.mode        || 'single',
                months     : attrs.months      || 1,
                useYearNav : attrs.useYearNav  || true,
                direction  : attrs.direction   || 'any',
                closeButton: attrs.closeButton || false,
                blackout   : blackout          || false
            });

            KalendaeAPI.setDatePicker(datePicker);

            // Requires animate.css in order to animate.
            angular.element(datePicker.container).addClass('animated fadeInDown');

            /*datePicker.subscribe('date-clicked', function(date) {
                var selectedDate = KalendaeAPI.setDate(date);
                model.assign(scope, selectedDate);
                scope.$apply(function() {
                    scope.$eval(attrs.callback);
                });

                // When using the dropdown datepicker, hide after selecting a date.
                attrs.kalendae === 'dropdown' && element[0].blur();
            });*/

            // On init set date to the current model value.
            var defaultDate = scope.$eval(attrs.ngModel);

            if(defaultDate) {
                KalendaeAPI.setSelected(defaultDate);
                scope.$eval(attrs.callback);
            }

            // When using the dropdown datepicker, hide after selecting a date.
            attrs.kalendae === 'dropdown' && element[0].blur();
            
            datePicker.subscribe('change', function(date) {

                var selectedDate = KalendaeAPI.getSelected();
                model.assign(scope, selectedDate);
                scope.$apply(function() {
                    scope.$eval(attrs.callback);
                });

                // When using the dropdown datepicker, hide after selecting a date.
                attrs.kalendae === 'dropdown' && element[0].blur();

            });
        }
    };
}]);

module.factory('KalendaeAPI', ['Moment', function(Moment) {
    return {
        datePicker: null,
        values:null,
        dates:[],
        setDatePicker: function(datePicker) {
            return this.datePicker = datePicker
        },
        setSelected: function(date) {
            this.datePicker.setSelected(date);
        },
        setBlackOutDates: function() {

        },
        setValues: function(values) {
            this.values = values;
        },
        setDate: function(date) {
            return Moment(date).format('MM/DD/YYYY');
        },
        setDates: function(date) {
            this.dates = [];
            for(var key in dates) {
                var date = Moment(dates[key]).format('MM/DD/YYYY');

                this.dates.push(date);
            }

            return this.dates;
        },
        getDates: function() {
            return this.dates;
        },
        getValueByDate: function(date) {
            var valueByDate;
            var date = Moment(date);

            for(var key in this.values) {
                var min_date = this.values[key].min;
                var max_date = this.values[key].max;
                var value    = this.values[key].value;


                if(date.isBefore(max_date) && date.isAfter(min_date)) {
                    valueByDate = value;
                    break;
                }
            }

            return valueByDate;
        },
        getSelected: function () { // when using  mode:multiple, you can getSelected values
            return this.datePicker.getSelected();
        }
    };
}]);
