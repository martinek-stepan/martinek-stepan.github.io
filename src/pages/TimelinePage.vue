<template>
<div class="timeline-page">
    <ul class="timeline">
        <MyTimelineItem v-for="project in projects" v-bind:key="project.title" v-bind:project="project"></MyTimelineItem>
    </ul>
    <MyFloatingCard :projects="projects"></MyFloatingCard>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import {
    Project
} from "@/helpers/interfaces";

import rawJson from '../json/data.json';
import MyTimelineItem from "@/components/TimelinePage/MyTimelineItem.vue";
import MyFloatingCard from "@/components/TimelinePage/MyFloatingCard.vue";

const projectsData = rawJson as Array < Project > ;
console.log(rawJson, projectsData);
export default defineComponent({
    components: {
        MyFloatingCard,
        MyTimelineItem
    },
    computed: {
        projects: function () {
            projectsData.sort(function (a: Project, b: Project) {
                const aParts = a.date.split("/");
                const bParts = b.date.split("/");
                if (aParts[1] > bParts[1]) {
                    return -1;
                } else if (aParts[1] < bParts[1]) {
                    return 1;
                } else if (aParts[0] > bParts[0]) {
                    return -1;
                } else if (aParts[0] < bParts[0]) {
                    return 1;
                } else {
                    return 0;
                }
            });
            console.log(projectsData);
            return projectsData;
        }
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
