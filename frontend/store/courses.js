import CourseService from '@/services/CourseService.js'

export const state = () => ({
  courses: [],
})

export const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses
  },
}

export const actions = {
  fetchCourses({ commit }) {
    return CourseService.getCourses().then((res) => {
      commit('SET_COURSES', res.data)
    })
  },
}
