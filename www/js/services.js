angular.module('app.services', [])


.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('SkydiveService', ['$http','$q',function($http,$q){

    return {
        getSkydives:function() {
            var deferred = $q.defer();
            $http.get("http://logbook.jellyflea.net/wp-json/wp/v2/skydive?author=1&filter[posts_per_page]=10").then(function(res) {
                console.dir(res.data);
                deferred.resolve(res.data);
            });
            
            return deferred.promise;
        },
        getSkydive:function(id) {
            var deferred = $q.defer();
      
            
            $http.get("http://logbook.jellyflea.net/wp-json/wp/v2/skydive/"+id).then(function(res) {
                //console.dir(res.data);
                var skydive = {
                    id:id,
                    title:"Skydive #"+res.data.acf.jump_number,
                    jump_number:res.data.acf.jump_number,
                    jump_date:res.data.acf.jump_date,
                    jump_location:res.data.acf.jump_location.post_title,
                    jump_aircraft:res.data.acf.jump_aircraft.post_title,
                    jump_type:res.data.acf.jump_type,
                    jump_altitude:res.data.acf.jump_altitude,
                    jump_gear_mode:res.data.acf.jump_gear_mode.label,
                    jump_rig:res.data.acf.jump_rig.label,
                    jump_container:res.data.acf.jump_container,
                    //jump_main:res.data.acf.jump_main,
                    //jump_reserve:res.data.acf.jump_reserve.label,
                    //jump_cut_away:res.data.acf.jump_cut_away.label,
                    // videos probably need to have their own service passing the skydive id
                };
                deferred.resolve(skydive);
            });
            return deferred.promise;      
        }   
    };

}]);