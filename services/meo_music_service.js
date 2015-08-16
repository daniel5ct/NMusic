app.factory('NMusicService', ['$http', '$q', function($http, $q) {

    var getInfo = function(inputValue, whatString, page) {
		var deferred = $q.defer();
		$http.get("http://services.sapo.pt/Music/OnDemand/Provider/apiv3/find?text="+inputValue+"&what="+whatString+"&page="+page)
			.success(function (response) {
				deferred.resolve(response);
			})
			.error(function(response){
				deferred.reject("Info Not Found");
			});
		return deferred.promise;
	};
	
	return {
		getInfo : getInfo
	};
}]);