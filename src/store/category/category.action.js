import { createAction } from "../../utils/reducer/reducer.utils";
import CATEGORY_ACTION_TYPES from "./category.types";

export const setCategories = (categoriesArray) => {
    return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
}