<template>
    <v-card class="pa-3">
        <div>
            <div class="display-1">{{part.bookTitle}}</div>
            <div class="headline">{{part.partTitle}}</div>
            <v-divider class="black"></v-divider>
        </div>
        <div class="text-xs-center my-3 primary">
            <youtube :video-id="part.youtube_id" :player-width="playerWidth"></youtube>
        </div>
        <div class="mt-3">
            <v-slider
                    v-model="fontSize"
                    :label="`Размер шрифта (${fontSize})`"
                    step="1"
                    max="30"
                    min="10"
                    tick-size="5"
            ></v-slider>
            <v-tabs
                    color="accent"
                    v-model="tabMode"
                    slider-color="green"
                    dark
                    fixed-tabs
            >
                <v-tab :key="'german'" ripple>
                    Текст с подсказками
                </v-tab>
                <v-tab :key="'sidebyside'" ripple>
                    Параллельно
                </v-tab>
                <v-tab-item :key="'german'">
                    <div v-for="(paragraph, i) in part.content" :key="`par1${i}`">
                        <span>&nbsp;&nbsp;</span>
                        <span
                            v-for="(sentence, j) in paragraph.sentences"
                            :key="`par1${i}sen1${j}`"
                            :style="textStyle"
                        >
                            <span>{{sentence.origText}}</span>
                            <v-icon
                                    size="18"
                                    @click="change(i + '' + j)"
                                    :style="textStyle"
                            >help</v-icon>
                            <span :ref="i+''+j" class="success--text" style="font-weight: bold;display: none">
                                {{sentence.transText}}
                            </span>
                        </span>
                    </div>
                </v-tab-item>
                <v-tab-item :key="'sidebyside'">
                    <v-container>
                        <v-layout row wrap v-for="(paragraph, i) in part.content" :key="`par2${i}`">
                            <v-flex xs6>
                                <span>&nbsp;&nbsp;</span>
                                <span
                                        v-for="(sentence, j) in paragraph.sentences"
                                        :key="`par2${i}sen2${j}_orig`"
                                        :style="textStyle"
                                >
                                   <span>{{sentence.origText}}</span>
                                </span>
                            </v-flex>
                            <v-flex xs6>
                                <span>&nbsp;&nbsp;</span>
                                <span
                                        v-for="(sentence, j) in paragraph.sentences"
                                        :key="`par2${i}sen2${j}_trans`"
                                        :style="textStyle"
                                >
                                   <span>{{sentence.transText}}</span>
                                </span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </div>
    </v-card>
</template>

<script>
    export default {
        props: {
            'part': {
                type: Object,
                required: true
            }
        },
        data () {
          return {
              tabMode: 'german',
              visibilityKeys: [],
              fontSize: 18
          }
        },
        computed: {
            playerWidth() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '220px';
                    case 'sm': return '400px';
                    case 'md': return '500px';
                    case 'lg': return '600px';
                    case 'xl': return '800px';
                }
            },
            textStyle() {
                return {
                    fontSize: `${this.fontSize}px`
                };
            }
        },
        methods: {
            change(ref) {
                if (!this.$refs[ref][0].style.display)
                    this.$refs[ref][0].style.display = "none";
                else this.$refs[ref][0].style.display = "";
            },

            getVisibilityFlag(i,y) {
                return this.visibilityKeys.find(k => k.key == `${i}${y}`);
            },
            toggleVisibility(i, y) {
                let flag = this.getVisibilityFlag(i, y);
                flag.value = !flag.value;
            }
        },
        created() {
            for(let i = 0; i < this.part.content.length; i++) {
                for(let y = 0; y < this.part.content[i].sentences.length; y++) {
                    this.visibilityKeys.push({
                       key: `${i}${y}`,
                       value: false
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
