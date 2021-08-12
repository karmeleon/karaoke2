import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import Head from 'next/head';

const RemoteApp = dynamic(() => import('../components/remote/RemoteApp'), { ssr: false });

const Remote: FC<{}> = () => {
	return (
		<>
			<Head>
				<title>Karaoke remote</title>
			</Head>
			<RemoteApp />
		</>
	);
};

export default Remote;
