const axios = require('axios');

// Replace with your actual API key and external user ID
const apiKey = 'gjQtC3H6EJTT09DcQeHZfCl0Mu4HjGin';
const externalUserId = '1234';

// Function to create a chat session
async function createChatSession(apiKey,externalUserId) {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [],
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error);
  }
}

// Function to submit a query
async function submitQuery(sessionId,query) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: `give me the output strictly in json object to acess each day no array for the query in format like start "{day1:{ task:....},day2:{task:....},and so on } end and no other strings" ${query}`,
        pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1726230593'],
        responseMode: 'sync'
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );

    
    const answer = response.data.data.answer;
    const ans = JSON.parse(answer);

    return ans;

  } catch (error) {
     return error;
  }
}


module.exports={
    createChatSession,
    submitQuery,
    
}