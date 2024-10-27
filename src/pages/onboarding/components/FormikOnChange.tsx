/*************************************************************************
 * @file FormikOnChange.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is to detect changes inside formik forms.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useFormikContext } from "formik";
import { useEffect } from "react";

type Props = {
  onChange: () => void;
};

const FormikOnChange = (props: Props) => {
  const { onChange } = props;
  const { values } = useFormikContext();

  useEffect(() => {
    onChange();
  }, [values]);

  return null;
};

export default FormikOnChange;
