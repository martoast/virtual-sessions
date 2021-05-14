export const state = () => ({
  instructor: {},
  items: {
    data: [],
  },
})

export const mutations = {
  instructor(state, instructor) {
    state.instructor = instructor
  },
  instructors(state, form) {
    state.items.data.push(form)
  },
}

export const actions = {
  async get({ commit }, params) {
    console.log('mother bitvh')
    if (params) {
      await this.$axios
        .get('http://localhost:1337/instructors/', {
          params: params,
        })
        .then((res) => {
          commit('renders', res.data)
        })
    } else {
      await this.$axios
        .get('http://localhost:1337/instructors/')
        .then((res) => {
          res.data.forEach((v) => commit('instructors', JSON.parse(v.form)))
        })
    }
  },

  async find({ commit }, username) {
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
  items: (state) => state.items,
}
