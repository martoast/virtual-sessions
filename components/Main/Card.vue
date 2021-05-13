<template>
  <div>
    <v-row dense>
      <v-col v-for="(item, i) in instructors" :key="i" cols="12">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h6" v-text="item.name"></v-card-title>

              <v-card-subtitle
                >Rate: ${{ item.hourly_rate }}/hr</v-card-subtitle
              >

              <genre-chips :instructor="item"> </genre-chips>
              <v-card-actions>
                <v-btn class="ml-2 mt-5" :to="item.name" outlined rounded small>
                  Details
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.image_url"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import GenreChips from '~/components/Teacher/GenreChips'
export default {
  props: ['instructors'],
  components: {
    GenreChips,
  },
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        rate: 60,
        name: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        rate: 80,
        name: 'Ellie Goulding',
      },
    ],
  }),
}
</script>
