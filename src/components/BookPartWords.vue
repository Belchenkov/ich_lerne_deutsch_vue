<template>
    <v-container fluid>
        <div class="display-1 py-2">Слова</div>
        <v-data-iterator
                :items="words"
                content-tag="v-layout"
                row
                hide-actions
                wrap
        >
            <v-flex
                    slot="item"
                    slot-scope="props"
                    xs12
                    sm12
                    md6
                    lg6
            >
                <v-card>
                    <v-card-title>
                        <div class="headline">
                            <v-tooltip bottom>
                                <v-avatar
                                        v-if="props.item.type == 1"
                                        color="teal"
                                        size="45"
                                        slot="activator"
                                >
                                    <span class="white--text">W</span>
                                </v-avatar>
                                <span>Слово / das Wort</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <v-avatar
                                        slot="activator"
                                        v-if="props.item.type == 2"
                                        color="indigo"
                                        size="45"
                                >
                                    <span class="white--text">RW</span>
                                </v-avatar>
                                <span>Выражение / die Redewendung</span>
                            </v-tooltip>
                            {{ getFullOriginalWord(props.item) }}
                        </div>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="headline">
                            {{props.item.transText}}
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                small
                                fab
                                dark
                        ><v-icon dark>add</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-data-iterator>
    </v-container>
</template>

<script>
    import { getFullOriginalWord } from '../helpers/words';

    export default {
        props: {
            data: {
                type: Object,
                default: null
            }
        },
        data () {
            return {

            }
        },
        computed: {
            words() {
                if (!this.data) return [];

                let words = [];
                for(let property in this.data) {
                    if (this.data.hasOwnProperty(property)) {
                        let word = this.data[property];
                        word.key = property;
                        words.push(word);
                    }
                }

                return words;
            }
        },
        methods: {
            getFullOriginalWord: getFullOriginalWord
        }
    }
</script>

<style scoped>

</style>
