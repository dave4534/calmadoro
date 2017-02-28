app.directive('musicStyle', ['$sce', function($sce) {
	return {
		restrict: 'E',
		templateUrl: 'directives/musicStyle.html',
		controller: function($scope){
			//initialize the selected music
			$scope.selectedMusic = false;
			//on click show video under flavor selected
			$scope.addEffect = function(event, styleMusic, urlVideo) {

			// set selected music for open effect, and close all others
			  $scope.selectedMusic = styleMusic;

			// set youtube video url dynamically
			  $scope.url = $sce.trustAsResourceUrl(urlVideo);

			};

			  //invoke function to get the selected music url
			$scope.getUrl = function(boxName){

			    // console.log(boxName, 'selectedMusic =',$scope.selectedMusic, 'resultUrl=', boxName === $scope.selectedMusic ? $scope.url : '');

			    return boxName === $scope.selectedMusic ? $scope.url : ' ';
			};

			//add remove icon and stop music when click the remove icon
			$scope.removing = false;
			$scope.stopMusic = function() {
				$scope.removing = true;
				$scope.selectedMusic = true;
				$scope.removing = false;
			};


		}
	};

}]);

