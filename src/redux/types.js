export const song_action_types = {
  FETCH_GENRES: 'FETCH_GENRES',
  FETCH_PLAYLISTS: 'FETCH_PLAYLISTS',
  FETCH_TRACKS: 'FETCH_TRACKS',
  SET_CURRENT_TRACK: 'SET_CURRENT_TRACK',
  FETCH_TOP_10: 'FETCH_TOP_10',
  NEXT_SONG: 'NEXT_SONG',
  PREVIOUS_SONG: 'PREVIOUS_SONG',
  TOGGLE_FAVOURITES: 'TOGGLE_FAVOURITES',
  FETCH_FAVOURITES: 'FETCH_FAVOURITES',
  ADD_FAVOURITES_TO_CURRENT_SONG_LISTS: 'ADD_FAVOURITES_TO_CURRENT_SONG_LISTS',
  REPEAT_CURRENT: 'REPEAT_CURRENT',
  REPEAT_NO_MUSIC: 'REPEAT_NO_MUSIC',
  REPEAT_ALL_MUSIC: 'REPEAT_ALL_MUSIC',
  SET_REPEAT_QUEUE: 'SET_REPEAT_QUEUE',
  REPEAT_CURRENT_DISPATCHED: 'REPEAT_CURRENT_DISPATCHED',
  REPEAT_ALL_DISPATCHED: 'REPEAT_ALL_DISPATCHED',
};

export const player_action_types = {
  PLAYER_STARTED: 'PLAYER_STARTED',
  PLAYER_PAUSED: 'PLAYER_PAUSED',
  PLAYER_STOPPED: 'PLAYER_STOPPED',
};
export const settings_action_types = {
  VOLUME_CHANGED: 'VOLUME_CHANGED',
};
export const user_action_types = {
  CREATE_USER_PROFILE: 'CREATE_USER_PROFILE',
  USER_SIGNED_OUT: 'USER_SIGNED_OUT',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNIN_FAILURE: 'SIGNIN_FAILURE',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
};
