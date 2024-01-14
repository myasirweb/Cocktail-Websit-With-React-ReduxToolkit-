import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCocktails = createAsyncThunk('cocktails/fetchCocktails', async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s');
    const data = await response.json();
    return data.drinks;
});

export const fetchSingleCocktails = createAsyncThunk(
    "cocktails/fetchSignleCocktails",
    async ({ id }) => {
      return fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      ).then((res) => res.json());
    }
  );
  export const fetchSearchCocktails = createAsyncThunk(
    "cocktails/fetchSearchCocktails",
    async ({ searchText }) => {
      return fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
      ).then((res) => res.json());
    }
  );

const cocktailSlice = createSlice({
    name: 'cocktails',
    initialState: {
        loading: false,
        cocktails: [],
        error: null,
        cocktail: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCocktails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCocktails.fulfilled, (state, action) => {
                state.loading = false;
                state.cocktails = action.payload;
            })
            .addCase(fetchCocktails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

            builder
            .addCase(fetchSingleCocktails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleCocktails.fulfilled, (state, action) => {
                state.loading = false;
                state.cocktails = action.payload;
            })
            .addCase(fetchSingleCocktails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

            builder
            .addCase(fetchSearchCocktails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchCocktails.fulfilled, (state, action) => {
                state.loading = false;
                state.cocktails = action.payload;
            })
            .addCase(fetchSearchCocktails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cocktailSlice.reducer;
