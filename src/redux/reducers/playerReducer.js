import { player_action_types } from '../types';

const INITIAL_STATE = {
  playerStatus: 'stopped',
  repeat: 'none',
  repeatQueue: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case player_action_types.PLAYER_STARTED:
      return { ...state, playerStatus: 'play' };
    case player_action_types.PLAYER_PAUSED:
      return { ...state, playerStatus: 'pause' };
    case player_action_types.PLAYER_STOPPED:
      return { ...state, playerStatus: 'stopped' };
    case player_action_types.REPEAT_CURRENT:
      return { ...state, repeat: 'current', repeatQueue: action.payload };
    case player_action_types.REPEAT_NO_MUSIC:
      return { ...state, repeat: 'none', repeatQueue: null };
    default:
      return state;
  }
};
