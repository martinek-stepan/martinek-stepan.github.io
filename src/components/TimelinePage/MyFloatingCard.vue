<template>
<div class="card floating-card">
    <div class="card-body">
        <a href="#filter" v-for="tech in technologies" :key="tech" v-on:click.stop.prevent="techClick(tech)" v-bind:class="{ 'tech-item': true,  'text-secondary': !this.state.selectedTechnologies.includes(tech) }">{{tech}}</a>
        <div class="row">
            <a class="col-6 text-info" href="#filter" v-on:click.stop.prevent="colapseAll">Collapse all</a>
            <a class="col-6 text-info" href="#filter" v-on:click.stop.prevent="expandAll">Expand all</a>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue';

import {
    MutationTypes,
    useStore
} from '../../store';

export default defineComponent({

    setup() {
        const store = useStore();
        const state = ref(store.state);

        const allTechnologies = new Set < string > ();
        for (const project of store.state.projects) {
            project.technologies.forEach(item => allTechnologies.add(item))
        }
        const technologies = Array.from(allTechnologies).sort();
        store.commit(MutationTypes.SET_TECHNOLOGY, technologies);

        return {
            state,
            store,
            technologies
        };

    },
    methods: {
        techClick: function (technology: string) {
            const index = this.state.selectedTechnologies.indexOf(technology);
            if (index === -1) {
                this.store.commit(MutationTypes.SELECT_TECHNOLOGY, technology)
            } else {
                this.store.commit(MutationTypes.DESELECT_TECHNOLOGY, technology)
            }
        },
        colapseAll: function () {
            this.store.commit(MutationTypes.SET_TECHNOLOGY, []);
        },
        expandAll: function () {
            this.store.commit(MutationTypes.SET_TECHNOLOGY, this.technologies);
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.floating-card {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 250px;
}

.tech-item {
    margin-left: 3px;
    margin-right: 3px;
    white-space: nowrap;
}
</style>
