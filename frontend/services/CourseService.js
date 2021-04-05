import axios from 'axios'

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
}

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

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/admin',
  withCredentials: false,
})

export default {
  getCourses() {
    return apiClient.post('/api', body, options)
  },
}
