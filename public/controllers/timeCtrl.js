app.controller('TimeCtrl', function($scope, $timeout){

  $scope.togglingButton = 'START';
  $scope.mode = 'Break';
  $scope.onoff = 'OFF';
  var bind = 'off';
  seconds = 1500;

  $scope.workMin = [15, 20, 25, 30, 35, 'Customize...'];
  $scope.breakMin = [3, 4, 5, 6, 7, 'Customize...'];

  // function initialize() {
  //   console.log ('working');
  // };

  //Works! I need to work on the Customize option!
  $scope.setTimeTo = function (setSeconds) {
    seconds = setSeconds;
    $scope.counterSec = getUItime(setSeconds);
  }

	var getUItime = function(seconds) {
  // multiply by 1000 because Date() requires miliseconds
      var date = new Date(seconds * 1000);
      var hh = date.getUTCHours();
      var mm = date.getUTCMinutes();
      var ss = date.getSeconds();
      // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
      // if (hh > 12) {hh = hh % 12;}
      // These lines ensure you have two-digits
      if (hh < 10) {hh = "0"+ hh;}
      if (mm < 10) {mm = "0"+ mm;}
      if (ss < 10) {ss = "0"+ ss;}
      // This formats your string to HH:MM:SS
      // var result = hh+":"+mm+":"+ss;
      var result = mm + ":" + ss;
  	return result;
  };

	$scope.counterSec = getUItime(seconds);
	var isTimerRunning = false;

  $scope.startStop = function() {
    isTimerRunning = !isTimerRunning;

    if (isTimerRunning) {
      $scope.togglingButton = 'STOP';
      $timeout(function() {
        seconds--;
        $scope.counterSec = getUItime(seconds);
        if(seconds > 0){
          isTimerRunning = !isTimerRunning;
          $scope.startStop();
        } else {
          alertMe();
        }
      }, 1000);
    } else {
      seconds += 1;
      $scope.togglingButton = 'START';
    }
  };

  $scope.resetTimer = function() {
    if ($scope.mode === 'Work') {
        $scope.setTimeTo(300);
      } else if ($scope.mode === 'Break') {
        $scope.setTimeTo(1500);
      } else {
        console.log ('error');
      }
    $scope.counterSec = getUItime(seconds);

  };

  $scope.modeWork = function () {
    $scope.mode = 'Break';
    $scope.setTimeTo(1500)
    $scope.counterSec = getUItime(seconds);
  };

  $scope.modeRest = function () {
    $scope.mode = 'Work';
    $scope.setTimeTo(300);
    $scope.counterSec = getUItime(seconds);
  };

  $scope.bindingBtn = function () {
    if (bind === 'off') {
      $scope.onoff = 'ON';
      bind = 'on';
    } else {
      $scope.onoff  = 'OFF';
      bind = 'off';
    }
  };

  var alertMe = function() {
   var audio = new Audio('audio/buzzer.mp3');
   audio.play();
  };

});