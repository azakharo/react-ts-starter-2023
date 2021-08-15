import React, {memo} from 'react';
import {useFormikContext, getIn} from 'formik';

import BaseTextField from '@/components/TextField';

interface Props {
  name: string,
  label?: string,
  type?: string,
}

const TextField = ({name, ...restProps}: Props) => {
  const {touched, errors, values, handleBlur, handleChange} =
    useFormikContext();
  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);
  const value = getIn(values, name);

  return (
    <BaseTextField
      name={name}
      error={Boolean(isTouched && error)}
      helperText={isTouched && error}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...restProps}
    />
  );
};

export default memo(TextField);
