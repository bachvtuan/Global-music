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
        class: '='     
    },
    template: '<img />',
    link: function(scope, iElement, iAttrs) {
      var class_   = angular.isDefined(iAttrs.extraClass )  ? iAttrs.extraClass: "";
      
      scope.$watch('source', function(value) {
        var img = iElement.find('img');
        
        img.attr('src',  value);

      
        if ( class_ != "" ){
          img[0].className += ' ' + class_;
        }
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

app.directive('avatar', function($parse, $rootScope, $compile) {
  var image_template = '<img class="avatar" tooltip="{{userName}}" />';
  
  var linker = function(scope, element, iAttrs) {
    
    var class_              = angular.isDefined(iAttrs.extraClass )  ? iAttrs.extraClass: "";
    
    scope.$watch('extraId', function(value) {
      
      
      console.error("tai sao " + value);
      element.html(image_template).show();
      
      var img = element.find('img');
      var avatar_url = "/frontend/images/radio.png";

      if ( angular.isDefined(value) && value != null ){
        avatar_url = "/" + value;
      }
      
      img.attr('src',  avatar_url);        
      
      
      if ( class_ != "" ){
        
        var imgs = element.find('img');
        if (imgs.length >0){
          imgs[0].className += ' ' + class_;
        }
        
      }

      $compile(element.contents())(scope);

    }, true);

  }

  var result =  {
    restrict: 'EA',
    rep1ace: true,
    scope: {
      extraId: '=',       
      class: '='
    },
    //template: image_template ,
    link: linker
  }
  return result;

});
