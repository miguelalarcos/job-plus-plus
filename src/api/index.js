import axios from 'axios';

const base_url = 'http://localhost:3000'

export async function getFullCandidature(candidature) {
    let response = await axios.get(base_url + '/candidature/' + candidature)
    return response.data
}
