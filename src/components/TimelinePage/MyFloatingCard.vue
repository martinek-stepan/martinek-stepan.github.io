<template>
<div class="card floating-card">
    <div class="card-body">
        <a href="#filter" v-for="tech in technologies" :key="tech" v-on:click.stop.prevent="techClick(tech)" v-bind:class="{ 'tech-item': true,  'text-secondary': !selected.includes(tech) }">{{tech}}</a>
        <div class="row">
            <a class="col-6 text-info" href="#filter" v-on:click.stop.prevent="colapseAll">Collapse all</a>
            <a class="col-6 text-info" href="#filter" v-on:click.stop.prevent="expandAll">Expand all</a>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import {
    Project
} from "@/helpers/interfaces";
import {
    collapse
} from "../../helpers/collapseHelper";

export default defineComponent({

    props: {
        projects: {
            type: Array as() => Array < Project > ,
            required: true
        }
    },
    data: function () {
        return {
            selected: [] as Array < string >
        };
    },
    computed: {
        technologies: function (): Array < string > {
            const allTechnologies = new Set < string > ();
            for (const project of this.projects) {
                (project.technologies as Array < string > ).forEach(item => allTechnologies.add(item))
            }
            return Array.from(allTechnologies).sort();
        }
    },
    methods: {
        techClick: function (technology: string) {
            const index = this.selected.indexOf(technology);
            if (index !== -1) {
                this.selected.splice(index, 1);
                collapse(false, this.selected);
            } else {
                this.selected.push(technology);
                collapse(true, this.selected);
            }
        },
        colapseAll: function () {
            this.selected = [];
            collapse(false, this.selected);
        },
        expandAll: function () {
            this.selected = JSON.parse(JSON.stringify(this.technologies));
            collapse(true, this.technologies);
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
