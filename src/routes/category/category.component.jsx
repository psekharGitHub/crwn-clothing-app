import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    
    // intially categoriesMap will be empty
    const { categoriesMap } = useContext(CategoriesContext);
    
    // set starting state of products to current state of categoriesMap, so that if categoriesMap is
    // empty, the ProductCard component won't render. We have added a filter there.
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category,categoriesMap]);

    //Render products iff products array is not empty
    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                { products &&
                    products.map((product) =>
                        <ProductCard key={product.id} product={product} />
                    )
                }
            </div>
        </Fragment>
    );
}

export default Category;