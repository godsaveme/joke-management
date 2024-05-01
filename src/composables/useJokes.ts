import type { Joke } from "@/interfaces/joke";
import { useJokeStore } from "@/stores/jokeStore"
import { storeToRefs } from "pinia";

export const useJokes = () => {
  const jokeStore = useJokeStore();

  const { jokeArr, infoPagination, joke, fieldSorting, orderSorting } = storeToRefs(jokeStore);

  const { fetchJokes, jokesPagination, ratingUpdate, createJoke } = jokeStore;

  const handlePageChange = (page: number) => {
    jokesPagination(page, infoPagination.value.limit, fieldSorting.value, orderSorting.value);
  }

  const handlepageSizeChange = (event: Event) => {
    const limit = (event.target as HTMLInputElement)?.value;
    jokesPagination(infoPagination.value.page, +limit, fieldSorting.value, orderSorting.value);
  }

  const ratingChange = (newValue: number, row: Joke) => {
    ratingUpdate(row.id, newValue)
    if(joke.value) jokesPagination(infoPagination.value.page, infoPagination.value.limit, fieldSorting.value, orderSorting.value);
  }

  const sortedExecuted = (field: string, order: string) => {
    jokesPagination(infoPagination.value.page, infoPagination.value.limit, field, order);
    fieldSorting.value = field;
    orderSorting.value = order;
   }

   const resetSorted = () => {
    jokesPagination(infoPagination.value.page, infoPagination.value.limit);
    fieldSorting.value = '';
    orderSorting.value = '';
   }

  return {
    // Properties
    joke,
    jokeArr,
    infoPagination,

    //Methods
    fetchJokes,
    jokesPagination,
    ratingUpdate,
    createJoke,

    handlePageChange,
    handlepageSizeChange,
    ratingChange,
    sortedExecuted,
    resetSorted,
  }
}