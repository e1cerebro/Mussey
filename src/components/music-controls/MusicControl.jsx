import React, { useState, useEffect, Fragment, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faPlay,
  faPause,
  faSquare,
  faForward,
  faRedo,
  faVolumeMute,
  faVolumeDown,
  faVolumeUp,
  faBan,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import './musiccontrol.style.css';
import { connect } from 'react-redux';
import {
  selectPlayNext,
  selectPlayPrev,
} from '../../redux/reselect/songSelector';
import {
  selectPlayerStatus,
  selectRepeat,
} from '../../redux/reselect/playerSelector';
import { selectSettingsVolume } from '../../redux/reselect/settingsSelector';
import { toggleVolume } from '../../redux/actions/settingsAction';
import {
  startMusic,
  pauseMusic,
  stopMusic,
  repeatCurrentMusic,
  repeatNoMusic,
} from '../../redux/actions/playerActions';
import {
  nextSong,
  previousSong,
  setCurrentSong,
} from '../../redux/actions/songActions';
import FavouriteButton from '../favourite-button/FavouriteButton';

const MusicControl = props => {
  const {
    song,
    startMusic,
    pauseMusic,
    stopMusic,
    playerStatus,
    nextSong,
    previousSong,
    showPrev,
    showNext,
    repeatCurrentMusic,
    toggleVolume,
    volumeLevel,
    repeatNoMusic,
    repeat,
  } = props;

  const [timeElapsed, setTimeElapsed] = useState('0.00');

  const sourceRef = useRef(null);
  const trackersliderRef = useRef(null);
  const audioRef = useRef(null);
  const volumeRangeControl = useRef(null);

  useEffect(() => {
    if (song) {
      resetPlayer();
    }
  }, [song]);

  const resetPlayer = () => {
    stopSong();
    audioRef.current.src = song.previewURL;
    playSong();
  };

  function updateTracker() {
    let currentTime = audioRef.current.currentTime;
    setTimeElapsed((currentTime / 100).toFixed(2));
    trackersliderRef.current.value = currentTime;
  }

  const playSong = () => {
    startMusic();
    audioRef.current.play();
    let tracker = setInterval(updateTracker, 1000);
    audioRef.current.onended = () => {
      if (showNext) return nextSong();
      stopMusic();
    };
  };

  const pauseSong = () => {
    pauseMusic();
    audioRef.current.pause();
    audioRef.current.onpause = () => {};
  };

  const stopSong = () => {
    stopMusic();
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.onended = () => {};
  };

  const ToggleVolume = event => {
    const { value } = event.target;
    audioRef.current.volume = value;
    toggleVolume(value);
  };

  const increaseVolume = () => {
    let updatedVolume = (parseFloat(volumeLevel) + 0.1).toFixed(1);
    volumeRangeControl.current.value = updatedVolume;
    audioRef.current.volume = updatedVolume;
    toggleVolume(updatedVolume);
  };
  const decreaseVolume = () => {
    let updatedVolume = (parseFloat(volumeLevel) - 0.1).toFixed(1);
    volumeRangeControl.current.value = updatedVolume;
    audioRef.current.volume = updatedVolume;
    toggleVolume(updatedVolume);
  };

  return (
    <Fragment>
      <div className='play-progress d-flex align-items-center justify-content-between'>
        <div className={`${!song ? 'disabled' : ''} start-time`}>
          <span>{timeElapsed}</span>
        </div>
        <div className={`${!song ? 'disabled' : ''} slider-control`}>
          <input
            className='tracking-slider range'
            type='range'
            ref={trackersliderRef}
            id='tracking-slider'
            min='0'
            step='1'
            max={song ? song.playbackSeconds : ''}
            defaultValue={0}
          />

          <audio
            id='musicaudio'
            style={{ display: 'none' }}
            className='raw-player'
            controls
            ref={audioRef}>
            <source
              ref={sourceRef}
              src={song ? song.previewURL : ''}
              type='audio/mpeg'
            />
          </audio>
        </div>
        <div className={`${!song ? 'disabled' : ''} end-time`}>
          <span>{song ? (song.playbackSeconds / 60).toFixed(2) : '0.00'}</span>
        </div>
        <FavouriteButton track={song} />
      </div>

      <div
        className={` controls d-flex justify-content-between align-items-center  `}>
        <div
          onClick={() => previousSong()}
          className={` ${!song ? 'disabled' : ''} ${
            !showPrev ? 'disabled' : ''
          } previous-song  pointer-cursor`}>
          <FontAwesomeIcon icon={faBackward} />
        </div>
        {playerStatus === 'pause' || playerStatus === 'stopped' ? (
          <div
            onClick={() => playSong()}
            className={`${!song ? 'disabled' : ''} play-pause pointer-cursor`}>
            <FontAwesomeIcon icon={faPlay} />
          </div>
        ) : (
          ''
        )}
        {playerStatus === 'play' ? (
          <div
            onClick={() => pauseSong()}
            className='play-pause pointer-cursor'>
            <FontAwesomeIcon icon={faPause} />
          </div>
        ) : (
          ''
        )}
        <div
          onClick={() => nextSong()}
          className={` ${!song ? 'disabled' : ''} ${
            !showNext ? 'disabled' : ''
          } next-song pointer-cursor`}>
          <FontAwesomeIcon icon={faForward} />
        </div>
        <div
          onClick={() => stopSong()}
          className={` ${!song ? 'disabled' : ''} repeat-song pointer-cursor`}>
          <FontAwesomeIcon icon={faSquare} />
        </div>
        {repeat === 'none' ? (
          <div
            onClick={() => repeatCurrentMusic()}
            className={`${!song ? 'disabled' : ''} repeat-song pointer-cursor`}>
            <FontAwesomeIcon icon={faRedo} />
          </div>
        ) : (
          <div
            onClick={() => repeatNoMusic()}
            className={`${!song ? 'disabled' : ''} repeat-song pointer-cursor`}>
            <FontAwesomeIcon icon={faBan} />
          </div>
        )}

        <div className='volume-control d-flex align-items-center justify-content-between'>
          {volumeLevel >= 0.2 && volumeLevel < 1 ? (
            <div
              onClick={decreaseVolume}
              className={`${
                !song || volumeLevel === '0.1' || volumeLevel < '0.1'
                  ? 'disabled'
                  : ''
              } volumn-down pointer-cursor`}>
              <FontAwesomeIcon icon={faVolumeDown} />
            </div>
          ) : (
            <div
              onClick={decreaseVolume}
              className={`${
                !song || volumeLevel < '0.1' ? 'disabled' : ''
              } volumn-down pointer-cursor`}>
              <FontAwesomeIcon icon={faVolumeMute} />
            </div>
          )}
          <div className={` ${!song ? 'disabled' : ''} control-gear `}>
            <input
              ref={volumeRangeControl}
              onChange={ToggleVolume}
              type='range'
              min='0'
              max='1'
              className='range'
              step={0.01}
              defaultValue={volumeLevel}
            />
          </div>
          <div
            onClick={increaseVolume}
            className={`${
              !song || volumeLevel === '1.0' ? 'disabled' : ''
            } volumn-up pointer-cursor`}>
            <FontAwesomeIcon icon={faVolumeUp} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    playerStatus: selectPlayerStatus(state),
    showNext: selectPlayNext(state),
    showPrev: selectPlayPrev(state),
    repeat: selectRepeat(state),
    volumeLevel: selectSettingsVolume(state),
  };
};

export default connect(mapStateToProps, {
  startMusic,
  pauseMusic,
  stopMusic,
  nextSong,
  previousSong,
  repeatCurrentMusic,
  repeatNoMusic,
  setCurrentSong,
  toggleVolume,
})(MusicControl);
