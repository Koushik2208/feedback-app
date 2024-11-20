import React from 'react';
import {
  TextField,
  RatingField,
  EmotionField,
  SliderField,
  RadioField,
  CheckboxField,
  SelectField,
} from './FormFields';
 
const FormField = ({ field, value, onChange }) => {
  const fieldComponents = {
    text: TextField,
    email: TextField,
    rating: RatingField,
    emotion: EmotionField,
    slider: SliderField,
    radio: RadioField,
    checkbox: CheckboxField,
    select: SelectField,
    textarea: TextField,
  };
 
  const Component = fieldComponents[field.type];
  
  if (!Component) {
    return null;
  }
 
  return <Component field={field} value={value} onChange={onChange} />;
};
 
export default FormField;