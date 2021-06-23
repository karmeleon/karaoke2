import dynamic from 'next/dynamic'
import React, { FC } from 'react';

const RemoteApp = dynamic(
    () => import('../components/remote/RemoteApp'),
    { ssr: false }
);

const Remote: FC<{}> = () => {
    return <RemoteApp />;
};

export default Remote;
