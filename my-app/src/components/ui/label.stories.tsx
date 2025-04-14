import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Label } from "@/components/ui/label";

export default {
  title: "Components/Label",
  component: Label,
  argTypes: {
    children: {
      control: "text",
    },
    htmlFor: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <div>
    <Label {...args} />
    <input id={args.htmlFor} type="text" placeholder="Enter text here" className="border rounded p-1" />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "Default Label",
  htmlFor: "input-id",
  className: "", // No custom styles for default
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  children: "Custom Style Label",
  htmlFor: "custom-input-id",
  className: "font-bold text-lg text-red-500", // Bold, red, larger text
};
