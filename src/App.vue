<template>
<div class="container py-5">
    <div class="row">
        <div class="col text-center">
            <h1 class="bd-title">Portfolio - Štěpán Martínek</h1>
            <p class="bd-lead">For my professional experience and contact info please refer to my <a href="https://www.linkedin.com/in/stepan-martinek/" target="_blank"><img height="17" alt="linkedin" src="@/assets/LI-Logo.png"></a>profile</p>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-7 mx-auto">
            <div class="d-flex justify-content-center" v-if="state.loadingState !== 'LOADED'">
                <div class="spinner-border" role="status" v-if="state.loadingState === 'LOADING'">
                    <span class="sr-only">Loading...</span>
                </div>
                <span v-else>{{"Loading error: "+state.loadingError}}</span>
            </div>
            <router-view v-else />
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from "vue";
import {
    ActionTypes,
    useStore
} from './store';

export default defineComponent({
    setup() {
        const store = useStore();
        store.dispatch(ActionTypes.LOAD_PROJECTS, undefined);
        const state = ref(store.state);

        return {
            state
        };
    }
});
</script>

<style>
body {
    background-color: whitesmoke;
}
</style>
