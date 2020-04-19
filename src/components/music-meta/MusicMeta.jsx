import React from 'react';
import './musicmeta.css';
import AuthorMeta from '../author-meta/AuthorMeta';
import CustomImage from '../custom-image/CustomImage';
const MusicMeta = ({ title, artistName }) => {
  return (
    <div className='music-meta align-items-center d-flex justify-content-start'>
      <div className='music-label'>
        <CustomImage className='rounded-circle loading' />
      </div>
      <AuthorMeta title={title} artistName={artistName} />
    </div>
  );
};

export default MusicMeta;
