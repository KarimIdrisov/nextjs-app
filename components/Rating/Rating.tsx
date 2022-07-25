import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from 'react';
import StartIcon from './star.svg';

export const Rating = forwardRef(({
    isEditable = false,
    rating,
    setRating,
    tabIndex,
    error,
    ...props
}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
        new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
        if (!isEditable) {
            return -1;
        }

        if (!rating && i === 0) {
            return tabIndex ?? 0;
        }

        if (r === i + 1) {
            return tabIndex ?? 0;
        }

        return -1;
    };

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map(
            (r: JSX.Element, index: number) => {
                return (
                    <span
                        className={cn(styles.star, {
                            [styles.filled]: index < currentRating,
                            [styles.editable]: isEditable,
                        })}
                        onMouseEnter={() => changeDisplay(index + 1)}
                        onMouseLeave={() => changeDisplay(rating)}
                        onClick={() => onClick(index + 1)}
                        tabIndex={computeFocus(rating, index)}
                        onKeyDown={handleKey}
                        ref={r => ratingArrayRef.current?.push(r)}
                        role={isEditable ? 'slider' : ''}
                        aria-valuenow={rating}
                        aria-valuemax={5}
                        aria-valuemin={1}
                        aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating) }
                        aria-invalid={!!error}
                    >
                        <StartIcon />
                    </span>
                );
            }
        );
        setRatingArray(updatedArray);
    };

    const changeDisplay = (index: number) => {
        if (!isEditable) {
            return;
        }
        constructRating(index);
    };

    const onClick = (index: number) => {
        if (!isEditable || !setRating) {
            return;
        }

        setRating(index);
    };

    const handleKey = (key: KeyboardEvent) => {
        if (!isEditable || !setRating) {
            return;
        }


        if (key.code === 'ArrowRight' || key.code === 'ArrowUp') {
            if (!rating) {
                setRating(1);
            } else {
                key.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }

        if (key.code === 'ArrowLeft' || key.code === 'ArrowDown') {
            key.preventDefault();
            setRating(rating > 1 ? rating - 1 : 0);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    };

    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {[styles.error]: error})}>
            {ratingArray.map((rating, index) => {
                return <span key={index}>{rating}</span>;
            })}
            {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});
