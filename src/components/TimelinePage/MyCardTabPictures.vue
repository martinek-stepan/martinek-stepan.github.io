<template>
<div class="tab-pane fade" :id="project.id+'-photo'" role="tabpanel" :aria-labelledby="project.id+'-photo'">
    <div :id="project.id+'-photoCarouselIndicators'" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li v-for="(item, index) in project.images" :key="index" :data-target="'#'+project.id+'-photoCarouselIndicators'" :data-slide-to="index" :class="index === 0 ? 'active' : ''"></li>
        </ol>
        <div class="carousel-inner">
            <div v-for="(item, index) in project.images" :key="index" :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
                <img class="d-block w-100" :src="item.url" :height="item.height || false" :alt="'Slide: '+index+1">
                <div v-if="item.caption" class="carousel-caption d-none d-md-block">{{item.caption}}</div>
            </div>
        </div>
        <a class="carousel-control-prev" :href="'#'+project.id+'-photoCarouselIndicators'" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" :href="'#'+project.id+'-photoCarouselIndicators'" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
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
img {
    object-fit: contain;
    background-color: gray;
}

.carousel-indicators {
    position: absolute;
    bottom: 15%;

    text-align: center;
    list-style: none;
}

.carousel-caption {
    position: relative;
    left: auto;
    right: auto;
    color: black;
}
</style>
