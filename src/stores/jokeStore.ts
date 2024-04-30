import type { Joke, Pagination } from "@/interfaces/joke";
import { defineStore } from "pinia"

interface JokeState {
  jokeArr: Joke[];
  joke: Joke | undefined;
  infoPagination: Pagination;
  fieldSorting: string;
  orderSorting: string;
}

export const useJokeStore = defineStore('joke', {

  state: (): JokeState => ({
    jokeArr: [] as Joke[],
    joke: {} as Joke,
    infoPagination: {} as Pagination,
    fieldSorting: '',
    orderSorting: '',
  }),

  actions: {
    async fetchJokes(){
      const jokes = await fetch('http://localhost:3005/random_ten');
      this.jokeArr = await jokes.json();
    },

    async jokesPagination(page: number, limit: number, type?: string, order?: string){
      const jokes = await fetch(`http://localhost:3005/jokes?page=${page}&limit=${limit}&type=${type}&order=${order}`);
      const { total, jokesPageArr } = await jokes.json();
      this.jokeArr = jokesPageArr;
      this.infoPagination = { page, limit, total };
    },

    async ratingUpdate(id: number, rating: number) {
      const updatedJokeSuccessful = await fetch(`http://localhost:3005/joke/rating/update?id=${id}&rating=${rating}`);
      this.joke = await updatedJokeSuccessful.json();
    },

    async createJoke(joke: Joke){ 
      const jokeCreated = await fetch('http://localhost:3005/joke/create',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify({joke: joke}),
      });
      this.joke = await jokeCreated.json();
    }
  }
})
