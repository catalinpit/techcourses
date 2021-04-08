import axios from 'axios'

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const allCourses = {
  query: `
    query GetCourses {
      allCourses {
        id
        name
        description
        releaseDate
        author
        comments {
          name
          author {
            username
          }
        }
        tags {
          name
        }
      }
    }
  `,
  variables: {},
}

const specificCourse = {
  query: `
    query GetCourse {
      Course(where: {id: "606aaf77ac23d3017815d07b"}) {
        id
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
    return apiClient.post('/api', allCourses, options)
  },
  getCourse() {
    return apiClient.post('/api', specificCourse, options)
  },
}
