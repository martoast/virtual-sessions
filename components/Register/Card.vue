<template>
  <v-card class="mx-auto" max-width="500">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card @click="$router.push(card.route)">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    cards: [
      {
        title: 'Teacher',
        route: '/register/teacher',
        slug: 'teacher',
        src:
          'https://www.careersinmusic.com/wp-content/uploads/2021/01/music-producer.jpg',
        flex: 12,
      },
      {
        title: 'Student',
        route: '/register/student',
        slug: 'student',
        src: 'https://www.dasignerevents.com/static/sitefiles/images/9.2.jpg',
        flex: 12,
      },
    ],
  }),
}
</script>
