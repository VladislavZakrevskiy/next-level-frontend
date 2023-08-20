import { cn } from 'shared/lib/classNames'
import {
    ChangeEvent,
    EventHandler,
    FC,
    InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react'
import classes from './Input.module.scss'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>

interface Props extends HTMLInputProps {
    className?: string
    value?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
}

export const Input: FC<Props> = memo((props) => {
    const {
        className,
        value,
        onChange,
        type,
        placeholder,
        autoFocus,
        ...otherProps
    } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [caretPos, setCaretPos] = useState(0)

    const onBlur = () => {
        setIsFocused(false)
    }

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true)
            inputRef.current?.focus()
        }
    }, [autoFocus])

    const onFocus = () => {
        setIsFocused(true)
    }

    const onSelect = (e: any) => {
        setCaretPos(e?.target?.selectionStart || 0)
    }

    const onChangeHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        onChange?.(e.target.value)
        setCaretPos(e.target.value.length)
    }

    return (
        <div
            className={cn(classes.InputWrapper, {}, [
                className,
            ])}
        >
            {placeholder && (
                <div className={cn(classes.placeholder)}>
                    {placeholder + '>'}
                </div>
            )}
            <div className={classes.caretWrapper}>
                <input
                    type={type}
                    onChange={onChangeHandler}
                    value={value}
                    className={cn(classes.Input)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    ref={inputRef}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={classes.caret}
                        style={{
                            left: `${caretPos * 9}px`,
                        }}
                    />
                )}
            </div>
        </div>
    )
})
