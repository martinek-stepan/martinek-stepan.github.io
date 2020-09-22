<template>
<i class="technology">{{technology}}</i>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    props: {
        technology: {
            type: String,
            required: true
        },
    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
i.technology {
    margin-left: 4px;
    margin-right: 4px;
    white-space: nowrap;
}
</style>
