import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import Head from 'next/head';

const PlayerApp = dynamic(() => import('../components/player/PlayerApp'), { ssr: false });

const Player: FC<{}> = () => {
	return (
		<>
			<Head>
				<title>Karaoke player</title>
			</Head>
			<PlayerApp />
		</>
	);
};

export default Player;
