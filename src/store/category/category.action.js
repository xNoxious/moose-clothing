import { createAction } from "../../utils/reducer/reducer.utils";
import CATEGORY_ACTION_TYPES from "./category.types";
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

const fetchCategoriesStart = () => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);
};

const fetchCategoriesSuccess = (categoriesArray) => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
};

const fetchCategoriesFailure = (error) => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);
};

// function currying 
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailure(error));
    }

}