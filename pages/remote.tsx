import React, { FC } from 'react';
import { useLogic } from '../components/remote/hooks';
import ConnectionPanel from '../components/remote/ConnectionPanel';
import MainRemoteInterface from '../components/remote/MainRemoteInterface';

const RemoteApp: FC<{}> = () => {
	const {
        isConnected,
        friendlyName,
		connectToPlayer,
		sendMessage,
	} = useLogic();

	if (!isConnected) {
		return (
			<ConnectionPanel connectToPlayer={connectToPlayer} />
		);
	}
	return (
		<MainRemoteInterface sendMessage={sendMessage} />
	);
};

export default RemoteApp;
