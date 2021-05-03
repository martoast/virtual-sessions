<template>
  <v-row justify="space-around">
    <v-col cols="12">
      <v-chip-group>
        <v-chip :ripple="false" v-for="tag in tags" :key="tag">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    tags: ['Dubstep', 'Future Riddim'],
  }),
}
</script>
