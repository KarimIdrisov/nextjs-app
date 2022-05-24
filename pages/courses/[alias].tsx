import {
    GetStaticPathsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from 'next';
import { useState } from 'react';
import { Button, Htag, Rating, Tag } from '../../components';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopPageModel } from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';

function Course({ menu }: CourseProps): JSX.Element {
    const [rating, setRating] = useState<number>(4);

    return <></>;
}

export default withLayout(Course);

export const getStaticProps: GetStaticProps<CourseProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        { firstCategory }
    );

    const { data: page } = await axios.post<TopPageModel[]>(
        process.env.NEXT_PUBLIC_DOMAIN +
            '/api/top-page/byAlias/' +
            params.alias,
        { firstCategory }
    );

    return {
        props: {
            menu,
            firstCategory,
            page,
        },
    };
};

interface CourseProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
