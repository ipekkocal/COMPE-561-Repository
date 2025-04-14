import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default {
  title: "Components/Card",
  component: Card,
  subcomponents: { CardHeader, CardContent, CardTitle },
  argTypes: {
    children: { control: "text" },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Card>
    <CardHeader>
      <CardTitle>{args.header}</CardTitle>
    </CardHeader>
    <CardContent>{args.content}</CardContent>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  header: "Card Header",
  content: "This is the card content.",
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  header: "Custom Card Header",
  content: (
    <>
      <p>This is a custom card content.</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Custom Button
      </button>
    </>
  ),
};
