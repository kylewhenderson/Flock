angular.module('app.services', [])


.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('SkydiveService', ['$http','$q',function($http,$q){

    return {
        getSkydives:function() {
            var deferred = $q.defer();

            $http.get("http://logbook.jellyflea.net/wp-json/wp/v2/skydive?author=1&filter[posts_per_page]=10").then(function(res) {
                //console.dir(res.data.results);
                deferred.resolve(res.data);
            });
            
            return deferred.promise;
        },
        getSkydive:function(id) {
            var deferred = $q.defer();
            
            //temp
            var skydive = {
                id:id,
                title:"Skydive "+id,
                crawl:"Crawl for "+id
            };

            deferred.resolve(skydive);
            return deferred.promise;
            
            
            
        }   
    };

}]);