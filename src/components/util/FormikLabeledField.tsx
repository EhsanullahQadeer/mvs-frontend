/*************************************************************************
 * @file FormikLabeledField.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component of formik input fields with label.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { Field } from "formik";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  handleInputChange?: (event: any) => void;
  type?: string;
  as?: string;
  inputBgColor?: string;
  labelColor?: string;
};

const FormikLabeledField = (props: Props) => {
  const {
    name,
    label,
    placeholder,
    value,
    handleInputChange,
    type = "text",
    as,
    inputBgColor,
    labelColor,
  } = props;
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label
        htmlFor={name}
        className={`${
          labelColor ? `text-${labelColor}` : "text-silver"
        } text-sm font-normal`}
      >
        {label}
      </label>

      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        {...(as && { as: as })}
        {...(value !== undefined && { value })}
        {...(handleInputChange && { onChange: handleInputChange })}
        style={{
          boxShadow: "none",
        }}
        className={`text-dimGray text-sm font-normal px-4 py-3 rounded-lg ${
          inputBgColor ? `bg-${inputBgColor}` : "bg-darkGray"
        } border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none`}
      />
    </div>
  );
};

export default FormikLabeledField;
