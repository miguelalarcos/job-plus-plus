export default {
    /*totalNotifications(state){
        const a1 = Object.values(state.events)
        const ret = a1.reduce((a, b) => a + b, 0)
        return ret 
    },*/
    totalCandidateNotifications(state) {
        let count = 0
        for(let key in state.events) {
            if(key.match(/NEW_CANDIDATE/)){
                count ++
            }
        }
        return count
    },
    totalMessageNotifications(state) {
        let count = 0
        for(let key in state.events) {
            if(key.match(/MESSAGE/)){
                count += state.events[key]
            }
        }
        return count
    },
    newCandidates: (state) => (txt) =>{
        txt = txt + '.NEW_CANDIDATE' 
        const keys = Object.keys(state.events)
        
        let sum = 0
        keys.map((k)=>{
            if(k.startsWith(txt)){
                sum += state.events[k]
            }
        })
        return sum;
    },
    newMessages: (state) => (prefix) =>{
        const txt = prefix + '.MESSAGE' 
        const keys = Object.keys(state.events)
        
        let sum = 0
        keys.map((k)=>{
            if(k.startsWith(txt)){
                sum += state.events[k]
            }
        })
        return sum;
    },
    candidateNewEvents: (state) => (candidature) => {
        const events = state.candidateNewEvents.filter(x => x._id === candidature)
        if(events.length == 1) 
            return events[0].total
        else 
            return 0
    },
    offererNewEvents: (state) => (offer) => {
        const events = state.offererNewEvents.filter(x => x._id === offer)
        if(events.length == 1) 
            return events[0].total
        else 
            return 0
    }
}
