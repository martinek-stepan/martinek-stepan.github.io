<template>
<div class="tab-pane fade custom-padding" :id="project.id+'-video'" role="tabpanel" :aria-labelledby="project.id+'-video'">
    <iframe class="" height="500" :src="project.video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import {
    Project
} from "@/helpers/interfaces";

export default defineComponent({
    props: {
        project: {
            type: Object as() => Project,
            required: true
        },
    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.custom-padding {
    padding-right: 15px;
    padding-left: 15px;
}
</style>
