<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
                <v-tabs
                        color="accent"
                        v-model="tabMode"
                        slider-color="green"
                        dark
                        fixed-tabs
                >
                    <v-tab :key="'data'" ripple>
                        Мои данные
                    </v-tab>
                    <v-tab :key="'books'" ripple>
                        Мои книги
                    </v-tab>
                    <v-tab :key="'words'" ripple>
                        Мои слова
                    </v-tab>
                    <v-tab-item :key="'data'">
                        <user-profile-data></user-profile-data>
                    </v-tab-item>
                    <v-tab-item :key="'books'">

                    </v-tab-item>
                    <v-tab-item :key="'words'">

                    </v-tab-item>
                </v-tabs>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import UserProfileData from '../components/UserProfileData';

    export default {
        data () {
            return {
                tabMode: ''
            }
        },
        components: {
            UserProfileData
        }
    }
</script>

<style scoped>

</style>
