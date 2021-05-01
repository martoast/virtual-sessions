export const state = () => ({
  teacher: {},
})

export const mutations = {
  teacher(state, teacher) {
    state.teacher = teacher
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
    await this.$axios.get('users/me').then((res) => {
      commit('teacher', res.data.data)
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
  teacher: (state) => state.teacher,
}
