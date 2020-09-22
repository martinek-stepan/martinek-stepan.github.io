<template>
<li class="timeline-item tl-gray rounded ml-3 p-4 shadow">
    <div class="timeline-arrow"></div>
    <MyCard :key="project.title" :project="project">
        {{ project.title}}
    </MyCard>
</li>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import {
    Project
} from "@/helpers/interfaces";
import MyCard from "@/components/TimelinePage/MyCard.vue";

export default defineComponent({
    components: {
        MyCard
    },
    props: {
        project: {
            type: Object as() => Project,
            required: true
        },
    }

});
</script>

<style>
li.timeline-item {
    margin: 20px 0;
    background-color: white;
}

/* Timeline item arrow */
.timeline-arrow {
    border-top: 0.5rem solid transparent;
    border-right: 0.5rem solid #fff;
    border-bottom: 0.5rem solid transparent;
    display: block;
    position: absolute;
    left: 2rem;
}

/* Timeline item circle marker */
li.timeline-item::before {
    content: ' ';
    background: #ddd;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #fff;
    left: 11px;
    width: 14px;
    height: 14px;
    z-index: 400;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
