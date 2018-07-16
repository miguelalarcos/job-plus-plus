import axios from 'axios';

const base_url = 'http://localhost:8081'
//const header = {Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWlndWVsIiwicm9sZXMiOlsidXNlciIsIm9mZmVyZXIiXX0.C1zVkn7ztR7t4zcwLm_XFVFYxIIHSkO0z7gP7Lfc7Q4'}
//const header = {Authorization : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJ1c2VyIiwib2ZmZXJlciJdLCJ1c2VyIjoibWlndWVsLmFsYXJjb3NAZ21haWwuY29tIn0.PVOvM-5P0aGcheUZeIULm2ngptuN9SgHQx0k9ni7fOQ'}

export async function getFullCandidature(candidature) {
    let response = await axios({method: 'get', url: base_url + '/candidature-with-messages/' + candidature})
    return response.data
}

export async function appendMessage(candidature, msg){
    
    const data = {type: '$push', data: [{path: 'messages', value: {msg} }]}
    let response = await axios.put(base_url + '/candidature-message/' + candidature, data)
    return response.data.messages
}

export async function getLogin(name){
    console.log('previo axios.login')
    let response = await axios.get(base_url + '/login?name=' + name)
    console.log('despues de axios.login')
    return response.data
}

export async function getUserData(user_id){
    
    let response = await axios.get(base_url + '/candidate/' + user_id)
    return response.data
}

export async function appendExperience(user_id, exp){
    
    const data = {type: '$push', data: [{path: 'experience', value: exp }]}
    let response = await axios.put(base_url + '/add-experience/' + user_id, data)
    return response.data
}

export async function setExperience(user_id, path, value){
    
    let data = {type: '$set', data: [{path, value}]}
    let response = 
    await axios.put(base_url + '/add-experience/' + user_id, data)
    //data = {type: '$set', data: [{path: 'tags', value: ''}]}
    //let response = await axios.put(base_url + '/add-experience/' + user_id, data)
    return response.data
}

export async function deleteExperience(user_id, experience){
    
    let data = {type: '$pull', data: [{path: 'experience', value: experience}]}
    let response = await axios.put(base_url + '/add-experience/' + user_id, data)
    return response.data
}

export async function candidatureSave(candidature, path, value){
    
    const data = {type: '$set', data: [{path, value}]}
    let response = await axios.put(base_url + '/candidature/' + candidature, data)
    return response.data
}

export async function getCandidateMessageAggregation(){
    
    let response = await axios.get(base_url + '/message-aggregation')
    return response.data
}

export async function getOffererMessageAggregation(){
    
    let response = await axios.get(base_url + '/message-aggregation-offerer')
    return response.data
}

export async function getTotalActivesAggregation(offer){
    
    if(Array.isArray(offer)){
        offer = offer.join()
    }
    let response = await axios.get(base_url + '/total-actives-aggregation/' + offer)
    return response.data
}

export async function setMessagesRead(candidature, props){
    
    const data = {type: '$set', data: props}
    let response = await axios.put(base_url + '/candidature/' + candidature, data)
    return response.data
}

export async function getAllCandidatures(){
    
    let response = await axios.get(base_url + '/candidatures/0/10')
    return response.data
}

export async function getAllOffers(offerer){
    console.log('a')
    let response = await axios.get(base_url + '/offers/0/10?offerer=' + offerer)
    console.log('b')
    return response.data
}

export async function getCandidaturesForOffer(offer){
    
    let response = await axios.get(base_url + '/candidatures/0/10?offer=' + offer)
    return response.data
}

export async function getCandidateData(candidate){
    
    let response = await axios.get(base_url + '/candidate/' + candidate)
    return response.data
}

export async function getSearchOffers(tags){
    
    if(Array.isArray(tags)){
        tags = tags.join()
    }
    let response = await axios.get(base_url + '/search-offers/0/10?tags=' + tags)
    return response.data
}

export async function getAlreadySubscribed(offers){
    
    offers = offers.map(x=>x._id)
    offers = offers.join()
    let response = await axios.get(base_url + '/already-subscribed-aggregation/' + offers)
    return response.data
}

export async function createCandidature(candidature){
    
    let response = await axios.post(base_url + '/candidatures', candidature)
    return response.data
}
