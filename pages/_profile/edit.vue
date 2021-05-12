<template>
  <div>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Registration successful!</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>

    <h2 class="title">My Profile</h2>
    <div class="content">
      <p>
        <strong>Username:</strong>
        {{ loggedInUser.username }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ loggedInUser.email }}
      </p>
      <p>
        <strong>Is authenticated: {{ isAuthenticated }}</strong>
      </p>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.soundcloud_url"
                color="purple darken-2"
                required
              >
                <template v-slot:label>
                  <div>soundcloud_url <small>(optional)</small></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.spotify_url"
                color="blue darken-2"
                label="spotify_url"
                required
              >
                <template v-slot:label>
                  <div>spotify_url <small>(optional)</small></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="form.bio" color="teal" rows="2">
                <template v-slot:label>
                  <div>Bio <small>(optional)</small></div>
                </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="form.selected_genres"
                :rules="rules.selected_genres"
                :items="genres"
                label="Select genres"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span v-if="index === 1" class="grey--text caption">
                    (+{{ form.selected_genres.length - 1 }} others)
                  </span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.hourly_rate"
                :rules="rules.hourly_rate"
                label="Amount"
                prefix="$"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <p>
                <strong>Available work days:</strong>
              </p>

              <v-select
                v-model="form.available_days"
                :rules="rules.available_days"
                :items="workdays"
                label="Select workdays"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span v-if="index === 1" class="grey--text caption">
                    (+{{ form.available_days.length - 1 }} others)
                  </span>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <p>
                <strong>Available work time:</strong>
              </p>
              <v-row justify="space-around" align="center">
                <v-col style="width: 350px; flex: 0 1 auto">
                  <h2>Start:</h2>
                  <v-dialog
                    ref="dialog"
                    v-model="modal2"
                    :return-value.sync="form.start"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        required
                        v-model="form.start"
                        label="Picker in dialog"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="modal2"
                      full-width
                      v-model="form.start"
                      :max="form.end"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(form.start)"
                      >
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>
                <v-col style="width: 350px; flex: 0 1 auto">
                  <h2>End:</h2>
                  <v-dialog
                    ref="dialog2"
                    v-model="modal1"
                    :return-value.sync="form.end"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        required
                        v-model="form.end"
                        label="Picker in dialog"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="modal1"
                      full-width
                      v-model="form.end"
                      :min="form.start"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal1 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog2.save(form.end)"
                      >
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-checkbox v-model="form.terms" color="green">
                <template v-slot:label>
                  <div @click.stop="">
                    Do you accept the
                    <a href="#" @click.prevent="terms = true">terms</a>
                    and
                    <a href="#" @click.prevent="conditions = true"
                      >conditions?</a
                    >
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text @click="resetForm"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" text color="primary" type="submit">
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title"> Terms </v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="terms = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title"> Conditions </v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="conditions = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  mounted() {
    this.$axios
      .get('http://localhost:1337/instructors/' + this.loggedInUser.username)
      .then((response) => {
        console.log(response)
      })
  },
  data() {
    const defaultForm = Object.freeze({
      soundcloud_url: '',
      spotify_url: '',
      bio: '',
      selected_genres: [],
      hourly_rate: null,
      available_days: [],
      terms: false,
      start: '',
      end: '',
    })

    return {
      start: null,
      end: null,
      form: Object.assign({}, defaultForm),
      rules: {
        hourly_rate: [(val) => val > 10 || `I don't believe you!`],
        selected_genres: [
          (val) => (val || '').length > 0 || 'This field is required',
        ],
        selected_genres: [
          (val) => (val || '').length > 0 || 'This field is required',
        ],
        available_days: [
          (val) => (val || '').length > 0 || 'This field is required',
        ],
      },
      genres: [
        'House',
        'Basshouse',
        'Dubstep',
        'Drum&Bass',
        'Garhourly_rate',
        'Techno',
      ],
      workdays: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      conditions: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
      snackbar: false,
      terms: false,
      defaultForm,
      modal2: false,
      modal1: false,
    }
  },

  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),

    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    formIsValid() {
      return (
        this.form.soundcloud_url &&
        this.form.spotify_url &&
        this.form.selected_genres &&
        this.form.terms
      )
    },
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
    submit() {
      this.snackbar = true
      try {
        let _form = JSON.stringify({
          ...this.form,
          hourly_rate: parseFloat(this.form.hourly_rate),
        })

        this.$axios
          .post('http://localhost:1337/instructors/', {
            form: _form,
            username: this.loggedInUser.username,
          })
          .then((response) => {
            console.log(response)
          })

        this.resetForm()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
