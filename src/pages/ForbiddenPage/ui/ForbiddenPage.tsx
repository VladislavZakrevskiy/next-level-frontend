import { cn } from '@/shared/lib/classNames'
import { FC } from 'react'
import { Page } from '@/widgets/Page'
import { useTranslation } from 'react-i18next'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

interface Props {
    className?: string
}

export const ForbiddenPage: FC<Props> = ({ className }) => {
    const { t } = useTranslation()

    return (
        <Page data-testid='ForbiddenPage'
            className={cn('', {}, [
                className,
            ])}
        >
            <HStack max justify="center" align="center">
                <Text
                    title={t(
                        'У вас нет доступа к этой странице'
                    )}
                />
            </HStack>
        </Page>
    )
}
