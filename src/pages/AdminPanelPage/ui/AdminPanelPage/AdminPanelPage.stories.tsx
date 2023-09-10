import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import AdminPanelPage from './AdminPanelPage';

export default {
    title: 'pages/AdminPanelPage',
    component: AdminPanelPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof AdminPanelPage>;

const Template: StoryFn<typeof AdminPanelPage> = (args) => <AdminPanelPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};