import { ref, watch, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export function useCharacters() {
  const characters = ref([]);
  const page = ref(0);
  const filter = ref(null);

  const CHARACTERS_QUERY = gql`
    query getCharacters($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          count
        }
        results {
          id
          name
          image
          status
          species
          origin {
            name
          }
        }
      }
    }
  `

  const { result, fetchMore } = useQuery(CHARACTERS_QUERY, () => ({
    page: page.value,
    filter: filter.value
  }));

  const isSearchCompleted = computed(() => characters.value.length === result.value?.characters?.info?.count);

  watch(result, (value) => {
    if(!value) return;

    characters.value = [
      ...characters.value,
      ...value.characters.results
    ];
  });


  function fetchNextPage() {
    if(isSearchCompleted.value) return;

    page.value += 1;
    
    fetchMore({
      variables: {
        page: page.value
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const _previousResult = previousResult?.characters?.results ?? [];

        return {
          characters: {
            info: fetchMoreResult.characters.info,
            __typename: "Characters",
            results: [
              ..._previousResult,
              ...fetchMoreResult.characters.results,
            ]
          }
        }
      },

    });
  }

  function filterByName(name) {
    characters.value = [];
    page.value = 1;

    filter.value = { name };
  }

  return {
    characters: computed(() => characters.value),
    isSearchCompleted,
    fetchNextPage,
    filterByName
  }
}

export function useCharacter(characterId) {
  const CHARACTER_BY_ID_QUERY = gql`
    query getCharacterById($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        species
        origin {
          name
        }
        episode {
          id
          name
          episode
          air_date
        }
      }
    }
  `;

  const { result } = useQuery(CHARACTER_BY_ID_QUERY, {
    id: characterId,
  });

  return {
    character: computed(() => result?.value?.character)
  };
}
