import { Laugh, Smile, Meh, Frown, Angry } from "lucide-react";
import React from "react";

export const emotions = [
  {
    icon: <Angry style={{ width: 48, height: 48 }} />, // Bright Red
    label: "Very Unhappy",
    value: 1,
    color: "#FF0000",
  },
  {
    icon: <Frown style={{ width: 48, height: 48 }} />, // Orange Red
    label: "Unhappy",
    value: 2,
    color: "#FF4500",
  },
  {
    icon: <Meh style={{ width: 48, height: 48 }} />, // Golden Yellow
    label: "Neutral",
    value: 3,
    color: "#FFD700",
  },
  {
    icon: <Smile style={{ width: 48, height: 48 }} />, // Lime Green
    label: "Happy",
    value: 4,
    color: "#32CD32",
  },
  {
    icon: <Laugh style={{ width: 48, height: 48 }} />, // Dark Green
    label: "Very Happy",
    value: 5,
    color: "#008000",
  },
];
