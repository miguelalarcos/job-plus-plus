import axios from 'axios';

const base_url = 'http://localhost:8081'
const header = {Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWlndWVsIiwicm9sZXMiOlsidXNlciIsIm9mZmVyZXIiXX0.C1zVkn7ztR7t4zcwLm_XFVFYxIIHSkO0z7gP7Lfc7Q4'}

export async function getFullCandidature(candidature) {
    let response = await axios({method: 'get', url: base_url + '/candidature-with-messages/' + candidature, headers: header})
    return response.data
}

export async function appendMessage(candidature, msg){
    const headers = header
    const data = {type: '$push', data: [{path: 'messages', value: {msg} }]}
    let response = await axios.put(base_url + '/candidature-message/' + candidature, data, {headers})
    return response.data.messages
}

export async function candidatureSave(candidature, path, value){
    const headers = header
    const data = {type: '$set', data: [{path, value}]}
    let response = await axios.put(base_url + '/candidature/' + candidature, data, {headers})
    return response.data
}

export async function getCandidateMessageAggregation(){
    const headers = header
    let response = await axios.get(base_url + '/message-aggregation', {headers})
    return response.data
}

export async function getOffererMessageAggregation(){
    const headers = header
    let response = await axios.get(base_url + '/message-aggregation-offerer', {headers})
    return response.data
}

export async function getTotalActivesAggregation(offer){
    const headers = header
    if(Array.isArray(offer)){
        offer = offer.join()
    }
    let response = await axios.get(base_url + '/total-actives-aggregation/' + offer, {headers})
    return response.data
}

export async function setMessagesRead(candidature, props){
    const headers = header
    const data = {type: '$set', data: props}
    let response = await axios.put(base_url + '/candidature/' + candidature, data, {headers})
    return response.data
}

export async function getAllCandidatures(){
    const headers = header
    let response = await axios.get(base_url + '/candidatures/0/10', {headers})
    return response.data
}

export async function getAllOffers(offerer){
    const headers = header
    let response = await axios.get(base_url + '/offers/0/10?offerer=' + offerer, {headers})
    return response.data
}

export async function getCandidaturesForOffer(offer){
    const headers = header
    let response = await axios.get(base_url + '/candidatures/0/10?offer=' + offer, {headers})
    return response.data
}