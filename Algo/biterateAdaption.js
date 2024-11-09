// Define bitrate levels (resolution in pixels)
const resolutions = {
    high: 1080,
    medium: 720,
    low: 480
};

// Get the video element
const videoElement = document.getElementById('adaptive-video');

// Function to monitor battery level
async function getBatteryLevel() {
    try {
        const battery = await navigator.getBattery();
        return battery.level * 100; // Convert to percentage
    } catch (error) {
        console.log("Battery API not supported:", error);
        return null;
    }
}

// Function to monitor network condition
function getNetworkCondition() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        return connection.effectiveType;
    } else {
        console.log('Network Information API not supported');
        return 'good';  // Assume good if API is not supported
    }
}

// Function to change the video resolution
function changeResolution(resolution) {
    videoElement.width = resolution; // Change the width dynamically
    console.log(`Resolution set to: ${resolution}p`);
}

// Function to adapt video resolution based on battery level and network
async function adaptVideoResolution() {
    const batteryLevel = await getBatteryLevel();
    const networkCondition = getNetworkCondition();

    console.log(`Battery Level: ${batteryLevel}%`);
    console.log(`Network Condition: ${networkCondition}`);

    if (batteryLevel !== null) {
        if (batteryLevel > 50 && networkCondition === '4g') {
            changeResolution(resolutions.high);
        } else if (batteryLevel > 20 || networkCondition === '3g') {
            changeResolution(resolutions.medium);
        } else {
            changeResolution(resolutions.low);
        }
    }
}

// Call adaptVideoResolution every 10 seconds to check battery and network status
setInterval(adaptVideoResolution, 10000);  // Check and adjust every 10 seconds
