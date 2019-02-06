<template>
    <div>
        <v-footer :fixed="true" app>
            <span>Ich Lerne Deutsch &copy; 2018 - {{currentYear}}</span>
        </v-footer>
    </div>
</template>

<script>
    export default {
        name: "AppFooter",
        computed: {
            currentYear() {
                return new Date().getFullYear();
            }
        }
    }
</script>

<style scoped>

</style>
