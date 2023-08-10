import React, {FC, memo} from 'react';

import ColoredCircle from 'src/components/ColoredCircle';
import {getNameInitials} from 'src/utils/strings';

interface Props {
  name: string;
  size?: number;
  bgColor?: string;
}

const UserInitials: FC<Props> = ({name, size, bgColor = '#00ff',}) => {
  const initials = getNameInitials(name);

  return (
    <ColoredCircle size={size} bgColor={bgColor}>
      {initials}
    </ColoredCircle>
  );
};

export default memo(UserInitials);
