import {TopPageComponentProps} from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";

import {
    Advantages,
    HhData,
    Htag,
    P,
    Product,
    Sort,
    Tag,
} from "../../components";
import {TopLevelCategory} from "../../interfaces/page.interface";
import {SortEnum} from "../../components/Sort/Sort.props";
import {useEffect, useReducer} from "react";
import {sortReducer} from "./sort.reducer";
import {useReducedMotion} from "framer-motion";

export const TopPageComponent = ({
                                     page,
                                     products,
                                     firstCategory,
                                 }: TopPageComponentProps): JSX.Element => {
    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(
        sortReducer,
        {sort: SortEnum.Rating, products}
    );

    const shouldReduceMotion = useReducedMotion();

    const setSort = (sort: SortEnum) => {
        dispatchSort({type: sort});
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products});
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {sortedProducts && (
                    <Tag color="grey" size="medium" aria-label={sortedProducts.length + ' элементов'}>
                        {sortedProducts.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div role='list'>
                {sortedProducts &&
                    sortedProducts.map((p) => <Product role='listitem' key={p._id} product={p} layout={!shouldReduceMotion} />)}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red" size="medium">
                    hh.ru
                </Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && page.hh && (
                <HhData {...page.hh} />
            )}

            {page.advantages && page.advantages.length > 0 && (
                <>
                    <Htag tag="h2">Преимущества</Htag>
                    <Advantages advantages={page.advantages}/>
                </>
            )}
            {page.seoText && (
                <div
                    className={styles.seo}
                    dangerouslySetInnerHTML={{__html: page.seoText}}
                />
            )}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map((t) => (
                <Tag key={t} color="primary">
                    {t}
                </Tag>
            ))}
        </div>
    );
};
