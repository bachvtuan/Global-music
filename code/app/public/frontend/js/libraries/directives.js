
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