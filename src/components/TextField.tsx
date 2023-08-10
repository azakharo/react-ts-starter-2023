import {ChangeEvent, FocusEvent, memo, useMemo} from 'react';
import {TextField as BaseTextField} from '@mui/material';

export enum InputType {
  onlyPositive,
}

interface Props {
  inputType?: InputType;
  name?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: (e: FocusEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  InputProps?: object;
}

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

  return <BaseTextField InputProps={patchedInputProps} {...restProps} />;
};

export default memo(TextField);
