import { useState } from 'react';
import { Button, Htag, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';

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
        </>
    );
}

export default withLayout(Home);
