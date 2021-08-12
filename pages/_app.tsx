import '../styles/globals.css';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import type { AppProps } from 'next/app';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fullscreenContainer: {
			position: 'absolute',
			overflow: 'hidden',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
		},
	}),
);

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	const classes = useStyles();

	return (
		<div className={classes.fullscreenContainer}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</div>
	);
}

export default MyApp;
