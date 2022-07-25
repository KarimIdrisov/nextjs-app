import styles from "./ReviewForm.module.css";
import cn from "classnames";
import {ReviewFormProps} from "./ReviewForm.props";
import CloseIcon from "./close.svg";

import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import {useForm, Controller} from "react-hook-form";
import {IReviewForm, IReviewSendResponse} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({
                               productId,
                               isOpened,
                               className,
                               ...props
                           }: ReviewFormProps): JSX.Element => {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        reset,
        clearErrors
    } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSendResponse>(
                API.review.createDemo,
                {...formData, productId}
            );
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError("Что-то пошло не так");
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register("name", {
                        required: {value: true, message: "Заполните имя"},
                    })}
                    placeholder="Имя"
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.name}
                />
                <Input
                    {...register("title", {
                        required: {value: true, message: "Заполните заголовок"},
                    })}
                    className={styles.title}
                    placeholder="Заголовок отзыва"
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        rules={{required: {value: true, message: "Укажите рейтинг"}}}
                        render={({field}) => (
                            <Rating
                                rating={field.value}
                                ref={field.ref}
                                isEditable
                                setRating={field.onChange}
                                error={errors.rating}
                            />
                        )}
                        name="rating"
                    />
                </div>
                <Textarea
                    {...register("description", {
                        required: {value: true, message: "Заполните описание"},
                    })}
                    className={styles.description}
                    placeholder="Текст отзыва"
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    aria-label='Текст отзыва'
                    aria-invalid={!!errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
                    <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
                </div>
            </div>
            {isSuccess && (
                <div className={styles.success} role='alert'>
                    <div className={styles.successTitle} >Ваш отзыв отправлен</div>
                    <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                    <button className={styles.close} onClick={() => setIsSuccess(false)} aria-label='Закрыть оповещение'>
                        <CloseIcon />
                    </button>
                </div>
            )}
            {error && (
                <div className={styles.error} role='alert'>
                    Что-то пошло не так. Попробуйте обновить страницу!
                    <button className={styles.close} onClick={() => setError(undefined)} aria-label='Закрыть оповещение'>
                        <CloseIcon />
                    </button>
                </div>
            )}
        </form>
    );
};
