<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Войти</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-alert
                                    type="warning"
                                    :value="error"
                            >{{ error }}</v-alert>
                            <v-form>
                                <v-text-field
                                        prepend-icon="person"
                                        name="login"
                                        label="Почта"
                                        type="text"
                                        required
                                        v-model="email"
                                        :rules="emailRules"
                                ></v-text-field>
                                <v-text-field
                                        id="password"
                                        prepend-icon="lock"
                                        name="password"
                                        label="Пароль"
                                        type="password"
                                        required
                                        v-model="password"
                                        :rules="passwordRules"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    @click.prevent="signin"
                                    :disabled="processing"
                            >Войти</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        data () {
            return {
                email: null,
                password: null,
                emailRules: [
                    (v) => !!v || 'Пожалуйста введите email',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неправильный email'
                ],
                passwordRules: [
                    (v) => !!v || 'Пожалуйста введите пароль',
                    (v) => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
                ]﻿
            }
        },
        computed: {
            error () {
                return this.$store.getters.getError
            },
            processing () {
                return this.$store.getters.getProcessing
            },
            isUserAuthenticated () {
                return this.$store.getters.isUserAuthenticated
            }
        },
        watch: {
            isUserAuthenticated (val) {
                return !!val ? this.$router.push('/') : false
            }
        },
        methods: {
            signin () {
                this.$store.dispatch('SIGNIN', {
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>
