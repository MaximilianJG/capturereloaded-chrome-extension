// Get all Folders
const getFoldersOfUser = () => {
  const url = "http://localhost:3000/api/v1/folders?"

  const options = {
    method: "GET",
    headers: { 'Content-Type': 'application/json'},
  }

  return fetch(url + new URLSearchParams({user_id: 1,}), options)
    .then((response) => {
            return response.json().then((data) => {
                console.log(data);
                return data;
            }).catch((err) => {
                console.log(err);
            })
        });
}

// Insert Folders into Dropdown
getFoldersOfUser().then(function(result) {
  console.log(result)

  var folderSelect = document.getElementById("folderSelect");
  var selectedFolderId = localStorage.getItem('selectedFolderId'); // retrieve the selected folder ID from localStorage

  for(var i = 0; i < result.length; i++) {
    console.log(result[i].id)

    var option = document.createElement("option");
    option.text = result[i].name
    option.id = result[i].id;

    // set the selected attribute on the option if its ID matches the selectedFolderId
    if (result[i].id == selectedFolderId) {
      option.selected = true;
    }

    folderSelect.add(option);
  }
})

const listenClick = () => {
  console.log("listening for click")
  const button = document.getElementById('capture-this-btn');

  button.onclick = () => {
    console.log("button clicked")

    var folderSelect = document.getElementById("folderSelect");
    var selectedFolderId = (folderSelect.options[folderSelect.selectedIndex]).getAttribute('id')

    localStorage.setItem('selectedFolderId', selectedFolderId); // store the selected folder ID in localStorage

    chrome.runtime.sendMessage({
        type: selectedFolderId,
        play: { source: "sound.mp3", volume: 1 },
      });

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ['scripts/highlight-text.js'],
      })
    })

    //selection.removeAllRanges();
    window.close();
  }
}

listenClick()
