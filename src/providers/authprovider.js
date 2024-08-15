'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

// todo: add proper session type
const AuthProvider = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
