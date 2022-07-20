import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import Logo from '../logo.svg';
import cn from 'classnames';
import {ButtonIcon} from "../../components/ButtonIcon/ButtonIcon";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <header className={cn(className, styles.header)} {...props}>
            <Logo />
            <ButtonIcon appearance='white' icon='menu' />
        </header>
    );
};
