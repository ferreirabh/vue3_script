<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Cell, CellGroup, Collapse, CollapseItem, Field, Image, Space } from 'vant';

import { useCharacter } from '../composables/characters';

const route = useRoute();
const { character } = useCharacter(route.params.id);

const activeCollapse = ref(['']);

</script>

<template>
  <div style="display: flex; justify-content: center">
    <Image round :src="character?.image" />
  </div>
  <div style="margin-top: 8px;">
    <CellGroup inset>
      <Field readonly label="Name:"  v-model="character.name" />
      <Field readonly label="Status:"  v-model="character.status" />
      <Field readonly label="Species:"  v-model="character.species" />
      <Field readonly label="Origin:"  v-model="character.origin.name" />
      <Collapse v-model="activeCollapse">
        <CollapseItem
          title="Episodes"
          name="episodes"
        >
          <Cell
            v-for="episode in character?.episode"
            :key="episode.id"
            :title="episode.name"
            :value="episode.episode"
            :label="`Air date: ${episode.air_date}`"
          />
        </CollapseItem>
      </Collapse>
    </CellGroup>
  </div>
</template>
