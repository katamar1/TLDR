document.getElementById('myForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const userName = document.getElementById('fname').value;
  document.getElementById('userName').textContent = userName || "none";

  console.log(`User Name: ${userName}`); 

  let currentURL = ''; 


  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentURL = tabs[0].url;

  });
});

document.addEventListener('DOMContentLoaded', function () {
  const getURLButton = document.getElementById('getURLButton');

  getURLButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      currentURL = tabs[0].url;

      const userName = document.getElementById('fname').value; 

      createPrompt(currentURL, userName);
    });
  });
});

function createPrompt(currentURL, userName) {
  fetch(currentURL)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const textContent = doc.body.innerText;

      const apiKey = "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"; 
      const prompt = `you are ${userName}. you must speak like them at all times. you must over exaggerate your character to a fault! in character, give a brief summary of the following content on a webpage: ${textContent}. MUST keep brief, MAX 100 words`;

      const maxTokenLimit = 190;
      console.log('GPT-3 Prompt:', prompt);

      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokenLimit
        }
        )
      })
      .then(response => response.json())
      .then(data => {
        if (data.choices && data.choices.length > 0) {
          const gptResponse = data.choices[0].message.content;

          console.log('GPT-3 Response:', gptResponse);
          showtldr(gptResponse)
        } else {
          console.error('No response data from GPT-3');
        }
      })
      .catch(error => {
        console.error('Error with GPT-3:', error);
      });
    })
    .catch(error => {
      console.error('Error fetching webpage:', error);
    });
}

function showtldr(tldr, userName) {
  var tldrPopUp = document.getElementById("summary");
  tldrPopUp.textContent = tldr;
  tldrPopUp.style.backgroundColor = "#1a1a1b";
  overlay.style.display = 'block';
  popup.style.display = 'block';
}
