var playpausebtn = document.querySelector("#playpausebtn");

document.querySelector("#convert").addEventListener("click", function () {
  playpausebtn.innerHTML = '<i class="ri-pause-line"></i>';
  var text = document.querySelector("#text").value;
  axios.get(`/speak/${text}`).then(function (data) {
    console.log(data.data.status);
    playpausebtn.innerHTML = '<i class="ri-play-line"></i>';
  });
});

playpausebtn.addEventListener("click", function () {
  playpausebtn.innerHTML = '<i class="ri-play-line"></i>';
  axios.get("/stop").then(function (data) {
    console.log(data.data.status);
  });
});
