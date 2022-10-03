import { TopLevelCategory } from './../interfaces/page.interface';
import { IFirstLevelMenuItem } from './../interfaces/menu.interface';
import CoursesIcon from '../layout/Menu/icons/courses.svg';
import ServicesIcon from '../layout/Menu/icons/services.svg';
import BooksIcon from '../layout/Menu/icons/books.svg';
import ProductsIcon from '../layout/Menu/icons/products.svg';

export const firstLevelMenu: IFirstLevelMenuItem[] = [
    
];

export const priceRu = (price: number): string =>
    price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .concat(' ₽');

export const decOfNum = (
    number: number,
    titles: [string, string, string]
): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
};
