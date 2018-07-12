import axios from 'axios';

const base_url = 'http://localhost:8081'
const header = {Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWlndWVsIiwicm9sZXMiOlsidXNlciIsIm9mZmVyZXIiXX0.C1zVkn7ztR7t4zcwLm_XFVFYxIIHSkO0z7gP7Lfc7Q4'}

export async function getFullCandidature(candidature) {
    try{
    let response = await axios({method: 'get', url: base_url + '/candidature-with-messages/' + candidature, headers: header})
    return response.data
    }catch (error){
        console.log('------------>', error)
    }
}

export async function appendMessage(candidature, msg){
    const headers = header
    const data = {type: '$push', data: [{path: 'messages', value: {msg} }]}
    let response = await axios.put(base_url + '/candidature-message/' + candidature, data, {headers})
    console.log(response.data.messages)
    return response.data.messages
}
