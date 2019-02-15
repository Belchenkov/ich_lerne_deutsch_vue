<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h5 class="headline mb-0">
                        <v-icon>person</v-icon> {{userName}}
                    </h5>
                    <h5 class="headline mb-0">
                        <v-icon>email</v-icon> {{userEmail}}
                    </h5>
                </div>
            </v-card-title>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="500">
                    <v-btn slot="activator" flat color="orange">Изменить мои данные</v-btn>
                    <v-card>
                        <v-card-title class="headline">Изменить мои данные?</v-card-title>
                        <v-card-text>
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
                            <h3>Я хочу изменить</h3>
                            <v-radio-group v-model="changeType">
                                <v-radio label="Имя" value="name"></v-radio>
                                <v-radio label="E-mail" value="email"></v-radio>
                                <v-radio label="Пароль" value="password"></v-radio>
                            </v-radio-group>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" flat @click="dialog = false">Отмена</v-btn>
                            <v-btn color="green darken-1" flat @click="dialog = false">Изменить</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        data () {
            return {
                dialog: false,
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
            ...mapGetters([
                'userName',
                'userEmail'
            ])
        }
    }
</script>

<style scoped>

</style>
