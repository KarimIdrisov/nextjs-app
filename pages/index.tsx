import { Button, Htag, Tag } from "../components";

export default function Home(): JSX.Element {

  return (
    <>
			<Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow="right">Кнопка</Button>
			<Button appearance='ghost' arrow="down">Кнопка</Button>
      <Tag size='small'>test</Tag>
      <Tag color='red'>test</Tag>
      <Tag color='primary'>test</Tag>
      <Tag color='green'>test</Tag>
		</>
  );
}
