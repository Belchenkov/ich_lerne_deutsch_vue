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
                    sm6
                    md4
                    lg3
            >
                <v-card>
                    <v-card-title><h4>{{ props.item.origWord }}</h4></v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>{{props.item.transWord}}</v-card-text>
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
    export default {
        props: {
            words: {
                type: Array,
                required: true
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
