import firebase from 'firebase'

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null,
            name: null
        }
    },
    getters: {
      isUserAuthenticated: (state) => {
          return state.user.isAuthenticated
      },
      userId: (state) => state.user.uid
    },
    mutations: {
        SET_USER (state, payload) {
            state.user.isAuthenticated = true;
            state.user.uid = payload;
        },
        SET_USER_NAME (state, payload) {
            state.user.name = payload;
        },
        UNSET_USER (state) {
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        }
    },
    actions: {
        SIGNUP ({commit}, payload) {
            commit('SET_PROCESSING', true);
            commit('CLEAR_ERROR');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({displayName: payload.name})
                        .then(() => commit('SET_USER_NAME', payload.name))
                        .catch(err => console.error(err));
                    commit('SET_PROCESSING', false);
                })
                .catch((error) => {
                    commit('SET_PROCESSING', false);
                    commit('SET_ERROR', error.message);
                })
        },
        SIGNIN ({commit}, payload) {
            commit('SET_PROCESSING', true);
            commit('CLEAR_ERROR');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    commit('SET_PROCESSING', false);
                })
                .catch((error) => {
                    commit('SET_PROCESSING', false);
                    commit('SET_ERROR', error.message);
                })
        },
        LOGOUT() {
            firebase.auth().signOut();
        },
        STATE_CHANGED({commit, dispatch}, payload) {
            if (payload) {
                commit('SET_USER', payload.uid);
                commit('SET_USER_NAME', payload.displayName);
                dispatch('LOAD_USER_DATA', payload.uid);
            } else {
                commit('UNSET_USER');
            }
        }
    }
}
