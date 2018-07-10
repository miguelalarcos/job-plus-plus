import axios from 'axios';

export async function getMessages(candidature) {
    let response = await axios.get('http://localhost:3000/messages/?candidature=' + candidature)
    return response.data
}

function getEvents(who, type) {}