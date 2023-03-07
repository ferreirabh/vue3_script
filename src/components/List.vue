<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router'
import { Button, Card, CellGroup, Field, List, Tag } from 'vant';

import { useCharacters } from '../composables/characters';

const isLoading = ref(false);
const isFinished = ref(false);
const nameFilter = ref(null);

const { characters, isSearchCompleted, fetchNextPage, filterByName: _filterByName } = useCharacters();

watch(characters, (value) => {
  if (Array.isArray(value))

    isLoading.value = false;
});

function filterByName() {
  _filterByName(nameFilter.value)
}
</script>

<template>
  <CellGroup inset class="space-bottom">
    <Field v-model="nameFilter" label="Name:">
      <template #button>
        <Button size="small" color="#04AA6D" @click="filterByName">Search</Button>
      </template>
    </Field>
  </CellGroup>

  <list
    v-model:loading="isLoading"
    :finished="isFinished"
    :disabled="isSearchCompleted"
    loading-text="Loading..."
    @load=" () => fetchNextPage()"
  >
    <Card
      v-for="character in characters"
      :key="character.id"
      :title="character.name"
      :thumb="character.image"
      :desc="`Origin ${character.origin.name}`"
    >
      <template #tags>
        <Tag plain color="#04AA6D" class="space-right">{{ character.species }}</Tag>
        <Tag plain color="#04AA6D">{{ character.status }}</Tag>
      </template>

      <template #footer>
        <RouterLink :to="`/characters/${character.id}`">
          <Button size="mini" color="#04AA6D">See more</Button>
        </RouterLink>
      </template>
    </Card>
  </list>
</template>

<style scoped>
.space-bottom {
  margin-bottom: 8px;
}
.space-right {
  margin-right: 4px;
}
</style>