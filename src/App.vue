<template>

  <div class="container py-5">
    <div class="row">
      <div class="col text-center">
        <h1 class="bd-title">Portfolio - Štěpán Martínek</h1>
        <p class="bd-lead">For my professional experience and contact info please refer to my <a href="https://www.linkedin.com/in/stepan-martinek/" target="_blank" ><img height="17" alt="linkedin" src="@/assets/LI-Logo.png"></a>profile</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-7 mx-auto">
        <MyTimeline></MyTimeline>
      </div>
    </div>
  </div>
</template>

<script>
import MyTimeline from "@/components/MyTimeline";

export default {
  name: 'App',
  components: {
    MyTimeline,
  },
}
</script>

<style>
  body{
    background-color: whitesmoke;
  }
</style>
