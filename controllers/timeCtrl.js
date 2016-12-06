app.controller('TimeCtrl', function($scope, $timeout){

	$scope.timer = 'we are on board';
	//display timer on 25 min
	$scope.counter = 25;
	var stopped;

	$scope.startTimer = function() {
	    stopped = $timeout(function() {
	       console.log($scope.counter);
	     $scope.counter--;
	     	console.log($scope.counter);
	     $scope.startTimer();
    }, 1000);
  };

  $scope.stopTimer = function(){
   $timeout.cancel(stopped);

    };

});