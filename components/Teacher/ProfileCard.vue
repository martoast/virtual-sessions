<template>
  <v-card max-width="434" tile>
    <v-img
      height="50%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row v-if="instructor">
        <v-col class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img
              src="https://i1.sndcdn.com/avatars-s4b2yyVQjR51Y7aB-f2qS0A-t500x500.jpg"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ instructor.username }}
              </v-list-item-title>
              <genre-chips></genre-chips>
              <v-rating
                v-model="rating"
                background-color="white"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
              ></v-rating>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>
<script>
import GenreChips from '~/components/Teacher/GenreChips'
export default {
  props: ['instructor'],
  components: {
    GenreChips,
  },
  data: () => ({
    rating: 4.3,
  }),
}
</script>
