import { appendMessage, candidatureSave, 
    getCandidateMessageAggregation, /*setMessagesRead*/ getAllCandidatures,
getTotalActivesAggregation, getAllOffers, getCandidaturesForOffer,
getOffererMessageAggregation, getCandidateData, appendExperience, 
setExperience, getUserData, getSearchOffers, createCandidature,
getAlreadySubscribed, deleteExperience, getLogin, 
getTotalNewCandidatesAggregation, //setCandidatureRead,
getUnreadMessagesForCandidatures, candidatureSaveProps, updateOffer, newOffer,
searchTags, upsertTag, updateProject, solicite, invite, getFakeLogin,
getFullProject, getSearchProjects, getMyProjects, newProject, getMessagesData } from '@/api'


export default {
    newError(context, {msg}) {
        context.commit('newError', msg)
        setTimeout(() => {
          context.commit('newError', '')
        }, 3000)
    },
    async appendMessageAction(context, {id, msg}) {
        const message = await appendMessage(id, msg)
        context.commit('appendMessage', {message})
    }/*,
    async appendProjectMessageAction(context, {project, msg}){
        const messages = await appendMessage(project, msg)
        context.commit('setProjectMessages', {messages})
    }*/,
    async appendExperienceAction(context, {user_id, experience}){
        const user = await appendExperience(user_id, experience)
        context.commit('setUser', {user})
    },
    async deleteExperienceAction(context, {user_id, experience}){
        const user = await deleteExperience(user_id, experience)
        context.commit('setUser', {user})
    },
    async setExperienceAction(context, {user_id, path, value, index}){
        const user = await setExperience(user_id, path, value)
        context.commit('setUser', {user})
        context.commit('setNotificationObservation', {id: index, txt: 'guardado'})
        setTimeout(() => {
            context.commit('setNotificationObservation', {id: index, txt: ''})
        }, 1500)
    },
    async getPerojectsDataAction(context) {
        context.commit('setLoading', {b: true})
        const ps = await getMyProjects()
        context.commit('setMyProjects', {projects: ps})
        context.commit('setLoading', {b:false})
    },
    async getProjectMessagesDataAction(context, {project}){
        context.commit('setLoading', {b: true})
        const p = await getFullProject(project)
        context.commit('setProjectSelected', {project: p})
        context.commit('setLoading', {b:false})
        /*let props = []
        const indexes = p.messages.map((e, index) => {return {owner:e.owner, index, b: e.unread === true}}).filter((e) => e.owner !== context.state.user.login && e.b === true)
        props = indexes.map((x) => {return {path: 'messages.' + x.index + '.unread', value: false} })
        if(props.length > 0)
            await setProjectMessagesRead(candidature, props)
    */},
    async getMessagesDataAction(context, {id}){
        //https://github.com/greyby/vue-spinner
        context.commit('setLoading', {b: true})
        const messages = await getMessagesData(id)
        context.commit('setMessages', {messages})
        context.commit('setLoading', {b:false})
        /*
        context.commit('setLoading', {b: true})
        const c = await getFullCandidature(candidature)
        context.commit('setCandidatureSelected', {candidature: c})
        context.commit('setLoading', {b:false})
        let props = []
        const indexes = c.messages.map((e, index) => {return {owner:e.owner, index, b: e.unread === true}}).filter((e) => e.owner !== context.state.user.login && e.b === true)
        props = indexes.map((x) => {return {path: 'messages.' + x.index + '.unread', value: false} })
        if(props.length > 0)
            await setMessagesRead(candidature, props)
        */
    },
    async savesPropAction(context, {id, prop, value}){
        const doc = await candidatureSave(id, prop, value)
        context.commit('savesCandidature', {_id: doc._id, doc})
        if(prop === 'candidateObservations' || prop === 'offererObservations'){
            context.commit('setNotificationObservation', {id, txt: 'guardado'})
            setTimeout(() => {
                context.commit('setNotificationObservation', {id, txt: ''})
              }, 1500)
        }
    },
    async getCandidaturesForOfferAction(context, {offer}){
        context.commit('setLoading', {b: true})
        let candidatures = await getCandidaturesForOffer(offer)
        context.commit('setCandidaturesForOffer', {candidatures})
        //const docs = await getOffererMessageAggregation()
        //context.commit('offererMessageAggregation', {docs})
        candidatures = candidatures.map(x=>x._id)
        const docs = await getUnreadMessagesForCandidatures(candidatures)
        context.commit('candidateMessageAggregation', {docs})

        context.commit('setLoading', {b:false})
    },
    async getCandidatureDataAction(context){
        context.commit('setLoading', {b: true})
        const candidatures = await getAllCandidatures()
        context.commit('setMyCandidatures', {candidatures})
        const docs = await getCandidateMessageAggregation()
        context.commit('candidateMessageAggregation', {docs})
        context.commit('setLoading', {b:false})
    },
    async getOfferDataAction(context, {offerer, offset}){
        try{
            context.commit('setLoading', {b: true})
            const offers = await getAllOffers(offerer, offset)
            context.commit('setMyOffers', {offers})
            if(offers.length > 0) {                
                const ids = offers.map((x)=>x._id)
                const aggr = await getTotalActivesAggregation(ids)
                context.commit('setTotalActivesOffer', {aggr})
                const new_candidates = await getTotalNewCandidatesAggregation(ids)
                context.commit('setTotalNewCandidates', {new_candidates})
                const docs = await getOffererMessageAggregation()
                context.commit('offererMessageAggregation', {docs})
            }
            context.commit('setLoading', {b:false})
        }catch(err){
            context.dispatch('newError', {msg: err})
        }
    },
    async getSearchProjectDataAction(context, {tags}){
        context.commit('setLoading', {b: true})
        const offers = await getSearchProjects(tags)
        context.commit('setSearchProjects', {offers})
        context.commit('setLoading', {b:false})
    },
    async getSearchOfferDataAction(context, {tags}){
        context.commit('setLoading', {b: true})
        const offers = await getSearchOffers(tags)
        context.commit('setSearchOffers', {offers})
        if(offers.length > 0) {
            const ids = offers.map((x)=>x._id)
            const aggr = await getTotalActivesAggregation(ids)
            context.commit('setTotalActivesSearchOffer', {aggr})
            const already = await getAlreadySubscribed(offers)
            context.commit('setAlreadySubscribed', {already})
        }
        context.commit('setLoading', {b:false})
    },
    async suscribirseAction(context, {candidature}){
        await createCandidature(candidature)
    },
    async getTotalActivesAction(context, {candidature, offer}){
        const aggr = await getTotalActivesAggregation(offer)
        const total = aggr[0]['total']
        context.commit('setTotalActives', {candidature, total})
    },
    async getTotalActivesOfferAction(context, {offers}){
        const aggr = await getTotalActivesAggregation(offers)
        context.commit('setTotalActivesOffer', {aggr})
    },
    async getCandidateDataAction(context, {candidate}){
        context.commit('setLoading', {b: true})
        candidate = await getCandidateData(candidate)
        context.commit('setCandidateData', {candidate})
        context.commit('setLoading', {b:false})
    },
    async getUserDataAction(context, {user_id}){
        context.commit('setLoading', {b: true})
        const user = await getUserData(user_id)
        context.commit('setUser', {user})
        context.commit('setLoading', {b:false})
    },
    async getUserExperienceAction(context, {user_id}){
        const user = await getUserData(user_id)
        context.commit('setExperience', {_id: user_id, experience: user})
    },
    async getLoginAction(context, {code}){
        context.commit('setLoading', {b: true})
        const user = await getLogin(code)
        context.commit('setUser', {user})
        context.commit('setLoading', {b: false})
    },
    async getFakeLoginAction(context, {login}){
        context.commit('setLoading', {b: true})
        const user = await getFakeLogin(login)
        context.commit('setUser', {user})
        context.commit('setLoading', {b: false})
    },
    async setCandidatureReadAction(context, {candidature}){
        //const doc = await setCandidatureRead(candidature)
        const doc = await candidatureSave(candidature, 'unread', false)
        context.commit('savesCandidature', {_id: doc._id, doc})
    },
    async setCandidaturePropsAction(context, {candidature, payload}){
        const doc = await candidatureSaveProps(candidature, payload)
        context.commit('savesCandidature', {_id: doc._id, doc})
    },
    async updateProjectAction(context, {project, data}){
        project = await updateProject(project, data)
        context.commit('addMyProjects', {project})
        context.commit('setNotificationProjectSaved', {id: project._id, txt: 'guardado'})
            setTimeout(() => {
                context.commit('setNotificationProjectSaved', {id: project._id, txt: ''})
              }, 1500)
    },
    async updateOfferAction(context, {offer, data}){
        offer = await updateOffer(offer, data)
        context.commit('addMyOffers', {offer})
        context.commit('setNotificationOfferSaved', {id: offer._id, txt: 'guardado'})
            setTimeout(() => {
                context.commit('setNotificationOfferSaved', {id: offer._id, txt: ''})
              }, 1500)
    },
    async newOfferAction(context){
        const offer = await newOffer()
        context.commit('appendOffer', {offer})
    },
    async newProjectAction(context){
        const project = await newProject()
        context.commit('appendProject', {project})
    },
    async searchTagsAction(context, {value}){
        let tags = await searchTags(value)
        //tags = tags.items.map(x => {return {tag: x.name}})
        //tags = tags.items.map(x => {return {tag: x}})
        tags = tags.map(x => {return {tag: x}})
        context.commit('setListOfTags', {tags})
    },
    async upsertTagAction(context, {tag}){
        await upsertTag(tag)
    },
    async soliciteAction(context, {user, project}){
        await solicite(project, user)
    },
    async inviteAction(context, {user, project}){
        await invite(project, user)
    }
}