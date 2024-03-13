import React from 'react'

function VideoPlayer({ height, width, video, disabled, autoPlay, controls }) {
  return (
    <video
      className={`h-${height} w-${width}`}
      controls={controls}
      autoPlay={autoPlay}
      muted
      disabled={disabled}
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer