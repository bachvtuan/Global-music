app.directive('focusMe', function($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        if(value === true) { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      element.bind('blur', function() {
         //scope.$apply(model.assign(scope, false));
      });
    }
  };
});


//This direct to generate img tag with source url is proviced,
app.directive('loadImage', function($parse) {
  return {
    restrict: 'EA',
    scope: {
        source: '=',       
    },
    template: '<img />',
    link: function(scope, iElement, iAttrs) {
      
      scope.$watch('source', function(value) {
        var img = iElement.find('img');
        
        img.attr('src',  value);
      }, true);
    }
}
});

app.directive('loadAudio', function($parse) {
  return {
    restrict: 'EA',
    scope: {
        source: '=',       
    },
    template: '<audio />',
    link: function(scope, iElement, iAttrs) {
      
      scope.$watch('source', function(value) {
        var audio = iElement.find('audio');
        
        audio.attr('src',  value);
      }, true);
    }
  }
});