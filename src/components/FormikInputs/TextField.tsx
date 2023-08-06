import {memo} from 'react';
import {getIn, useFormikContext} from 'formik';

import BaseTextField from '../TextField';

interface Props {
  name: string;
  /* eslint-disable react/require-default-props */
  label?: string;
  type?: string;
  /* eslint-enable react/require-default-props */
}

const TextField = ({name, ...restProps}: Props) => {
  const {touched, errors, values, handleBlur, handleChange} =
    useFormikContext();
  const isTouched = getIn(touched, name) as boolean;
  const error = getIn(errors, name) as string;
  const value = getIn(values, name) as string;

  return (
    <BaseTextField
      name={name}
      error={Boolean(isTouched && error)}
      helperText={isTouched && error ? error : undefined}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
};

export default memo(TextField);
