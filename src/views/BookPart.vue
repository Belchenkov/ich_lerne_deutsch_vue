<template>
   <v-container grid-list-md v-if="part">
       <v-layout row wrap>
           <v-flex xs12 sm10 offset-sm1 v-if="finishedDate">
               <v-card>
                   <v-responsive>
                       <v-img
                           max-width="440px"
                           src="https://firebasestorage.googleapis.com/v0/b/ich-lerne-deutsch.appspot.com/o/erledigt.jpg?alt=media&token=2923630c-fc2c-4991-a97e-a092b77c0c7e"
                       ></v-img>
                   </v-responsive>
               </v-card>
               <v-card-title primary-title>
                   <div class="headline">Эта часть пройдена! {{finishedDate | formattedDate }}</div>
               </v-card-title>
               <v-card-actions>
                   <span>Моя оценка</span>
                   <v-rating
                           v-model="savedRating"
                           color="success"
                           readonly
                           large
                   ></v-rating>
               </v-card-actions>
           </v-flex>
           <v-flex xs12 sm10 offset-sm1>
                <book-part-content :part="part"></book-part-content>
           </v-flex>
           <v-flex xs12 sm10 offset-sm1>
                <book-part-words :words="part.words"></book-part-words>
           </v-flex>
           <v-flex xs12 sm10 offset-sm1 class="text-xs-center">
               <v-dialog
                       v-model="finishDialog"
                       persistent
                       max-width="600px"
               >
                   <v-btn
                           v-if="!finishedDate"
                           slot="activator"
                           color="success"
                           dark
                   ><v-icon>check</v-icon>Эта часть пройдена!</v-btn>
                   <v-card>
                       <v-responsive>
                           <v-img
                                   max-width="440px"
                                   src="https://firebasestorage.googleapis.com/v0/b/ich-lerne-deutsch.appspot.com/o/erledigt.jpg?alt=media&token=2923630c-fc2c-4991-a97e-a092b77c0c7e"
                           ></v-img>
                       </v-responsive>
                       <v-card-title primary-title>
                           <div class="headline">Эта часть пройдена!</div>
                       </v-card-title>
                       <v-card-text>
                           <span>Моя оценка</span>
                           <v-rating
                            v-model="rating"
                            color="success"
                            half-increments
                            large
                           ></v-rating>
                       </v-card-text>
                       <v-card-actions>
                           <v-spacer></v-spacer>
                           <v-btn color="primary" dark @click.native="finishDialog = false">
                               <v-icon>close</v-icon> Закрыть
                           </v-btn>
                           <v-btn
                                   color="success"
                                   dark
                                   @click.native="finishWork"
                           >
                               <v-icon>check</v-icon> Готово
                           </v-btn>
                       </v-card-actions>
                   </v-card>
               </v-dialog>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
    import Vue from 'vue';
    import BookPartContent from '../components/BookPartContent';
    import BookPartWords from '../components/BookPartWords';

    export default {
        props: {
            'bookId': {
                type: String,
                required: true
            },
            'partId': {
                type: String,
                required: true
            }
        },
        data() {
          return {
              part: '',
              finishDialog: false,
              rating: 0
          }
        },
        components: {
            BookPartContent,
            BookPartWords
        },
        computed: {
            finishedDate() {
                return this.$store.getters.userData.books[this.bookId].parts[this.partId].finishedDate;
            },
            savedRating() {
                return this.$store.getters.userData.books[this.bookId].parts[this.partId].rating;
            }
        },
        created() {
            Vue.$db.collection('bookParts')
                .where('bookId', '==', this.bookId)
                .where('bookPartId', '==', this.partId)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(s => {
                        this.part = s.data();
                    });
                })
                .then(() => {
                    this.$store.dispatch('UPDATE_USER_BOOK_PART_STATS', {bookId: this.bookId, partId: this.partId});
                })
                .catch(err => console.error(err))
        },
        methods: {
            finishWork() {
                this.finishDialog = false;

                this.$store.dispatch('FINISH_USER_BOOK_PART', {
                    bookId: this.bookId,
                    partId: this.partId,
                    rating: this.rating
                });
            }
        }
    }
</script>

<style scoped>

</style>
