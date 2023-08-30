import { cn } from 'shared/lib/classNames'
import { FC, useCallback } from 'react'
import classes from './addCommentForm.module.scss'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    getCommentFormError,
    getCommentFormText,
} from '../../model/selectors/getFormComment'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
    AddCommentFormActions,
    AddCommentFormReducer,
} from 'features/addCommentForm/model/slice/addCommentFormSlice'
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from 'shared/ui/Stack'

interface Props {
    className?: string
    onSendComment: (text: string) => void
}

const reducers: ReducerList = {
    addCommentForm: AddCommentFormReducer,
}

const addCommentForm: FC<Props> = ({
    className,
    onSendComment,
}) => {
    const { t } = useTranslation()
    const text = useSelector(getCommentFormText) ?? ''
    const error = useSelector(getCommentFormError)
    const dispatch = useAppDispatch()

    const onChangeText = useCallback((value: string) => {
        dispatch(AddCommentFormActions.setText(value))
    }, [])

    const onCommentHandler  = useCallback(() => {
        onSendComment(text || '')
        onChangeText('')
    }, [onSendComment, text])

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <HStack justify='between'
                className={cn(classes.addCommentForm, {}, [
                    className,
                ])}
            >
                <Input
                    className={classes.input}
                    value={text}
                    onChange={onChangeText}
                    placeholder={t(
                        'Введите текст комментария'
                    )}
                />
                <Button onClick={onCommentHandler}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    )
}

export default addCommentForm
