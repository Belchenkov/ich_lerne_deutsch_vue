<template>
    <div>
        <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
            <v-list>
                <v-list-tile
                        v-for="(item, i) in menuItems"
                        :key="i"
                        :to="item.route"
                >
                   <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark app class="primary elevation-11 navbar">
            <v-toolbar-side-icon
                    @click.stop="drawer = !drawer"
                    class="hidden-md-and-up"
            ></v-toolbar-side-icon>
            <router-link to="/" tag="span" class="cur-point mr-3">
                <img src="data:image/png;base64,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">
            </router-link>
            <router-link to="/" tag="span" class="cur-point">
                <v-toolbar-title v-text="logoText" class="logo-text"></v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                        v-for="(item, i) in menuItems"
                        :key="i"
                        flat
                        :to="item.route"
                >
                    <v-icon left v-html="item.icon"></v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                logoText: 'Ich Lerne Deutsch',
                drawer: false
            }
        },
        computed: {
            menuItems() {
                return this.isUserAuthenticated ?
                 [
                    { icon: 'visibility', title: 'Читать', route: '/books' },
                    { icon: 'account_circle', title: 'Мой кабинет', route: '/profile' },
                    { icon: 'exit_to_app', title: 'Выйти', route: '/logout' },
                 ] :
                [
                    { icon: 'visibility', title: 'Читать', route: '/books' },
                    { icon: 'input', title: 'Войти', route: '/signin' },
                    { icon: 'lock_open', title: 'Зарегистрироваться', route: '/signup' },
                ]
            },
            isUserAuthenticated () {
                return this.$store.getters.isUserAuthenticated
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Berkshire+Swash|Kurale&subset=cyrillic');

    .logo-text {
        font-family: 'Berkshire Swash', cursive;
        font-size: 25px;
    }

    .navbar {
        text-shadow: 0 0 3px #000;
        font-family: 'Kurale', serif;
        font-weight: bold;
    }
    
    .cur-point {
        cursor: pointer;
    }

</style>