import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "@/components/ui/button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
      },
    },
    children: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: "default",
  size: "default",
  children: "Button",
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
  size: "default",
  children: "Delete",
};

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
  size: "default",
  children: "Outline",
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: "ghost",
  size: "default",
  children: "Ghost",
};

export const Link = Template.bind({});
Link.args = {
  variant: "link",
  size: "default",
  children: "Link",
};
