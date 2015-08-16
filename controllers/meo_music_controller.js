app.controller('MyControllerNMusic', ['$scope', 'NMusicService', function($scope, NMusicService) {
  
	$scope.myLimit = 5;
	$scope.page = 1;
	$scope.results_artists = [];
	$scope.results_albums = [];
	$scope.results_tracks = [];
	$scope.results_playlists = [];
	$scope.results_channels = [];
	$scope.results_genres = [];
	$scope.has_more = true;
	
	$scope.increaseLimit = function () {
		if($scope.has_more){
			$scope.myLimit += 5;
			$scope.page++;
			$scope.search($scope.page);
		}
    };
	
	var whatString = "";
	$scope.tabs = [];
	$scope.tabsVisible = false;
	$scope.checkModel = {
		artists: true
	  };
	
	var loadTabs = function(){
		$scope.tabsVisible = false;
		whatString = "";
		$scope.tabs = [];
		angular.forEach($scope.checkModel, function (value, key) {
			if (value) {				
				whatString += key.replace(/"/g, "") + ",";
				key = capitalizeFirstLetter(key);
				$scope.tabs.push(key);
			}
		});
		whatString = whatString.substring(0,whatString.length-1);
	};

  $scope.getView = function (x) {
     var file =  x + '.html';
     return file;
  }

  $scope.search = function(page) {
	loadTabs();
	var inputValue = $scope.search_text;
	var promise = NMusicService.getInfo(inputValue,whatString,page);
	
	promise.then(function (response){
		$scope.tabsVisible = true;
		$scope.results_artists = $scope.results_artists.concat(response.artists.results);
		if(response.artists.has_more_results === "false"){
			$scope.has_more = false;
		}
		
		if(response.albums){
			$scope.results_albums = $scope.results_albums.concat(response.albums.results);
			if(response.albums.has_more_results === "false"){
				$scope.has_more = false;
		}
		}
		
		if(response.tracks){
			$scope.results_tracks = $scope.results_tracks.concat(response.tracks.results);
			if(response.tracks.has_more_results === "false"){
				$scope.has_more = false;
			}
		}
		
		if(response.playlists){
			$scope.results_playlists = $scope.results_playlists.concat(response.playlists.results);
			if(response.playlists.has_more_results === "false"){
				$scope.has_more = false;
			}
		}
		
		if(response.channels){
			$scope.results_channels = $scope.results_channels.concat(response.channels.results);
			if(response.channels.has_more_results === "false"){
				$scope.has_more = false;
			}
		}
		
		if(response.genres){
			$scope.results_genres = $scope.results_genres.concat(response.genres.results);
			if(response.genres.has_more_results === "false"){
				$scope.has_more = false;
			}
		}
	})
  };

  /* Capitalize the first letter of string in JavaScript */
  function capitalizeFirstLetter(string) {
  	return string.charAt(0).toUpperCase() + string.slice(1);
  }  
}]);



app.directive('infiniteScroll', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            var myElement = element[0];
            element.bind('scroll', function () {                  
                if (myElement.scrollTop + myElement.offsetHeight > myElement.scrollHeight - 2) {
                    $scope.increaseLimit();
                    $scope.$apply();
                }
            });
        }
    };
});