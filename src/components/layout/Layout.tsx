import React, { ReactNode } from 'react';

const Layout : React.FC <{ children?: ReactNode }> = ({children}) => {
    return <div>
            {children}
        </div>
}

export default Layout;