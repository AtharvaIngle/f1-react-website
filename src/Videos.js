// src/pages/Videos.js
import React from 'react';
import './Videos.css';

const videos = [
    {
        title: 'Best Moments of Lewis Hamilton',
        url: 'https://www.youtube.com/embed/KMzB_7xM2_c' // Replace with actual video IDs
    },
    {
        title: 'Top Highlights of Max Verstappen',
        url: 'https://www.youtube.com/embed/mgcOBxGcmmg' // Replace with actual video IDs
    },
    // Add more video objects as needed
];

const Videos = () => {
    return (
        <div className="videos-container">
            <h2 className="videos-title">Best Video Clips</h2>
            <div className="videos-list">
                {videos.map((video, index) => (
                    <div key={index} className="video-item">
                        <h3 className="video-title">{video.title}</h3>
                        <iframe
                            width="560"
                            height="315"
                            src={video.url}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
