// Anonymous function using  IIFE (Immediately Invoked Function Expression)
(function () {
  var hour = document.querySelector(".hour")
  var min = document.querySelector(".minute")
  var sec = document.querySelector(".second")

  var startBtn = document.querySelector(".start")
  var stopBtn = document.querySelector(".stop")
  var resetBtn = document.querySelector(".reset")

  var countdownTimer = null

  startBtn.addEventListener("click", function () {
    // check if time set is '00:00:00'. If set then just return
    if (hour.value == 0 && min.value == 0 && sec.value == 0) return

    function startInterval() {
      // Hide start btn and display stop btn
      startBtn.style.display = "none"
      stopBtn.style.display = "initial"

      countdownTimer = setInterval(function () {
        timer()
      }, 1000)
    }

    startInterval()
  })

  // freeze time when 'stop' btn is pressed
  function stopInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start"

    // hide the stop button and display the start btn
    startBtn.style.display = "initial"
    stopBtn.style.display = "none"

    clearInterval(countdownTimer)
  }

  function timer() {
    // When user enters seconds > 60, format the time
    if (sec.value > 60) {
      min.value++
      sec.value = parseInt(sec.value) - 59
    }
    // When user enters minutes > 60, format the time
    if (min.value > 60) {
      hour.value++
      min.value = parseInt(min.value) - 60
    }

    // When hour, minute and seconds all have hit '0'
    if (hour.value == 0 && min.value == 0 && sec.value == 0) {
      hour.value = ""
      min.value = ""
      sec.value = ""
      stopInterval()
    }

    // When second value is not 0
    else if (sec.value != 0) {
      // if second value is <10 than append a '0' to it
      sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`
    }

    // when minute value is not 0 but second value is 0
    else if (min.value != 0 && sec.value == 0) {
      sec.value = 59
      min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`
    }

    // when hour value is not 0 but minute value is 0
    else if (hour.value != 0 && min.value == 0) {
      min.value = 60
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`
    }
  }

  // event to pause timer
  stopBtn.addEventListener("click", function () {
    stopInterval("pause")
  })

  // Reset Timer Button
  resetBtn.addEventListener("click", function () {
    hour.value = ""
    min.value = ""
    sec.value = ""

    stopInterval()
  })
})()
