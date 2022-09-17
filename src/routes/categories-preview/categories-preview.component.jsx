import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";

import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    // const { categoriesMap } = useContext(CategoriesContext);
    // console.log(Object.keys(categoriesMap));
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
    <Fragment>
        { isLoading ? ( <Spinner /> ) :
           ( Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                );
            }))
        }
    </Fragment>
    );
};

export default CategoriesPreview;

