export const state = () => ({
  instructor: {},
  instructors: [],
})

export const mutations = {
  instructor(state, instructor) {
    state.instructor = instructor
  },
}

export const actions = {
  async get({ commit }, params) {
    if (params) {
      await this.$axios
        .get('/api/calculators/renders', {
          params: params,
        })
        .then((res) => {
          commit('renders', res.data)
        })
    } else {
      await this.$axios.get('/api/calculators/renders').then((res) => {
        commit('renders', res.data)
      })
    }
  },

  async find({ commit }, username) {
    console.log(username)
    await this.$axios
      .get('http://localhost:1337/instructors/' + username)
      .then((res) => {
        commit('instructor', JSON.parse(res.data.form))
      })
  },

  async create({ commit, state }, form) {
    await this.$axios
      .post('/api/calculators/renders', form)
      .then((res) => {
        commit('render', res.data.data)
      })
      .finally(() =>
        this.$router.push('/calculators/' + state.render.uid + '/edit/upload')
      )
  },

  async delete({ commit }, render) {
    await this.$axios.delete('/api/calculators/renders', render).then((res) => {
      commit('renders', res.data.data)
    })
  },
}

export const getters = {
  instructor: (state) => state.instructor,
}
