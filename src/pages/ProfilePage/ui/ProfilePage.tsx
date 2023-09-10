import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { EditableProfileCard } from '@/features/EditableProfileCard'
import { useParams } from 'react-router-dom'

const ProfilePage = memo(() => {
    const { id } = useParams<{ id: string }>()

    return (
        <Page data-testid='profilePage'>
            <VStack max gap="16">
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    )
})

export default ProfilePage
