import { Button, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

const AppSelector: FC<{}> = () => {
	// TODO: can I use material-ui buttons as next links?
	const router = useRouter();

	return (
		<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
			<Grid item xs={3}>
				<Button onClick={() => router.push('/player')} color="primary" variant="contained" fullWidth>
					Karaoke
				</Button>
			</Grid>
			<Grid item xs={3}>
				<Button onClick={() => router.push('/remote')} color="primary" variant="contained" fullWidth>
					Remote
				</Button>
			</Grid>
		</Grid>
	);
};

export default AppSelector;
