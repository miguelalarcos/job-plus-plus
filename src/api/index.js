import axios from 'axios';

let base_url = ''

if(process.env.NODE_ENV === 'development'){
    base_url = process.env.VUE_APP_ROOT_API 
}
else{
    base_url = process.env.VUE_APP_ROOT_API_PROD
}

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
    let response = await axios.get(base_url + '/login?name=' + name)
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

export async function candidatureSaveProps(candidature, payload){
    const data = {type: '$set', data: payload}
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

export async function getTotalNewCandidatesAggregation(offers){
    offers = offers.join()
    let response = await axios.get(base_url + '/new-candidates/' + offers)
    return response.data
}

export async function getUnreadMessagesForCandidatures(candidatures){
    candidatures = candidatures.join()
    let response = await axios.get(base_url + '/message-aggregation-candidates/' + candidatures)
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

/*export async function setCandidatureRead(candidature){
    const data = {type: '$set', data: [{path: 'unread', value: false}]}
    let response = await axios.put(base_url + '/candidature/' + candidature, data)
    return response.data
}*/

export async function getAllCandidatures(){
    
    let response = await axios.get(base_url + '/candidatures/0/10?my=true')
    return response.data
}

export async function getAllOffers(offerer, offset){
    let response = await axios.get(base_url + '/offers/' + offset + '/10?offerer=' + offerer)
    return response.data
}

export async function getCandidaturesForOffer(offer){
    
    let response = await axios.get(base_url + '/candidatures/0/10?offer=' + offer)
    return response.data
}

export async function getCandidateData(candidate){ //repe
    
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

export async function updateOffer(offer, data){
    data = {type: '$set', data}
    
    let response = await axios.put(base_url + '/offer/' + offer, data)
    return response.data
}

export async function newOffer(){
    let response = await axios.post(base_url + '/offers', {})
    return response.data
}

export async function searchTags(value){
    let response = await axios.get(base_url + '/tags/0/10?value=' + value)
    return response.data
}

export async function upsertTag(tag){
    await axios.put(base_url + '/tags/' + tag)
}