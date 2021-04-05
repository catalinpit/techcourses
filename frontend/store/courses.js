import CourseService from '@/services/CourseService.js'

export const state = () => ({
  courses: [],
  course: {},
})

export const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses
  },
  SET_COURSE(state, course) {
    state.course = course
  },
}

export const actions = {
  fetchCourses({ commit }) {
    return CourseService.getCourses().then((res) => {
      commit('SET_COURSES', res.data)
    })
  },
  fetchCourse({ commit }, id) {
    return CourseService.getCourse(id).then((res) => {
      commit('SET_COURSE', res.data)
    })
  },
}
