import { Laugh, Smile, Meh, Frown, Angry } from "lucide-react";
import React from "react";

export const emotions = [
  {
    icon: <Angry style={{ width: 48, height: 48, color:'red' }} />,
    label: "Very Unhappy",
    value: 1,
  },
  {
    icon: <Frown style={{ width: 48, height: 48, color:'' }} />,
    label: "Unhappy",
    value: 2,
  },
  {
    icon: <Meh style={{ width: 48, height: 48, color:'yellow' }} />,
    label: "Neutral",
    value: 3,
  },
  {
    icon: <Smile style={{ width: 48, height: 48 }} />,
    label: "Happy",
    value: 4,
  },
  {
    icon: <Laugh style={{ width: 48, height: 48, color:'green' }} />,
    label: "Very Happy",
    value: 5,
  },
];
