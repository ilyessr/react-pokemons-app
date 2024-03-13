import React, { FunctionComponent, ReactNode } from 'react';
import NavBar from './navbar';

type LayoutProps = {
    children: ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar />
            <main className='main'>{children}</main>
        </div>
    );
};

export default Layout;
