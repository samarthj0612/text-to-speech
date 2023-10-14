var profileflag = true;

document.querySelector("#profilebtn").addEventListener("click", function () {
  if (profileflag) {
    document.querySelector("#profilepage").style.top = "0%";
    profileflag = false;
  } else {
    document.querySelector("#profilepage").style.top = "-120%";
    profileflag = true;
  }
});

document.querySelector("#profileback").addEventListener("click", function () {
  document.querySelector("#profilepage").style.top = "-120%";
  profileflag = true;
});

var socket = io();

document.querySelector("#startchat").addEventListener("click", function () {
  socket.emit("name", document.querySelector("#startchat").classList[0]);
  document.querySelector("#overlay").style.display = "none";
});

document.querySelector("#sendbtn").addEventListener("click", function () {
  var text = document.querySelector("#msgbox").value;
  document.querySelector("#msgbox").value = "";
  document.querySelector("#msgbox").focus();
  socket.emit("msg", text);
});

socket.on("msg", function (username, text) {
  axios.get(`/speak/${text}`).then(function (data) {
    console.log(data.data.status);
  });

  document.querySelector("#msgs").innerHTML += `<div id="msg">
    <p>${username} : <span>${text}</span></p>
  </div>`;
});
