display();

// date validation
let submit = document.querySelector(".submit");
let date = document.querySelector(".date");
let validDate = false;
date.addEventListener("input", function () {
      let reg = /^202[0-9]\-[0,1][0-2]\-[0-3][0-9]\s[0-2][0-9]\:[0-6][0-9]\:?(\d?\d?)?/
      if (reg.test(date.value)) {
            let wrongValue = document.querySelector(".wrong-value");
            wrongValue.style.display = "none";
            validDate = true;
      } else {

            let wrongValue = document.querySelector(".wrong-value");
            wrongValue.style.display = "inline-block";
      }
})

// display alarm 
function display() {
      let getItem = localStorage.getItem("arrayItems");
      let myArray;
      if (getItem == null) {
            myArray = [];
      } else {

            myArray = JSON.parse(getItem);
      }
      let html = "";
      myArray.forEach((element, index) => {
            html += `<li>${index+1} . ${element}<span id ="${index}" onclick="deleteAlarm(this.id)">+</span></li>`
      });
      let ul = document.querySelector("ul");
      ul.innerHTML = html;
}

// alarm ringtune and add html in ui
submit.addEventListener("click", function (e) {
      e.preventDefault();
      // alarm ringtune
      if (validDate === true) {
            let getItem = localStorage.getItem("arrayItems");
            let myArray;
            if (getItem == null) {
                  myArray = [];
            } else {

                  myArray = JSON.parse(getItem);
            }
            myArray.push(date.value);
            let setItem = localStorage.setItem("arrayItems", JSON.stringify(myArray));

            display();
            let alarmDate = new Date(date.value);
            let now = new Date();
            let differance = alarmDate - now;
            if (differance >= 0) {
                  setTimeout(function () {
                        let myaudio = new Audio();
                        myaudio.src = "alarm.mp3";
                        myaudio.play();
                  }, differance)
            }
            // delete useless alarm
            myArray.forEach(function (element, index) {
                  let passDate = new Date(element);
                  let diff = passDate - now;
                  if (diff >= 0) {
                        setTimeout(function () {
                              myArray.splice(index, 1);
                              let setItem = localStorage.setItem("arrayItems", JSON.stringify(myArray));
                              display();
                        }, diff);
                  }

            })
      }
})

// delete alarm
function deleteAlarm(index) {
      let getItem = localStorage.getItem("arrayItems");
      let myArray;
      if (getItem == null) {
            myArray = [];
      } else {

            myArray = JSON.parse(getItem);
      }
      myArray.splice(index, 1);
      let setItem = localStorage.setItem("arrayItems", JSON.stringify(myArray));
      display();
}