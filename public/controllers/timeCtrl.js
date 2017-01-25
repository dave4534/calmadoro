app.controller('TimeCtrl', function($scope, $timeout){

  var selectedStyle = 'border: 2px solid grey; font-weight: bold'
  var notSelectedStyle = 'border: 0.5px solid grey; font-weight: normal'
  $scope.togglingButton = 'START';
  $scope.mode = 'Break';
  var seconds = 300;
  $scope.wstyle = notSelectedStyle;
  $scope.bstyle = selectedStyle;
  $scope.spotStyle = notSelectedStyle;
  $scope.youStyle = selectedStyle;
  // $scope.onoff = 'OFF';
  // var bind = 'off';
  $scope.customMin = false;

  $scope.workMin = [15, 20, 25, 30, 35, 'Customize...'];
  $scope.breakMin = [3, 4, 5, 6, 7, 'Customize...'];


  $scope.setTimeTo = function (setSeconds) {
    if (setSeconds) {
      seconds = setSeconds;
      $scope.counterSec = getUItime(setSeconds);
    } else {
      $scope.customMin = !$scope.customMin
    }
  };

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
      $scope.togglingButton = 'PAUSE';
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
      $scope.togglingButton = 'START';
      seconds += 1;
    }
  };

  $scope.resetTimer = function() {
    if ($scope.mode === 'Work') {
        $scope.setTimeTo(1500);
        if (isTimerRunning) {
          $scope.startStop();
        }
      } else if ($scope.mode === 'Break') {
        $scope.setTimeTo(300);
        if (isTimerRunning) {
          $scope.startStop();
        }
      } else {
        console.log ('error');
      }
    $scope.counterSec = getUItime(seconds);

  };

  $scope.modeWorkBreak = function (x) {
    if (x === 'Work') {
      $scope.mode = 'Work';
      $scope.setTimeTo(1500)
      $scope.counterSec = getUItime(seconds);
      $scope.wstyle = selectedStyle
      $scope.bstyle = notSelectedStyle
      console.log ('Work mode on')
    } else if (x === 'Break') {
      $scope.mode = 'Break';
      $scope.setTimeTo(300);
      $scope.counterSec = getUItime(seconds);
      $scope.wstyle = notSelectedStyle
      $scope.bstyle = selectedStyle
      console.log ('Break mode on')
    } else {
      console.log ('error in mode select')
      console.log (x)
    }
  };


  // **********NOT YET**********
  // $scope.bindingBtn = function () {
  //   if (bind === 'off') {
  //     $scope.onoff = 'ON';
  //     bind = 'on';
  //   } else {
  //     $scope.onoff  = 'OFF';
  //     bind = 'off';
  //   }
  // };

  $scope.musicstyle = function (musicSource) {
    if (musicSource === 'Spotify') {
      $scope.spotStyle = selectedStyle
      $scope.youStyle = notSelectedStyle
      console.log ('We on spotify')
    } else if (musicSource === 'Youtube') {
      $scope.spotStyle = notSelectedStyle
      $scope.youStyle = selectedStyle
      console.log ('We on youtube')
    } else {
      console.log ('error in the music source')
      console.log (musicSource)
    }
  };

  var alertMe = function() {
   var audio = new Audio('audio/buzzer.mp3');
   audio.play();
  };

});