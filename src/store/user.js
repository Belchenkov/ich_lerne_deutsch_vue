import firebase from 'firebase'
import { EventBus } from '../infrastructure/eventBus';

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null,
            name: null,
            email: null
        },
        unsubscribeAuth: null
    },
    getters: {
      isUserAuthenticated: (state) => {
          return state.user.isAuthenticated
      },
      userId: (state) => state.user.uid,
      userName: (state) => state.user.name,
      userEmail: (state) => state.user.email
    },
    mutations: {
        SET_USER (state, payload) {
            state.user.isAuthenticated = true;
            state.user.uid = payload.uid;
            state.user.email = payload.email;
        },
        SET_USER_NAME (state, payload) {
            state.user.name = payload;
        },
        SET_USER_EMAIL (state, payload) {
            state.user.email = payload;
        },
        UNSET_USER (state) {
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        },
        SET_UNSUBSCRIBE_AUTH(state, payload) {
            state.unsubscribeAuth = payload;
        }
    },
    actions: {
        INIT_AUTH ({dispatch, commit, state}) {
            return new Promise((resolve, reject) => {
                if (state.unsubscribeAuth) {
                    state.unsubscribeAuth();
                }
                let unsubscribe = firebase.auth().onAuthStateChanged(user => {
                    dispatch('STATE_CHANGED', user);
                    resolve(user);
                });
                commit('SET_UNSUBSCRIBE_AUTH', unsubscribe);
            });
        },
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
                commit('SET_USER', {uid: payload.uid, email: payload.email});
                commit('SET_USER_NAME', payload.displayName);
                dispatch('LOAD_USER_DATA', payload.uid);
            } else {
                commit('UNSET_USER');
            }
        },
        CHANGE_USER_PROFILE_DATA({commit}, payload) {
            let user = firebase.auth().currentUser;
            let credential = firebase.auth.EmailAuthProvider.credential(
                payload.email,
                payload.password
            );

            commit('SET_PROCESSING', true);
            commit('CLEAR_ERROR');

            user.reauthenticateAndRetrieveDataWithCredential(credential)
                .then(() => {
                    let currentUser = firebase.auth().currentUser;

                    if (payload.changeType == 'name') {
                        currentUser.updateProfile({displayName: payload.newName})
                            .then(() => {
                                commit('SET_PROCESSING', false);
                                commit('SET_USER_NAME', payload.newName);
                                EventBus.notify('user-profile-data-changed');
                            })
                            .catch(err => {
                                commit('SET_PROCESSING', false);
                                commit('SET_ERROR', error.message);
                            });
                    }

                    if (payload.changeType == 'email') {
                        currentUser.updateEmail(payload.newEmail)
                            .then(() => {
                                commit('SET_PROCESSING', false);
                                commit('SET_USER_EMAIL', payload.newEmail);
                                EventBus.notify('user-profile-data-changed');
                            })
                            .catch(err => {
                                commit('SET_PROCESSING', false);
                                commit('SET_ERROR', err.message);
                            });
                    }

                    if (payload.changeType == 'password') {
                        currentUser.updatePassword(payload.newPassword)
                            .then(() => {
                                commit('SET_PROCESSING', false);
                                EventBus.notify('user-profile-data-changed');
                            })
                            .catch(err => {
                                commit('SET_PROCESSING', false);
                                commit('SET_ERROR', err.message);
                            });
                    }
                })
                .catch(err => {
                    commit('SET_PROCESSING', false);
                    commit('SET_ERROR', err.message);
                });
        }
    }
}
