<template>
  <div class="main">
    <h1>Courses</h1>

    <div class="courses">
      <CourseCard
        v-for="(course, index) in courses"
        :key="index"
        :course="course"
        :data-index="index"
        class="courseCard"
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
}

.courses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-auto-flow: row;
  grid-gap: 0px 50px;
  justify-items: center;
  margin: 2.5rem;
}

.courseCard {
  width: 100%;
  padding: 1.75rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 0.5rem;
}

.courseCard:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 1024px) {
  .courses {
    display: flex;
    flex-direction: column;
    margin: 2.5rem;
  }
}
</style>
