<template>
  <div class="main">
    <h1>Courses</h1>

    <div class="courses">
      <CourseCard
        v-for="(course, index) in courses"
        :key="index"
        :course="course"
        :data-index="index"
      />
    </div>
  </div>
</template>

<script>
import CourseCard from '@/components/CourseCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CourseCard,
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('courses/fetchCourses')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch the courses at this time. Please try again.',
      })
    }
  },
  computed: mapState({
    courses: (state) => state.courses.courses.data.allCourses,
  }),
}
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;
}

.courses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-auto-flow: row;
  grid-gap: 10px;
  justify-items: center;
}
</style>
