<template>
    <v-card
        color="info"
        class="white--text"
    >
        <v-container fluid>
            <v-layout row>
                <v-flex xs4 md3>
                    <v-img
                            height="150"
                            :src="book.imageUrl"
                    ></v-img>
                    <div class="text-xs-center">
                        <v-btn flat color="white">
                            <v-icon left>visibility</v-icon> Youtube
                        </v-btn>
                    </div>
                </v-flex>

                <v-flex xs8 md9>
                    <v-card-title>
                        <div>
                            <div class="headline">{{book.title}}</div>
                            <div>{{book.description}}</div>
                            <v-divider color="white" class="my-2"></v-divider>
                            <div>Уровень: {{getBookLevel(book.level)}}, {{book.parts.length}} частей</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <!--<v-rating
                            v-model="book.rating"
                            color="yellow"
                            dense
                            readonly
                            half-increments
                        ></v-rating>
                        <div class="ml-1">
                            <span>{{book.rating}}</span>
                            <span>({{book.ratingsCount}})</span>
                        </div>-->
                        <v-spacer></v-spacer>
                        <v-btn
                                class="primary"
                                :to="{name: 'book', params: {id: book.id}}"
                                flat
                        >Открыть</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import * as bookHelper from '../helpers/book';

    export default {
        props: {
            book: {
                type: Object,
                required: true
            }
        },
        methods: {
            getBookLevel: bookHelper.getBookLevel
        }
    }
</script>

<style scoped>

</style>
