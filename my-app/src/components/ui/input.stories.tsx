import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input } from "@/components/ui/input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
      description: "Input type",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    className: {
      control: "text",
      description: "Custom class for the input field",
    },
  },
} as Meta;

const Template: StoryFn = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "text",
  placeholder: "Enter some text...",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Enter your password...",
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  placeholder: "Enter your email...",
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: "text",
  placeholder: "Disabled input",
  disabled: true,
};
