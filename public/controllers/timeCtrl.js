app.controller('TimeCtrl', function($scope, $timeout){

    $scope.togglingButton = 'START';
    $scope.mode = 'Break';
    $scope.workBgCol = 'green';
    $scope.restBgCol = 'red';
    $scope.onoff = 'OFF'
    var bind = 'off'
  	var seconds = 1500;

  // function initialize() {
  //   console.log ('working');
  // };

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
        if(seconds > 0){
          isTimerRunning = !isTimerRunning;
          $scope.startStop();
        } else {
          seconds -= 1
          alert ('time is over!')
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
    $scope.counterSec = getUItime(seconds);
    changecolors('towork');
  };

  $scope.modeRest = function () {
    $scope.mode = 'Work';
    seconds = 300;
    $scope.counterSec = getUItime(seconds);
    changecolors('tobreak');
  };

  var changecolors = function (x) {
    if (x === 'towork') {
      $scope.workBgCol = 'red';
      $scope.restBgCol = 'green';
      console.log(x);
    } else {
      $scope.workBgCol = 'green';
      $scope.restBgCol = 'red';
      console.log(x);
    };
  }

  $scope.bindingBtn = function () {
    if (bind === 'off') {
      $scope.onoff = 'ON'
      bind = 'on'
    } else {
      $scope.onoff  = 'OFF'
      bind = 'off'
    }
  }

});