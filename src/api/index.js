import axios from 'axios';

const base_url = 'http://localhost:8081'
//const header = {Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWlndWVsIiwicm9sZXMiOlsidXNlciIsIm9mZmVyZXIiXX0.C1zVkn7ztR7t4zcwLm_XFVFYxIIHSkO0z7gP7Lfc7Q4'}
const header = {Authorization : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJ1c2VyIiwib2ZmZXJlciJdLCJ1c2VyIjoibWlndWVsLmFsYXJjb3NAZ21haWwuY29tIn0.PVOvM-5P0aGcheUZeIULm2ngptuN9SgHQx0k9ni7fOQ'}

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

export async function getUserData(user_id){
    const headers = header
    let response = await axios.get(base_url + '/candidate/' + user_id, {headers})
    return response.data
}

export async function appendExperience(user_id, exp){
    const headers = header
    const data = {type: '$push', data: [{path: 'experience', value: exp }]}
    let response = await axios.put(base_url + '/add-experience/' + user_id, data, {headers})
    return response.data
}

export async function setExperience(user_id, path, value){
    const headers = header
    let data = {type: '$set', data: [{path, value}]}
    let response = 
    await axios.put(base_url + '/add-experience/' + user_id, data, {headers})
    //data = {type: '$set', data: [{path: 'tags', value: ''}]}
    //let response = await axios.put(base_url + '/add-experience/' + user_id, data, {headers})
    return response.data
}

export async function deleteExperience(user_id, experience){
    const headers = header
    let data = {type: '$pull', data: [{path: 'experience', value: experience}]}
    let response = await axios.put(base_url + '/add-experience/' + user_id, data, {headers})
    return response.data
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

export async function getCandidateData(candidate){
    const headers = header
    let response = await axios.get(base_url + '/candidate/' + candidate, {headers})
    return response.data
}

export async function getSearchOffers(tags){
    const headers = header
    if(Array.isArray(tags)){
        tags = tags.join()
    }
    let response = await axios.get(base_url + '/search-offers/0/10?tags=' + tags, {headers})
    return response.data
}

export async function getAlreadySubscribed(offers){
    const headers = header
    offers = offers.map(x=>x._id)
    offers = offers.join()
    let response = await axios.get(base_url + '/already-subscribed-aggregation/' + offers, {headers})
    return response.data
}

export async function createCandidature(candidature){
    const headers = header
    let response = await axios.post(base_url + '/candidatures', candidature, {headers})
    return response.data
}
