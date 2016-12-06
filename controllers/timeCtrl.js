app.controller('TimeCtrl', function($scope, $timeout){



	var getUItime = function(seconds){

				// multiply by 1000 because Date() requires miliseconds
				var date = new Date(seconds * 1000);
				var hh = date.getUTCHours();
				var mm = date.getUTCMinutes();
				var ss = date.getSeconds();
				// If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
				// if (hh > 12) {hh = hh % 12;}
				// These lines ensure you have two-digits
				if (hh < 10) {hh = "0"+hh;}
				if (mm < 10) {mm = "0"+mm;}
				if (ss < 10) {ss = "0"+ss;}
				// This formats your string to HH:MM:SS
				// var result = hh+":"+mm+":"+ss;
				var result = mm+":"+ss;

  	return result;
  };

  $scope.timer = 'we are on board';
	//display timer on 25 min
	var seconds = 1500;
	$scope.counterSec = getUItime(seconds);
	var isTimerRunning = false;

	$scope.startTimer = function() {
			isTimerRunning = true;

	    $timeout(function() {
	       //time decrease
	       seconds--;
	       $scope.counterSec = getUItime(seconds);
	     	//timer running and not negative number
	     	if(isTimerRunning && seconds > 0){
		     $scope.startTimer();
	     	}
    }, 1000);
  };

  $scope.stopTimer = function(){
   	 //stop the timer
	   isTimerRunning = false;
  };




});