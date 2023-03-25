console.log("FIND SEND DATA IS RUNNING")


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                request.greeting);


function fetchData() {
  const selectedText = window.getSelection().toString();
  const url_of_quote = window.location.href
  const url_of_website = url_of_quote
  const title = document.querySelector("h1").innerText
  const photo_url = document.getElementsByTagName('img')

  console.log(photo_url)

  return {

    selectedText: selectedText,
    url_of_quote: url_of_quote,
    title: title,
    url_of_capture: url_of_website,
    photo_url: photo_url[0].currentSrc,
    private: true,
    user_id: request.user_id,
    folder_id: request.folder_id
  }
}

function sendData(data) {
  const url = "http://localhost:3000/api/v1/captures"
  console.log(data.photo_url)

  const params = {

    capture: {
      title: data.title,
      url_of_capture: data.url_of_quote,
      private: data.private,
      folder_id: data.folder_id,
      user_id: data.user_id,
      photo_url: data.photo_url,

      quote_content: data.selectedText,
      url_of_quote: data.url_of_quote
    }
  }

  const options = {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(params),
    mode: 'cors',
  }

  fetch(url, options)
  //.then(response => response.json())
  //.then(data => console.log(data))
}

console.log("Fetching data from content.js")
sendData(fetchData());

window.getSelection().removeAllRanges();



  if (request.folder_id == "hello")
      sendResponse({farewell: "goodbye"});
  }
);
