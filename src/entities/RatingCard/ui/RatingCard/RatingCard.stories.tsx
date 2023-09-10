import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { RatingCard } from './RatingCard';

export default {
    title: 'entities/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof RatingCard>;

const Template: StoryFn<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};