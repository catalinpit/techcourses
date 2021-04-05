<template>
  <div class="container"></div>
</template>

<script>
export default {
  asyncData({ $axios, error }) {
    const body = {
      query: `
        query GetCourses {
          allCourses {
              name
              description
              releaseDate
              author
              comments {
                id
              }
          }
        }
      `,
      variables: {},
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    return $axios
      .post('http://localhost:3000/admin/api', body, options)
      .then((response) => {
        return {
          events: response.data,
        }
      })
      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to fetch events at this time. Please try again.',
        })
      })
  },
}
</script>

<style></style>
