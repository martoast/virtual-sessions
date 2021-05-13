<template>
  <v-row justify="space-around">
    <v-col cols="12">
      <v-chip-group>
        <v-chip
          :ripple="false"
          v-for="genre in instructor.selected_genres"
          :key="genre"
        >
          {{ genre }}
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['instructor'],
}
</script>
