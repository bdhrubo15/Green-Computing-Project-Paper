// Get references to the video player and status display
const videoPlayer = document.getElementById('videoPlayer');
const statusDiv = document.getElementById('status');

// Simulated battery level (0 to 100)
let batteryLevel = 100;

// Video quality settings
const videoSettings = {
    '1080p': { bitrate: 5000 },
    '720p': { bitrate: 3000 },
    '480p': { bitrate: 1500 }
};

// Function to get the current network type
function getNetworkType() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection ? connection.effectiveType : 'unknown';
}

// Function to update the status display
function updateStatus() {
    const networkType = getNetworkType();
    const currentResolution = videoPlayer.src.match(/(\d+)p/)[1] + 'p'; // Extract resolution from the video source
    const currentBitrate = videoSettings[currentResolution] ? videoSettings[currentResolution].bitrate : 'N/A';

    statusDiv.innerHTML = `
        <p>Battery Level: ${batteryLevel}%</p>
        <p>Network Type: ${networkType}</p>
        <p>Current Resolution: ${currentResolution}</p>
        <p>Current Bitrate: ${currentBitrate} kbps</p>
    `;
}

// Function to adapt video quality based on battery level and network type
function adaptVideoQuality() {
    if (batteryLevel < 20) {
        videoPlayer.src = './video/480.mpg';
        videoPlayer.videoHeight = 480;
    } else if (batteryLevel < 50) {
        videoPlayer.src = './video/720.mpg';
        videoPlayer.videoHeight = 720;
    } else {
        videoPlayer.src = './video/1080.mp4';
        videoPlayer.videoHeight = 1080;
    }
    videoPlayer.load(); // Load the new video source
    updateStatus(); // Update the status after changing video
}

// Simulate battery level changes and adaptation
setInterval(() => {
    // Simulate battery level changes
    batteryLevel = Math.max(0, batteryLevel - Math.floor(Math.random() * 5)); // Decrease battery by 0-5%
    adaptVideoQuality();
}, 10000); // Check every 10 seconds

// Initial status update
updateStatus();
