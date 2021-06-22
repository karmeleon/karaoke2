import { Button, createMuiTheme, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

const AppSelector: FC<{}> = () => {
	const router = useRouter();

	return (
		<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
			<Grid item xs={3}>
				<Button 
					onClick={() => router.push('/player', undefined, { shallow: true })}
					color="primary"
					variant="contained"
					fullWidth
				>
					Karaoke
				</Button>
			</Grid>
			<Grid item xs={3}>
				<Button
					onClick={() => router.push('/remote', undefined, { shallow: true })}
					color="primary"
					variant="contained"
					fullWidth
				>
					Remote
				</Button>
			</Grid>
		</Grid>
	);
};

export default AppSelector;