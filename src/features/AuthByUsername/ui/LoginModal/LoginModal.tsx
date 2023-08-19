import { cn } from 'shared/lib/classNames';
import { FC, Suspense } from 'react';
import { Modal } from 'shared/ui/Modal';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';
import { Loader } from 'shared/ui/Loader';

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
            lazy
        >
            <Suspense fallback={<Loader/>}>
                <LoginFormLazy onSuccess={onClose}/>
            </Suspense>
        </Modal>
    )
}