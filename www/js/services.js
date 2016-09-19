angular.module('app.services', [])


.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])



.service('SkydiveService', function($http) {

  return {
    getSkydives:function() {
        // Return promise (async callback)
        var rand = Math.floor(Math.random()*100); // probably not the right way to do this, but can't figure out another method.
        var url = "http://logbook.jellyflea.net/wp-json/wp/v2/skydive?author=1&filter[posts_per_page]=10&rand=" + rand;
        return $http({ cache: false, url: url, method: 'GET'});
    },
      
    getSkydive:function(id) {
        var url = "http://logbook.jellyflea.net/wp-json/wp/v2/skydive/" + id;
        return $http({ cache: false, url: url, method: 'GET'});
    }
  };
});