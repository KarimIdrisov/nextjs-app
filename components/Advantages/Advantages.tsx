import styles from './Advantages.module.css';
import cn from 'classnames';
import { AdvantagesProps } from './Advantages.props';
import AdvantageIcon from './advantage.svg';

export const Advantages = ({
    advantages
}: AdvantagesProps): JSX.Element => {
    return (
        <>
            {advantages.map(a => (
                <div key={a._id} className={styles.advantage}>
                    <AdvantageIcon />
                    <div className={styles.title}>
                        {a.title}
                    </div>
                    <hr className={styles.vline} />
                    <div>
                        {a.description}
                    </div>
                </div>
            ))}
        </>
    );
};
