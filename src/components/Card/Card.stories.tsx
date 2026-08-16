import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "../Button/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Monthly revenue</CardTitle>
        <CardDescription>Compared to last month</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-text-1">$48,900</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          View report
        </Button>
      </CardFooter>
    </Card>
  ),
};
