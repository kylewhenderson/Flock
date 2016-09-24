angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q, $http) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            var generate_auth_cookie_url = 'http://logbook.jellyflea.net/api/user/generate_auth_cookie/?username=' + name + '&password=' + pw + '&insecure=cool';
            return $http.get(generate_auth_cookie_url).then(function(res) {  
                var auth_cookie_status = res.data.status;
                var auth_cookie = res.data.cookie;
                //alert(JSON.stringify(res, null, 4));
            })
            
            var validate_auth_cookie_url = 'http://logbook.jellyflea.net/api/user/validate_auth_cookie/?cookie=' + auth_cookie + '&insecure=cool';
            return $http.get(validate_auth_cookie_url).then(function(res2) {  
                var validate_auth_cookie = res2.data.valid;
            })
    
            if (validate_auth_cookie == true) {
                alert('cookie valid');
                deferred.resolve('Welcome ' + name + '!');
            } else {
                alert('nope');
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('SkydiveService', ['$http',function($http){
  return {

    getSkydives:function() {
        
        // Return promise (async callback)
        var rand = Math.floor(Math.random()*100); // probably not the right way to do this, but can't figure out another method.
        var url = "http://logbook.jellyflea.net/wp-json/wp/v2/skydive?author=1&filter[posts_per_page]=10&" + rand;
        return $http({ cache: false, url: url, method: 'GET'});
    },
      
    getRecentSkydives:function() {       
        // Return promise (async callback)
        var rand = Math.floor(Math.random()*100); // probably not the right way to do this, but can't figure out another method.
        var url = "http://logbook.jellyflea.net/wp-json/wp/v2/skydive?author=1&filter[posts_per_page]=5&" + rand;
        return $http({ cache: false, url: url, method: 'GET'});
    },
      
    getSkydive:function(id) {
        var rand = Math.floor(Math.random()*100); // probably not the right way to do this, but can't figure out another method.
        var url = "http://logbook.jellyflea.net/wp-json/wp/v2/skydive/" + id + "/?" + rand;
        return $http({ cache: false, url: url, method: 'GET'});
    }
  };
}]);

/*
.service('CommentService', ['$http',function($http){
  return {

    getComments:function(id) {
        // Return promise (async callback)
        // will eventually need to make this paginated
        // NOTE can use &parent=0 for top level comments, but then nested comments don't show. Check out http://market.ionic.io/plugins/ionic-threads for possible solution
        var rand = Math.floor(Math.random()*100); // probably not the right way to do this, but can't figure out another method.
        var url = "http://logbook.jellyflea.net/wp-json/wp/v2/comments?post=" + id + "&parent=0&rand=" + rand;
        return $http({ cache: false, url: url, method: 'GET'});
    }
  };
}]);
*/