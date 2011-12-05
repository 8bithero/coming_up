$(function () {
  if ($("#countdown_dashboard").length > 0) {
    setTimeout(beginrefresh, 10000);
  }
});

function beginrefresh() {
  window.location.reload();
  setTimeout(beginrefresh, 10000);
}



