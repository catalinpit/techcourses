<template>
  <div>
    <h1>{{ course.name }}</h1>
    - <i>{{ course.releaseDate }}</i>
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
