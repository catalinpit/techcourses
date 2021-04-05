<template>
  <div>
    <nuxt-link :to="'/course/' + course.id">
      <h1>{{ course.name }}</h1>
    </nuxt-link>
    <i>{{ course.releaseDate }}</i>
    <h4>{{ course.author }}</h4>
    <p>
      <b>{{ course.description }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    course: Object,
  },
}
</script>
