import React from "react";


function HomeVideo() {
  return (
    <div className="home-video-container">
      <video
        src="https://res.cloudinary.com/dbkfr78rc/video/upload/v1755806909/homeVideo_ejleqg.mp4"  // replace with your video link / cloudinary URL
        autoPlay
        muted
        loop
        playsInline
        className="home-video"
      />
    </div>
  );
}

export default HomeVideo;
