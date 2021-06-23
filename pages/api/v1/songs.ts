import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

import { Video } from '../../../types/api';

const youtube = google.youtube({
	version: 'v3',
	auth: process.env.YOUTUBE_API_KEY,
});

// Durations are in the format PT##M##S. This fn converts it to seconds.
function parseYoutubeDuration(duration: string): number {
	const match = duration.match(/PT(\d+)M(\d+)S/);
	if (match == null) {
		return 0;
	}
	return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Video[]>,
) {
	// query youtube
	const searchResults = await youtube.search.list({
		part: ['id', 'snippet'],
		type: ['video'],
		q: req.query.q as string,
		videoEmbeddable: 'true',
	});

	if (searchResults.data.items == null) {
		res.status(500);
		return;
	}

	// we also need to get the durations
	const videoIds = searchResults.data.items.reduce<string[]>((acc, curr) => {
		if (curr.id?.videoId != null) {
			return [...acc, curr.id.videoId];
		}
		return acc;
	}, []);
	const videoDetails = await youtube.videos.list({
		part: ['contentDetails'],
		id: videoIds,
	});

	if (videoDetails.data.items == null) {
		res.status(500);
		return;
	}

	const idToDuration = new Map<string, string>();

	videoDetails.data.items.forEach(video => {
		if (video.id != null && video.contentDetails?.duration != null) {
			idToDuration.set(video.id, video.contentDetails.duration);
		}
	});

	// parse it into the response object
	// i hate the youtube library's typedefs SO MUCH
	res.json(searchResults.data.items.reduce<Video[]>((acc, result) => {
		if (result.id?.videoId != null && result.snippet?.title != null && result.id?.videoId != null) {

			const newItem = {
				videoId: result.id?.videoId,
				displayText: result.snippet?.title || 'no title',
				duration: parseYoutubeDuration(idToDuration.get(result.id.videoId) ?? '0'),
			};
			return [...acc, newItem];
		}
		return acc;
	}, []));
}