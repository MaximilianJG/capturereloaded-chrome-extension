
function getCookie() {
  const cookie = chrome.cookies.getAll({"domain": "localhost", "name": "capture_user_id"}, function (cookies) { chrome.runtime.sendMessage(cookies[0]) })
}

// function getCookie() {
//   const cookie = chrome.cookies.getAll({"domain": "capture-maximilianjg.herokuapp.com", "name": "capture_user_id"}, function (cookies) { chrome.runtime.sendMessage(cookies[0]) })
// }
