import { Field } from "formik";

type Props = {
  isEditable?: boolean;
  label?: string;
  name: string;
  type?: string;
  as?: string;
  mode?: string;
  labelValue?: string;
};

const FormikField = (props: Props) => {
  const {
    isEditable,
    label,
    name,
    type = "text",
    as,
    mode,
    labelValue,
  } = props;

  const isEditView = mode === "editView";
  return (
    <>
      {label && (
        <label htmlFor={name} className="block text-sm">
          {label}:
        </label>
      )}

      {isEditView ? (
        isEditable ? (
          <Field
            id={name}
            name={name}
            type={type}
            {...(as ? { as } : {})}
            style={{
              background: "var(--Neutral-900, #131313)",
              boxShadow: "none",
            }}
            disabled={!isEditable}
            className={`w-full px-4 py-3 rounded-md border-[1px] border-transparent text-coolGray bg-darkGray ${
              isEditable && "hover:border-charcoalGray"
            } focus:border-[2px] focus:border-charcoalGray focus:outline-none ${
              as && "resize-none"
            }`}
          />
        ) : (
          <div className="text-sm font-normal text-[#E5E5E5]">{labelValue}</div>
        )
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          {...(as ? { as } : {})}
          style={{
            background: "var(--Neutral-900, #131313)",
            boxShadow: "none",
          }}
          disabled={!isEditable}
          className={`w-full px-4 py-3 rounded-md border-[1px] border-transparent text-coolGray bg-darkGray ${
            isEditable && "hover:border-charcoalGray"
          } focus:border-[2px] focus:border-charcoalGray focus:outline-none ${
            as && "resize-none"
          }`}
        />
      )}
    </>
  );
};

export default FormikField;
