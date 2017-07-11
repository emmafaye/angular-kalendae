angular-kalendae
================

Angular directive to create a dropdown or inline datepicker using the Javascript agnostic library Kalendae.


angular demo mode='multiple':
1. include module:
```html
  var App = angular.module('app', ['Kalendae']);
```

2. using directive in html:
```html
  <div id="kalendaeDiv" style="width:175px; height:175px;" kalendae ng-model="constData.kalendaeDivVal"
        callback="confirm()"
        mode='multiple'> </div>
```
        
3. in your controller define confrim function and variable:
```html
  $scope.constData = {
    kalendaeDivVal: "2017-07-12, 2017-07-14" // init values
  };
  
  $scope.confirm = function (){ //callback after selected date
    console.log( $scope.constData );
  }
```


