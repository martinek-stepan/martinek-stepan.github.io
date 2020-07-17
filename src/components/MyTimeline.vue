<template>
  <div>
    <ul class="timeline">
      <MyTimelineItem v-for="project in projects" :key="project.title" :project="project"></MyTimelineItem>
    </ul>
    <MyFloatingCard :projects="projects"></MyFloatingCard>
  </div>
</template>

<script>
import projectsData from '../json/data.json'
import MyTimelineItem from "@/components/MyTimelineItem";
import MyFloatingCard from "@/components/MyFloatingCard";
export default {
  components: {
    MyFloatingCard,
    MyTimelineItem
  },
  computed: {
    projects: function () {
      projectsData.sort(function(a,b){
        var aParts = a.date.split("/");
        var bParts = b.date.split("/");
        if (aParts[1] > bParts[1])
        {
          return -1;
        }
        else if (aParts[1] < bParts[1])
        {
          return 1;
        }
        else if (aParts[0] > bParts[0])
        {
          return -1;
        }
        else if (aParts[0] < bParts[0])
        {
          return 1;
        }
        else
        {
          return 0;
        }
      });
      return projectsData;
    }
  }

}
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
