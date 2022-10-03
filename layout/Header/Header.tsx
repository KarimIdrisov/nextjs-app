import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import Logo from '../logo.svg';
import cn from 'classnames';
import {ButtonIcon} from "../../components/ButtonIcon/ButtonIcon";
import { motion } from 'framer-motion';
import {Sidebar} from "../Sidebar/Sidebar";
import {useEffect, useState} from "react";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(false);
    }, []);

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20,
            }
        },
        closed: {
            opacity: 0,
            x: '100%',
        }
    };

    return (
        <header className={cn(className, styles.header)} {...props}>
            <Logo />
            <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpen(true)}/>
            <motion.div
                className={styles.mobileMenu}
                variants={variants}
                initial={'closed'}
                animate={isOpen ? 'opened' : 'closed'}
            >
                <Sidebar/>
                <ButtonIcon
                    className={styles.menuClose}
                    appearance='white'
                    icon='close'
                    onClick={() => setIsOpen(false)}
                />
            </motion.div>
        </header>
    );
};
