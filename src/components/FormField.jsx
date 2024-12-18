import React from "react";
import {
  TextField,
  RatingField,
  EmotionField,
  EmojiField,
  SliderField,
  RadioField,
  CheckboxField,
  SelectField,
  GradientScaleField,
  TextAreaField,
  LikeDislikeField,
  PasswordField,
  FileUploadField,
} from "./FormFields";

const FormField = ({ field, value, onChange, width, disabled }) => {
  const fieldComponents = {
    text: TextField,
    password: PasswordField,
    email: TextField,
    rating: RatingField,
    emotion: EmotionField,
    emoji: EmojiField,
    slider: SliderField,
    radio: RadioField,
    checkbox: CheckboxField,
    select: SelectField,
    textarea: TextAreaField,
    gradientScale: GradientScaleField,
    likeDislike: LikeDislikeField,
    file: FileUploadField,
  };

  const Component = fieldComponents[field.type];

  if (!Component) {
    return null;
  }

  return (
    <Component
      field={field}
      value={value}
      onChange={onChange}
      width={width}
      disabled={disabled}
    />
  );
};

export default FormField;
