<template>
<div class="timeline-page">
    <ul class="timeline">
        <MyTimelineItem v-for="project in state.projects" v-bind:key="project.title" v-bind:project="project"></MyTimelineItem>
    </ul>
    <MyFloatingCard></MyFloatingCard>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue';

import MyTimelineItem from "@/components/TimelinePage/MyTimelineItem.vue";
import MyFloatingCard from "@/components/TimelinePage/MyFloatingCard.vue";
import {
    useStore
} from '../store';

export default defineComponent({
    setup() {
        const store = useStore();
        const state = ref(store.state);

        return {
            state
        };
    },
    components: {
        MyFloatingCard,
        MyTimelineItem
    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
ul.timeline {
    list-style-type: none;
    position: relative;
    padding-left: 1.5rem;
}

/* Timeline vertical line */
ul.timeline:before {
    content: ' ';
    background: #fff;
    display: inline-block;
    position: absolute;
    left: 16px;
    width: 4px;
    height: 100%;
    z-index: 400;
    border-radius: 1rem;
}
</style>
