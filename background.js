const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion (text) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    max_tokens:40
  });
  return completion.data.choices[0].text;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "extractText") {
    const extractedText = request.text;
    runCompletion(extractedText)
  }
});