<script setup lang="ts">
import { useJokes } from '@/composables/useJokes';
import { LIMIT_INIT, PAGE_INIT } from '@/constants/general.constants';
import { ref } from 'vue';

const { 
  jokeArr,
  infoPagination,
  jokesPagination,
  handlePageChange,
  handlepageSizeChange,
  ratingChange,
  sortedExecuted,
  resetSorted,
} = useJokes();

const jokesTable = ref(null);

jokesPagination(PAGE_INIT, LIMIT_INIT);

//const columns = TABLE_CONFIG;

const resetSortedFromView = () => {
 (jokesTable.value as any)?.resetMultiSorting();
 resetSorted();
}

// constants 
const pageSize: number = LIMIT_INIT;
const backendSorting: boolean = true;

</script>

<template>
  <main v-if="jokeArr.length === 0">
    <div>
      Cargando datos...
    </div>
  </main>
  <main v-else>
    <b-field grouped position="is-right">
      <div class="">
        <b-button type="is-primary" tag="router-link" to="/create" >
          Create Joke
        </b-button>
      </div>
    </b-field>
    <div>
      <b-table ref="jokesTable" :data="jokeArr" @sort="sortedExecuted" :backend-sorting="backendSorting">
        <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column field="type" label="Type" v-slot="props" sortable>
          {{ props.row.type }}
        </b-table-column>
        <b-table-column field="setup" label="Setup" v-slot="props">
          {{ props.row.setup }}
        </b-table-column>
        <b-table-column field="punchline" label="Punchline" v-slot="props">
          {{ props.row.punchline }}
        </b-table-column>
        <b-table-column field="rating" label="Rating" v-slot="props" sortable>
          <b-rate v-model="props.row.rating" @change="(value: number) => ratingChange(value, props.row)"
            custom-text=""></b-rate>
        </b-table-column>
      </b-table>
    </div>
    <b-pagination :total="infoPagination.total" :per-page="infoPagination.limit" v-model="infoPagination.page"
      @change="handlePageChange" />
    <b-field grouped group-multiline label="Jokes per page">
      <b-select v-model="pageSize" @input="handlepageSizeChange">
        <option value=5>5</option>
        <option value=10>10</option>
        <option value=20>20</option>
      </b-select>
      <span class="button" @click="resetSortedFromView">Reset sorting</span>
    </b-field>

    <hr>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
