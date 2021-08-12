import { Playlist, PlaylistMessage } from '../common/Messages';

export function playlistReducer(state: Playlist, action: PlaylistMessage): Playlist {
	switch (action.type) {
		case 'playlist.queue':
			return state.concat([action.song]);
		case 'playlist.overwrite':
			return action.playlist;
		case 'playlist.dequeue':
			return state.slice(1);
	}
}
