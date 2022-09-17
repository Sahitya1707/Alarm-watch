let seconds = document.querySelector(".seconds");
let minutes = document.querySelector(".minutes");
let hours = document.querySelector(".hours");
let timeFormat = document.querySelector(".time-format");
let year = document.querySelector(".year");
let month = document.querySelector(".month");
let day = document.querySelector(".day");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let i;
let j;
let selectHr = document.querySelector(".alarm-hour select");
let selectMin = document.querySelector(".alarm-minute select");
let selectTimeFormat = document.querySelector(".alarm-format select");
const setAlarm = document.querySelector(".set-alarm");
const preview = document.querySelector(".preview-alarm");
const ok = document.querySelector(".ok");
let playBtn = Array.from(document.querySelectorAll(".play"));
let pauseBtn = Array.from(document.querySelectorAll(".pause"));
let alarmOn = Array.from(document.querySelectorAll(".on"));
let alarmOff = Array.from(document.querySelectorAll(".off"));
let pauseBtnArr = Array.from(pauseBtn);
let audio = Array.from(document.querySelectorAll(".ringtone"));
let songBorder = Array.from(document.querySelectorAll(".song"));
const removeBtn = document.querySelector(".del-alarm");
const stopAlarm = document.querySelector(".alarmstop");

// console.log(selectHr);
// console.log(selectMin);

setInterval(function () {
  let date = new Date();
  let sec = date.getSeconds();
  let min = date.getMinutes();
  let hr = date.getHours();
  if (hr > 12) {
    hr = hr - 12;
    timeFormat.innerHTML = `PM`;
  }
  if (hr == 0) {
    hr = 12;
    timeFormat.innerHTML = `AM`;
  }
  sec < 10 ? (seconds.innerHTML = `0` + sec) : (seconds.innerHTML = sec);
  min < 10 ? (minutes.innerHTML = `0` + min) : (minutes.innerHTML = min);
  hr < 10 ? (hours.innerHTML = `0` + hr) : (hours.innerHTML = hr);
  year.innerHTML = date.getFullYear();
  month.innerHTML = monthNames[date.getMonth()];

  day.innerHTML = date.getDate();
}, 1000);
// console.log(selectHr);
function hrOption() {
  let hr = 12;
  for (i = 1; i <= hr; i++) {
    selectHr.innerHTML += `   
                        <option value= ${i < 10 ? `0` + i : i}>${
      i < 10 ? `0` + i : i
    }</option>
                   
    `;
  }
  // console.log(selectHr.innerHTML);
}
hrOption();

function minOption() {
  let min = 60;

  for (i = 0; i < min; i++) {
    selectMin.innerHTML += `   
                        <option value= ${i < 10 ? `0` + i : i}>${
      i < 10 ? `0` + i : i
    }</option>
                   
    `;
  }
}
minOption();

// console.log(setAlarm);
function previewCloseOpen() {
  preview.classList.toggle("hidden");
}
setAlarm.addEventListener("click", previewCloseOpen);
ok.addEventListener("click", previewCloseOpen);

playBtn.forEach(function (e, i) {
  e.addEventListener("click", function () {
    e.classList.add("hidden");
    if (e.classList.contains(`hidden`)) {
      audio[i].play();
      // console.log(`hello`);
    }

    pauseBtn[i].classList.remove("hidden");
    pauseBtn[i].addEventListener("click", function () {
      playBtn[i].classList.remove("hidden");
      pauseBtn[i].classList.add("hidden");
      audio[i].currentTime = 0;
      audio[i].pause();
    });
    ok.addEventListener("click", function () {
      audio[i].pause();
      playBtn[i].classList.remove("hidden");
      pauseBtn[i].classList.add("hidden");
    });

    let pauseBtnF = pauseBtn.filter(function (e) {
      return e !== pauseBtn[i];
    });
    let playBtnF = playBtn.filter(function (e) {
      return e !== playBtn[i];
    });
    let audioF = audio.filter(function (e) {
      return e !== audio[i];
    });

    for (const pause of pauseBtnF) {
      pause.classList.add("hidden");
      // audio[i].pause();
    }
    for (const play of playBtnF) {
      play.classList.remove("hidden");
      // audio[i].pause();
    }
    for (const off of audioF) {
      off.pause();
      // console.log(off);
    }
  });
});
alarmOff.forEach(function (e, i) {
  e.addEventListener("click", function () {
    e.classList.add("hidden");
    alarmOn[i].classList.remove("hidden");
    songBorder[i].classList.add("active");
    // console.log(e);
    let songBorderF = songBorder.filter(function (e) {
      return e !== songBorder[i];
    });
    for (const act of songBorderF) {
      act.classList.remove("active");
    }
    let alarmOffF = alarmOff.filter(function (e) {
      return e !== alarmOff[i];
    });
    for (const offAlarm of alarmOffF) {
      offAlarm.classList.remove("hidden");
    }
    let alarmOnF = alarmOn.filter(function (e) {
      return e !== alarmOn[i];
    });
    for (const onAlarm of alarmOnF) {
      onAlarm.classList.add("hidden");
    }
    alarmOn[i].addEventListener("click", function () {
      alarmOn[i].classList.add("hidden");
      alarmOff[i].classList.remove("hidden");
    });

    // if(e.classList.contains("hidden"))
  });
});
ok.addEventListener("click", function () {
  let selectedHr = selectHr.value;
  let selectedMin = selectMin.value;
  let selectedTimeFormat = selectTimeFormat.value;
  // console.log(selectedHr, selectedMin, selectedTimeFormat);
  // console.log(timeFormat.innerHTML);
  // console.log(minutes.innerHTML);
  // console.log(...alarmOff);

  setInterval(function () {
    for (const [i, off] of alarmOff.entries()) {
      // console.log(off);
      if (
        off.classList.contains("hidden") == true &&
        selectedHr === hours.innerHTML &&
        selectedMin === minutes.innerHTML &&
        selectedTimeFormat === timeFormat.innerHTML
      ) {
        // console.log(`Hello`);
        // console.log(i);
        audio[i].play();
        stopAlarm.classList.remove("hidden");
      }

      // //   // console.log(i);
      // console.log(
      //   selectedHr === hours.innerHTML,
      //   selectedMin === minutes.innerHTML,
      //   selectedTimeFormat === timeFormat.innerHTML,
      //   off.classList.contains("hidden") == true
      // );
    }
  }, 2000);
});
// console.log(removeBtn);
removeBtn.addEventListener("click", function () {
  hrOption();
  minOption();
  for (const e of alarmOff) {
    e.classList.remove(`hidden`);
  }
  stopAlarm.classList.add("hidden");
});
// console.log(stopAlarm);
stopAlarm.addEventListener("click", function () {
  audio.forEach(function (e) {
    // console.log(e);
    setInterval(function () {
      e.pause();
      stopAlarm.classList.add("hidden");
    }, 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001);
  });
});
