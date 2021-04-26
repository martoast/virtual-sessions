<template>
  <div>
    <v-text-field
      v-model="search"
      label="Search producer"
      rounded
      dark
      flat
      solo-inverted
      hide-details
      clearable
      clear-icon="mdi-close-circle-outline"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: null,
    }
  },
}
</script>
