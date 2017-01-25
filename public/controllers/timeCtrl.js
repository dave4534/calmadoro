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
  var isTimerRunning = false;
  $scope.customMin = false;
  // $scope.onoff = 'OFF';
  // var bind = 'off';

  $scope.workMin = [15, 20, 25, 30, 35, 'Custom'];
  $scope.breakMin = [3, 4, 5, 6, 7, 'Custom'];


  $scope.setTimeTo = function (setSeconds) {
    if (setSeconds) {
      if ($scope.mode === 'Work') {
        $scope.workCustom = setSeconds
      } else {
        $scope.breakCustom = setSeconds
      }
      seconds = setSeconds;
      $scope.counterSec = getUItime(seconds);
        if (isTimerRunning) {
          $scope.startStop();
        }
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
      if (hh>0) {
        var result = hh+":"+mm+":"+ss;
      } else {
        var result = mm + ":" + ss;
      }
    return result;
  };


  $scope.counterSec = getUItime(seconds);


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
        if ($scope.workCustom) { $scope.setTimeTo($scope.workCustom); }
        else { $scope.setTimeTo(1500)}

        //stop the timer if it is running
        if (isTimerRunning) { $scope.startStop(); }

    } else if ($scope.mode === 'Break') {
        if ($scope.breakCustom) { $scope.setTimeTo($scope.breakCustom); }
        else {$scope.setTimeTo(300)}

        //stop the timer if it is running
        if (isTimerRunning) { $scope.startStop(); }

    } else {
        console.log ('error');
    }

  };


  $scope.modeWorkBreak = function (x) {
    if (x === 'Work') {
      $scope.mode = 'Work';
      $scope.resetTimer()

      //style changes to show the selected option
      $scope.wstyle = selectedStyle
      $scope.bstyle = notSelectedStyle
    } else if (x === 'Break') {
      $scope.mode = 'Break';
      $scope.resetTimer();

      //style changes to show the selected option
      $scope.wstyle = notSelectedStyle
      $scope.bstyle = selectedStyle
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
    } else if (musicSource === 'Youtube') {
      $scope.spotStyle = notSelectedStyle
      $scope.youStyle = selectedStyle
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