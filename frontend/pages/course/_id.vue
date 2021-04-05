<template>
  <div>
    <nuxt-link to="/">
      <h1>Courses</h1>
    </nuxt-link>

    <h1>{{ course.name }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('courses/fetchCourse', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'There is an issue with fetching the course ' + params.name,
      })
    }
  },
  computed: mapState({
    course: (state) => state.courses.course.data.Course,
  }),
}
</script>
