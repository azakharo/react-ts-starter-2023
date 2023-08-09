import React, {FC, memo, ReactNode} from 'react';
import {Box} from '@mui/material';

const DEFAULT_WIDTH = 32;

interface Props {
  children: ReactNode;
  size?: number;
  bgColor?: string;
}

const ColoredCircle: FC<React.PropsWithChildren<Props>> = ({
  children,
  size = DEFAULT_WIDTH,
  bgColor = '#000',
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      sx={{
        background: bgColor,
        borderRadius: '50%',
        color: 'white',
        fontWeight: 700,
      }}
    >
      {children}
    </Box>
  );
};

export default memo(ColoredCircle);
