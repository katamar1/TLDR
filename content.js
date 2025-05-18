document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('myForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userName = document.getElementById('fname').value;
    document.getElementById('userName').textContent = userName || "none";
    const webText = revealText();

    async function generateGPTResponse(text) {
      const prompt = `Summarize this website text: ${text}, as if you were ${userName}. Do not include any original preface by you, just get right into what they would say.`;

      console.log('Text to GPT-3:', prompt);

      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 40
        })
      });

      const data = await response.json();
      const gptResponse = data.choices[0].text;

      //document.getElementById('gptResponse').textContent = gptResponse;
    }

    generateGPTResponse(webText);
  });
});

function revealText() {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a');
  const allText = Array.from(textElements)
    .map((element) => element.textContent)
    .join('\n');
  return allText;
}
