import styles from "./ReviewForm.module.css";
import cn from "classnames";
import {ReviewFormProps} from "./ReviewForm.props";
import CloseIcon from "./close.svg";

import {Rating} from "../Rating/Rating";
import {Input} from "../Input/Input";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import {useForm, Controller} from "react-hook-form";
import {IReviewForm} from "./ReviewForm.interface";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {

    const {register, control, handleSubmit, formState: {errors}} = useForm<IReviewForm>();

    const onSubmit = (data: IReviewForm) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register('name', {required: {value: true, message: 'Заполните имя'}})}
                    placeholder='Имя'
                    error={errors.name}
                />
                <Input
                    {...register('title', {required: {value: true, message: 'Заполните заголовок'}})}
                    className={styles.title}
                    placeholder='Заголовок отзыва'
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        rules={{required: {value: true, message: 'Укажите рейтинг'}}}
                        render={
                        ({field}) => (
                            <Rating rating={field.value} ref={field.ref} isEditable setRating={field.onChange} error={errors.rating}/>
                        )
                    } name='rating'/>

                </div>
                <Textarea
                    {...register('description', {required: {value: true, message: 'Заполните описание'}})}
                    className={styles.description}
                    placeholder='Текст отзыва'
                    error={errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance='primary'>Отправить</Button>
                    <span className={styles.info}>
                    * Перед публикацией отзыв пройдет предварительную модерацию и проверку
                </span>
                </div>
            </div>
            <div className={styles.success}>
                <div className={styles.successTitle}>
                    Ваш отзыв отправлен
                </div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <CloseIcon className={styles.close}/>
            </div>
        </form>
    );
};
