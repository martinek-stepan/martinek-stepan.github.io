<template>
<div>
    <div class="card">
        <div class="card-header" :id="project.id+'heading'">
            <div class="row">
                <div class="col-10">
                    <a class="btn btn-link" data-toggle="collapse" :href="'#'+project.id+'collapse'" role="button" aria-expanded="false" :aria-controls="project.id+'collapse'">
                        <h5 class="card-title">{{project.title}}</h5>
                    </a>
                </div>
                <div class="col-2">
                    <a class="nav-link" :id="project.id+'-repo-link'" :href="project.repo" target="_blank"><img src="../../assets/github_mark.png" alt="github link" width="24"></a>
                </div>
            </div>
            <div class="row">
                <div class="col-6 left-padding">
                    <span class="small text-gray"><i class="fa fa-clock-o mr-1"></i>{{project.date}}</span>
                </div>
                <p class="col-6 text-right right-padding">
                    <MyTechnology v-for="technology in project.technologies" v-bind:key="technology" v-bind:technology="technology" />
                </p>
            </div>
        </div>

        <div :id="project.id+'collapse'" v-bind:class="{ 'collapse': true,  'show': canShow }" :aria-labelledby="project.id+'heading'">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h6 class="card-subtitle mb-2" v-if="!project.video && !project.images">Description</h6>
                        <ul class="nav nav-tabs" v-else :id="project.id + 'Tab'" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" :id="project.id+'-text-tab'" data-toggle="tab" :href="'#'+project.id+'-text'" role="tab" :aria-controls="project.id+'-text'" aria-selected="true">
                                    Description
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" :id="project.id+'-video-tab'" v-if="project.video" data-toggle="tab" :href="'#'+project.id+'-video'" role="tab" :aria-controls="project.id+'-video'" aria-selected="false">Video</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" :id="project.id+'-photo-tab'" v-if="project.images && project.images.length !== 0" data-toggle="tab" :href="'#'+project.id+'-photo'" role="tab" :aria-controls="project.id+'-photo'" aria-selected="false">Images</a>
                            </li>
                        </ul>

                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row tab-content" :id="project.id+'Tabcontent'">
                            <MyCardTabText :project="project" />
                            <MyCardTabVideo v-if="project.video" :project="project" />
                            <MyCardTabPictures v-if="project.images && project.images.length !== 0" :project="project" />
                        </div>
                    </div>
                </div>
            </div>
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
    useStore
} from '../../store';

import {
    Project
} from "@/helpers/interfaces";

import MyCardTabPictures from "@/components/TimelinePage/MyCardTabPictures.vue";
import MyCardTabVideo from "@/components/TimelinePage/MyCardTabVideo.vue";
import MyCardTabText from "@/components/TimelinePage/MyCardTabText.vue";
import MyTechnology from "@/components/TimelinePage/MyTechnology.vue";

export default defineComponent({

    setup() {
        const store = useStore();
        const state = ref(store.state);

        return {
            state
        };
    },
    components: {
        MyTechnology,
        MyCardTabText,
        MyCardTabPictures,
        MyCardTabVideo
    },
    props: {
        project: {
            type: Object as() => Project,
            required: true
        },
    },
    computed: {
        canShow(): boolean {
            return this.project.technologies.some(x => this.state.selectedTechnologies.includes(x));
        }
    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.right-padding {
    padding-right: 30px;
}

.left-padding {
    padding-left: 30px;
}
</style>
