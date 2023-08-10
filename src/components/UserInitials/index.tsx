import React, {FC, memo} from 'react';

import ColoredCircle from 'src/components/ColoredCircle';
import {getNameInitials} from 'src/utils/strings';

interface Props {
  name: string;
  size?: number;
}

const UserInitials: FC<Props> = ({name, size}) => {
  const initials = getNameInitials(name);

  return <ColoredCircle size={size}>{initials}</ColoredCircle>;
};

export default memo(UserInitials);
