import React, {FocusEvent, ChangeEvent, memo, useMemo} from 'react';
import {TextField as BaseTextField} from '@mui/material';

export enum InputType {
  onlyPositive,
}

/* eslint-disable react/require-default-props */
interface Props {
  inputType?: InputType;
  name?: string;
  error?: boolean;
  helperText?: string;
  onBlur: (e: FocusEvent) => void;
  onChange: (e: ChangeEvent) => void;
  value: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  InputProps?: object;
}
/* eslint-enable react/require-default-props */

const TextField = ({inputType, InputProps, ...restProps}: Props) => {
  const patchedInputProps = useMemo(() => {
    if (!inputType) {
      return InputProps;
    }

    let inputComponent;
    switch (inputType) {
      // case inputTypes.onlyPositive:
      //   inputComponent = PositiveNumber;
      //   break;
      default: {
        inputComponent = undefined;
      }
    }

    return {
      inputComponent,
      ...InputProps,
    };
  }, [InputProps, inputType]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BaseTextField InputProps={patchedInputProps} {...restProps} />;
};

export default memo(TextField);
