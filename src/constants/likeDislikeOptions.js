import { ThumbsUp, ThumbsDown } from "lucide-react";
import React from "react";

export const likeDislikeOptions = [
  {
    icon: <ThumbsDown style={{ width: 48, height: 48 }} />, // Red for Dislike
    label: "Dislike",
    value: "dislike",
    color: "#FF0000",
  },
  {
    icon: <ThumbsUp style={{ width: 48, height: 48 }} />, // Green for Like
    label: "Like",
    value: "like",
    color: "#008000",
  },
];
