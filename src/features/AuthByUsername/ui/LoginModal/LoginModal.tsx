import { cn } from 'shared/lib/classNames';
import { FC } from 'react';
import classes from './LoginModal.module.scss'
import { Modal } from 'shared/ui/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface Props {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const LoginModal: FC<Props> = ({className, isOpen, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={cn('', {}, [className])}
        >
            <LoginForm/>
        </Modal>
    )
}