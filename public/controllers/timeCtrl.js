app.controller('TimeCtrl', function($scope, $timeout){

  $scope.togglingButton = 'START';
  $scope.mode = 'Break';
  $scope.imgsrc = 'images/working.png';
  $scope.workTextCol = 'white';
  $scope.workBgCol = 'blue';
  $scope.restTextCol = 'blue';
  $scope.restBgCol = 'white';

	//display timer on 25 min
	var seconds = 1500;
	// var countdown_type = seconds;

	var getUItime = function(seconds){

				// multiply by 1000 because Date() requires miliseconds
				var date = new Date(seconds * 1000);
				var hh = date.getUTCHours();
				var mm = date.getUTCMinutes();
				var ss = date.getSeconds();
				// If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
				// if (hh > 12) {hh = hh % 12;}
				// These lines ensure you have two-digits
				if (hh < 10) {hh = "0"+hh;};
				if (mm < 10) {mm = "0"+mm;};
				if (ss < 10) {ss = "0"+ss;};
				// This formats your string to HH:MM:SS
				// var result = hh+":"+mm+":"+ss;
				var result = mm+":"+ss;

  	return result;
  };

	$scope.counterSec = getUItime(seconds);
	var isTimerRunning = false;

  //start-stop running timer
  $scope.startStop = function() {
    isTimerRunning = !isTimerRunning;

    if (isTimerRunning) {
      $scope.togglingButton = 'STOP';
      $timeout(function() {
        //time decrease
        seconds--;
        $scope.counterSec = getUItime(seconds);
        //timer running and not negative number
        if(isTimerRunning && seconds > 0){
          isTimerRunning = !isTimerRunning;
          $scope.startStop();
        }
      }, 1000);
    } else {
      seconds += 1
      $scope.togglingButton = 'START'
    };
  };

  //reset timer to 25 min
  $scope.resetTimer = function() {
  	//reset seconds to 25min
    if ($scope.mode === 'Work') {
        seconds = 300;
      } else if ($scope.mode === 'Break') {
        seconds = 1500;
      } else {
        console.log ('error');
      };
  	// seconds = countdown_type;
  	$scope.counterSec = getUItime(seconds);
  };

  $scope.modeWork = function () {
    $scope.mode = 'Break';
    seconds = 1500;
    $scope.workTextCol = 'white';
    $scope.workBgCol = 'blue';
    $scope.restTextCol = 'blue';
    $scope.restBgCol = 'white';
    $scope.counterSec = getUItime(seconds);
    console.log ('the work bg should be blue: ' + $scope.workBgCol)
  };

  $scope.modeRest = function () {
    $scope.mode = 'Work';
    seconds = 300;
    $scope.workTextCol = 'blue';
    $scope.workBgCol = 'white';
    $scope.restTextCol = 'white';
    $scope.restBgCol = 'blue';
    $scope.counterSec = getUItime(seconds);
    console.log ('the work bg should be white: ' + $scope.workBgCol)
  };

});