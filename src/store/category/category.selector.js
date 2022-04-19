import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer], // input selectors
    (categoriesSlice) => categoriesSlice.categories // output selectors
    /* 
    The only time this will run (thus causing re-render) is if 
    the object coming from selectCategoryReducer (categoriesSlice) is different
    So as long as state.categories doesn't update - don't case re-render
    */
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((accumulator, category) => {
        const { title, items } = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {}))

