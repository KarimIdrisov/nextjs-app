import { useState } from 'react';
import { Button, Htag, Input, Rating, Tag, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';

function Home(): JSX.Element {
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

            <Input />
            <Textarea placeholder="текст отзывы" />
        </>
    );
}

export default withLayout(Home);

