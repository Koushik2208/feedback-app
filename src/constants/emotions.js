import { Smile, Meh, Frown } from "lucide-react";
import React from "react";

export const emotions = [
  {
    icon: <Smile style={{ width: 48, height: 48 }} />,
    label: "Happy",
    value: 3,
  },
  {
    icon: <Meh style={{ width: 48, height: 48 }} />,
    label: "Neutral",
    value: 2,
  },
  {
    icon: <Frown style={{ width: 48, height: 48 }} />,
    label: "Unhappy",
    value: 1,
  },
];
