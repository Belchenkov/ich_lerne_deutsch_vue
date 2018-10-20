import firebase from 'firebase'

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null
        }
    },
    getters: {
      isUserAuthenticated: (state) => {
          return state.user.isAuthenticated
      }
    },
    mutations: {
        SET_USER (state, payload) {
            state.user.isAuthenticated = true
            state.user.uid = payload
        },
        UNSET_USER (state) {
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        }
    },
    actions: {
        SUGNUP ({commit}, payload) {
            commit('SET_PROCESSING', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('SET_PROCESSING', false)
                    commit('SET_USER', user.user.uid)
                })
                .catch((error) => {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.message)
                })
        },
        SUGNIN ({commit}, payload) {
            commit('SET_PROCESSING', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('SET_PROCESSING', false)
                    commit('SET_USER', user.user.uid)
                })
                .catch((error) => {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.message)
                })
        },
        STATE_CHANGED({commit}, payload) {
            if (payload) {
                commit('SET_USER',payload.uid)
            } else {
                commit('UNSET_USER')
            }
        }
    }
}