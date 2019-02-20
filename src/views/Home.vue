<template>
    <v-content>
        <section>
            <v-parallax src="https://welcome-english.ru/files/363/deutsch-1.jpg" height="1100">
                <v-layout
                        column
                        align-center
                        justify-center
                        class="white--text"
                >
                    <h1 class="white--text mb-2 display-1 text-xs-center">Учите Немецкий Язык</h1>
                    <v-btn
                            class="blue lighten-2 mt-5"
                            dark
                            large
                            href="/pre-made-themes"
                    >
                        Get Started
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-layout
                    column
                    wrap
                    class="my-5"
                    align-center
            >
                <v-flex xs12 sm4 class="my-3">
                    <div class="text-xs-center">
                        <h2 class="headline">Учи немецкий с удовольствием</h2>
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Material Design</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline">Fast development</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Completely Open Sourced</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>

        <section v-if="books.length">
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-2">
                    <v-flex xs12 sm8>
                        <v-card class="elevation-0 transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <h2 class="headline">Случайные книги</h2>
                            </v-card-title>
                            <v-card-text class="layout justify-center">
                                <v-carousel xs12 md4>
                                    <v-carousel-item
                                        style="cursor: pointer"
                                        v-for="(book, i) in books"
                                        :key="i"
                                        :src="book.imageUrl"
                                        @click="goToBook(book.id)"
                                    >
                                        <div class="bookTitle">{{book.title}}</div>
                                    </v-carousel-item>
                                </v-carousel>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </v-content>
</template>

<script>
export default {
 computed: {
     books() {
         let books = this.$store.getters.getBooks;
         if (!books) {
             return [];
         }

         const shuffled = books.sort(() => .5 - Math.random());

         if (shuffled.length < 5) {
             return shuffled;
         } else {
             return shuffled.slice(0, 5);
         }
     }
 },
 methods: {
     goToBook(id) {
        this.$router.push({name: 'book', params: {id: id}});
     }
 }
}
</script>
<style scoped>
    main {
        padding-top: 0!important;
    }

    .bookTitle {
        position: absolute;
        color: #fff;
        font-size: 2rem;
        padding: 15px;
        background: rgba(0, 0, 0, .5);
        width: 100%;
        text-align: center;
        cursor: pointer;
    }
</style>
