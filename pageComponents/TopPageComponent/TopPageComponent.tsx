import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { HhData, Htag, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';

export const TopPageComponent = ({
    page,
    products,
    firstCategory,
}: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && (
                    <Tag color="grey" size="medium">
                        {products.length}
                    </Tag>
                )}
                <span>Сортировка</span>
            </div>
            <div>
                {products &&
                    products.map(p => <div key={p._id}>{p.title}</div>)}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red" size="medium">
                    hh.ru
                </Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && (
                <HhData {...page.hh} />
            )}

            <div>
                <Htag tag="h2">Преимущества</Htag>
                <div className={styles.advantages}>
                    <div>
                        <Htag tag="h3">Мобильность специалиста</Htag>
                        <div className={styles.advantageDescription}>
                            Выше указаны программы Adobe InDesign, Adobe
                            Illustrator, Corel Draw и ими можно успешно
                            пользоваться дома или в дороге. Современные ноутбуки
                            хорошо справляются с нагрузкой, так зачем загонять
                            специалиста в душный офис. В этой профессии важным
                            считается вдохновение, поэтому дизайнеры ищут его в
                            разных местах.
                        </div>
                    </div>
                    <div>
                        <Htag tag="h3">Индивидуальный график работы</Htag>
                        <div className={styles.advantageDescription}>
                            Если освоить программы и найти заказы по
                            графическому дизайну, вскоре окажется, что вставать
                            в 6:00 вовсе не обязательно. Когда у человека
                            вечером продуктивность выше, надо этим пользоваться.
                        </div>
                    </div>
                    <div>
                        <Htag tag="h3">Индивидуальный график работы</Htag>
                        <div className={styles.advantageDescription}>
                            Прохождения собеседований в крупные компании могут
                            принести свои плоды. В случае с профессией
                            графического дизайна вполне возможна работа на рынке
                            фриланса. Специалист сам выбирает регион, с кем
                            работать и сколько работать. В связи с этим
                            получится точно контролировать доход в большую или
                            меньшую сторону.
                        </div>
                    </div>
                    <div>
                        <Htag tag="h3">Выбор работы</Htag>
                        <div className={styles.advantageDescription}>
                            Пользователи сети, которые знают Photoshop, не
                            обязательно должны выполнять одну работу. Профессия
                            графического дизайнера дает возможность отойти от
                            обычных проектов и повысить скил в других
                            компьютерных программах.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
