import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, Input, Rating, Tag, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4);

    return (
        <>
            <Htag tag="h1">Текст</Htag>
            <Button appearance="primary" arrow="right">
                Кнопка
            </Button>
            <Button appearance="ghost" arrow="down">
                Кнопка
            </Button>
            <Tag size="small">test</Tag>
            <Tag color="red">test</Tag>
            <Tag color="primary">test</Tag>
            <Tag color="green">test</Tag>
            <Rating isEditable rating={rating} setRating={setRating} />
            <ul>
                {menu.map(m => (
                    <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
                ))}
            </ul>

            <Input />
            <Textarea placeholder="текст отзывы" />
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
        { firstCategory }
    );

    return {
        props: {
            menu,
            firstCategory,
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
