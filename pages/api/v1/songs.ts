import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const youtube = google.youtube({
	version: 'v3',
	// TODO: how do env?
	auth: process.env.YOUTUBE_API_KEY,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		// query youtube
		const searchResults = await youtube.search.list({
			part: ['id', 'snippet'],
			type: ['video'],
			q: req.query.q as string,
			videoEmbeddable: 'true',
		});

		if (searchResults == null) {
			res.status(500);
			return;
		}

		// we also need to get the durations
		const videoIDs = searchResults.data.items.map(item => item.id.videoId);
		const videoDetails = await youtube.videos.list({
			part: ['contentDetails'],
			id: videoIDs,
		});
		const idToDuration = new Map<string, string>();

		videoDetails.data.items.forEach(video => idToDuration.set(video.id, video.contentDetails.duration));

		// parse it into the response object
		res.json(searchResults.data.items.map(result => ({
			url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
			displayName: result.snippet.title,
			duration: idToDuration.get(result.id.videoId),
		})));
	} catch (e) {
		// TODO: log this somewhere
	}
}