import { cn } from '@/shared/lib/classNames';
import { FC } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type Props = Omit<FlexProps, 'direction'>

export const VStack: FC<Props> = (props) => {
    return (
        <Flex direction='column' {...props}/>
    )
}