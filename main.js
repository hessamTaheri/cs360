function captureImage() {
    const constraints = {
        facingMode: { exact: "environment" },
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

function calculateDistance(color1, color2) {
    const r1 = color1[0];
    const g1 = color1[1];
    const b1 = color1[2];

    const r2 = color2[0];
    const g2 = color2[1];
    const b2 = color2[2];

    return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
}

const colorTable = [
    [250,238,214],
    [148,109,66],
    [46,20,3]
];

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
                const selectedColor = [pixelData[0], pixelData[1], pixelData[2]];

                let minDistance = Number.MAX_SAFE_INTEGER;
                let closestColor = null;

                for (const color of colorTable) {
                    const distance = calculateDistance(selectedColor, color);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestColor = color;
                    }
                }

                const closestColorCode = rgbToHex(closestColor[0], closestColor[1], closestColor[2]);
                // document.getElementById('colorCode').innerText = `Color code at point (${x}, ${y}): ${colorCode}. Closest color: ${closestColorCode}`;
                if (closestColorCode == "#faeed6") {
                    document.getElementById('colorCode').innerText = `it seems good`;
                    console.log(`${closestColorCode}`)
                }else if (closestColorCode == "#946d42") {
                    document.getElementById('colorCode').innerText = `we advice is better to change`;
                    console.log(`${closestColorCode}`)
                }else if (closestColorCode == "#2e1403") {
                    document.getElementById('colorCode').innerText = `it is out of used and you should change the water ASAP`;
                    console.log(`${closestColorCode}`)
            }else {
                document.getElementById('colorCode').innerText = `Color code at point (${x}, ${y}): ${colorCode}. Closest color: "the color not in renge"`;
                }
            });
        })
        .catch(function (err) {
            console.error('Error accessing the camera.', err);
        });
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
