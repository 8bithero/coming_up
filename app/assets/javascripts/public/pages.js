$(function () {
  if ($("#fancyCountdown").length > 0) {
    setTimeout(beginrefresh, 10000);
  }
});

function beginrefresh() {
  window.location.reload();
  setTimeout(beginrefresh, 90000);
}



