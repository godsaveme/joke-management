<script setup lang="ts">
import { useJokes } from '@/composables/useJokes';
import type { Joke } from '@/interfaces/joke';
import { useRouter } from 'vue-router';

const { createJoke } = useJokes();

const router = useRouter();

let joke: Joke = {
  id: 0,
  type: '',
  setup: '',
  punchline: '',
  rating: 0
}

const onCreateJoke = () => {
  createJoke(joke);
  router.push('/about')
}
</script>

<template>
  <section>
      <b-field label="Type">
        <b-select placeholder="Select a type" v-model="joke.type">
                <option>
                  general
                </option>
                <option>
                  knock-knock
                </option>
                <option>
                  programming
                </option>
        </b-select>
        <b-rate class="ml-5 control" v-model="joke.rating" custom-text="Rating"></b-rate>
      </b-field>

      <b-field label="Setup">
            <b-input type="textarea" v-model="joke.setup"></b-input>
        </b-field>
        
        <b-field label="Punchline">
            <b-input type="textarea" v-model="joke.punchline"></b-input>
        </b-field>

        <b-field >
            <p class="control">
                <b-button label="Cancel" class="mr-3" tag="router-link" to="/about" />
                <b-button label="Save joke" type="is-primary" @click="onCreateJoke"/>
            </p>
        </b-field>
      
  </section>
</template>