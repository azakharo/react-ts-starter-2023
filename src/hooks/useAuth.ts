import {useContext} from 'react';

import AuthContext, {AuthContextType} from '@/contexts/AuthContext';

const useAuth = (): AuthContextType => useContext(AuthContext);

export default useAuth;
