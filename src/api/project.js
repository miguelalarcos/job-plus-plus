import axios from 'axios';

let base_url = ''

if(process.env.NODE_ENV === 'development'){
    base_url = process.env.VUE_APP_ROOT_API 
}
else{
    base_url = process.env.VUE_APP_ROOT_API_PROD
}

export async function invite(project, user){
    const data = {$addToSet: {invited: user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data
}

export async function solicite(project, user){
    const data = {$addToSet: {solicitations: user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data
}

export async function acceptInvitation(project, user){
    const data = {"$push": {"participants": user}, "$pull": {"invitations": user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data    
}

export async function rejectInvitation(project, user){
    const data = {"$pull": {"invitations": user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data
}

export async function acceptSolicitation(project, user){
    const data = {"$push": {"participants": user}, "$pull": {"solicitations": user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data    
}

export async function rejectSolicitation(project, user){
    const data = {"$pull": {"solicitations": user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data
}

export async function cancelInvitation(project, user) {
    const data = {"$pull": {"invitations": user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data
}

export async function cancelSolicitation(project, user) {
    const data = {"$pull": {"solicitations": user}}
    let response = await axios.put(base_url + '/project/' + project, data)
    return response.data
}

export async function getMyProjects() {
    let response = await axios.get(base_url + '/my-projects/0/10')
    return response.data
}