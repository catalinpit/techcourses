<template>
  <div class="container">
    <h1>Courses</h1>

    <CourseCard
      v-for="(course, index) in courses"
      :key="index"
      :course="course"
      :data-index="index"
    />
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

<style></style>
