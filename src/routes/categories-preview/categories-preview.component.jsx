import { useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/category/category.selector';
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { Fragment } from "react";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {isLoading ?
                (<Spinner />)
                :
                (<div>
                    {Object.keys(categoriesMap).map((title) => {
                        const products = categoriesMap[title];
                        return (
                            <CategoryPreview key={title} title={title} products={products} />
                        );
                    })}
                </div>)}
        </Fragment>


    )
}

export default CategoriesPreview;