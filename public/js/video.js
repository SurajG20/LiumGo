document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("background-video");
  var source = video.querySelector("source");
  source.src = source.getAttribute("data-src");
  video.load();
});
