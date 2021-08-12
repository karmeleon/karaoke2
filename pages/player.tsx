import dynamic from 'next/dynamic';
import React, { FC } from 'react';

const PlayerApp = dynamic(() => import('../components/player/PlayerApp'), { ssr: false });

const Player: FC<{}> = () => {
	return <PlayerApp />;
};

export default Player;
