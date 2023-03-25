chrome.runtime.onMessage.addListener(async (msg) => {

  (async () => {

    const cookie = chrome.cookies.getAll({"domain": "localhost", "name": "capture_reloaded_user_id"})
    var user_id_from_cookie = await cookie.then(function(result) {
      //console.log(result[0].value)
      return result[0].value
    })
    //console.log(user_id_from_cookie)

    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {folder_id: msg.type, user_id: user_id_from_cookie});


  })();
});
