<template>
  <div class="py-2">
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex" sm="6">
        <v-card>
          <v-img
            :src="card.img_src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    cards: [
      {
        title: 'Recent tracks',
        img_src:
          'https://i1.sndcdn.com/artworks-Cl7qw4DZybHxPhfe-at3kzw-t500x500.jpg',
        flex: 12,
      },
      {
        title: 'Upcoming Shows',
        img_src:
          'https://cdn.digitaldjtips.com/app/uploads/2017/10/19130622/Memorable-1204x642.jpg',
        flex: 12,
      },
    ],
  }),
}
</script>
