function captureImage() {
    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            const video = document.createElement('video');
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');

            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
                video.play();
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            };

            canvas.addEventListener('click', function (e) {
                const x = e.offsetX;
                const y = e.offsetY;
                const pixelData = context.getImageData(x, y, 1, 1).data;
                const colorCode = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
                document.getElementById('colorCode').innerText = `Color code at point (${x}, ${y}): ${colorCode}`;
            });
        })
        .catch(function (err) {
            console.error('Error accessing the camera.', err);
        });
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}