function calculateDistance(color1, color2) {
  const r1 = color1[0];
  const g1 = color1[1];
  const b1 = color1[2];

  const r2 = color2[0];
  const g2 = color2[1];
  const b2 = color2[2];

  return Math.sqrt(
    Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
  );
}

const colorTable = [
  [202, 202, 202], // #cacaca light
  [151, 151, 151], // #979797
  [70, 59, 41], // #463b29
  [46, 41, 1], // #2e2901
  [24, 24, 24], // #181818 dark
];

function captureImage() {
  const constraints = {
    video: {
      facingMode: "environment", // Use the back-facing camera
    },
  };
  const colorNames = ["#cacaca", "#979797", "#463b29", "#2e2901", "#181818"];

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      const video = document.createElement("video");
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");

      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
        canvas.width = 251;
        canvas.height = 346;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      };

      canvas.addEventListener("click", function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const pixelData = context.getImageData(x, y, 1, 1).data;
        const colorCode = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
        const selectedColor = [pixelData[0], pixelData[1], pixelData[2]];

        let minDistance = Number.MAX_SAFE_INTEGER;
        let closestColorIndex = null;

        for (let i = 0; i < colorTable.length; i++) {
          const color = colorTable[i];
          const distance = calculateDistance(selectedColor, color);
          if (distance < minDistance) {
            minDistance = distance;
            closestColorIndex = i;
          }
        }
        const closestColorCode = colorNames[closestColorIndex];

        document.getElementById("sample").style.display = "none";
        // document.getElementById('colorCode').innerText = `Color code at point (${x}, ${y}): ${colorCode}. Closest color: ${closestColorCode}`;
        if (closestColorCode == "#cacaca") {
          document.getElementById("colorCode").innerText = `perfect`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#979797") {
          document.getElementById(
            "colorCode"
          ).innerText = `moderate`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#463b29") {
          document.getElementById(
            "colorCode"
          ).innerText = `service required We recommend that it is better to change`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#2e2901") {
          document.getElementById(
            "colorCode"
          ).innerText = `poor water quality We recommend that it is better to change`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#181818") {
          document.getElementById(
            "colorCode"
          ).innerText = `It is unusable and you should change the water as soon as possible`;
          alert(
            "system failure imminent"
          );
          console.log(`${closestColorCode}`);
        } else {
          document.getElementById(
            "colorCode"
          ).innerText = `Color code at point (${x}, ${y}): ${colorCode}. Closest color: "the color not in renge"`;
        }
      });
    })
    .catch(function (err) {
      console.error("Error accessing the camera.", err);
    });
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function calculateDistanceFromImage(pixelData, colorTable) {
    const selectedColor = [pixelData[0], pixelData[1], pixelData[2]];

    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestColorIndex = null;

    for (let i = 0; i < colorTable.length; i++) {
        const color = colorTable[i];
        const distance = calculateDistance(selectedColor, color);
        if (distance < minDistance) {
            minDistance = distance;
            closestColorIndex = i;
        }
    }

    return closestColorIndex;
}


function handleFileSelect(event) {
    const file = event.target.files[0];
    const colorNames = ["#cacaca", "#979797", "#463b29", "#2e2901", "#181818"];
    document.getElementById("sample").style.display = "none";
    // Check if file is selected
    if (file) {
        const reader = new FileReader();

        // Read the file as Data URL
        reader.readAsDataURL(file);

        // Function to handle file load event
        reader.onload = function(event) {
            const preview = document.getElementById('preview');
            const img = document.createElement('img');
            img.setAttribute("width", "100%");
            img.setAttribute("id", "img");
            img.src = event.target.result;

            // Append the image to the preview div
            preview.innerHTML = '';
            preview.appendChild(img);

            // Process the image
            img.addEventListener("click", function (e) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                const x = e.offsetX;
                const y = e.offsetY;
                const pixelData = context.getImageData(x, y, 1, 1).data;
                const colorCode = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
                const selectedColor = [pixelData[0], pixelData[1], pixelData[2]];


console.log(pixelData)
                // Find closest color index
                const closestColorIndex = calculateDistanceFromImage(pixelData, colorTable);
                // Use the closest color index to determine the color code
                const closestColorCode = colorNames[closestColorIndex];


                // Handle the closest color code as required
        // document.getElementById('colorCode').innerText = `Color code at point (${x}, ${y}): ${colorCode}. Closest color: ${closestColorCode}`;
        if (closestColorCode == "#cacaca") {
          document.getElementById("colorCode").innerText = `perfect`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#979797") {
          document.getElementById(
            "colorCode"
          ).innerText = `moderate`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#463b29") {
          document.getElementById(
            "colorCode"
          ).innerText = `service required We recommend that it is better to change`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#2e2901") {
          document.getElementById(
            "colorCode"
          ).innerText = `poor water quality We recommend that it is better to change`;
          console.log(`${closestColorCode}`);
        } else if (closestColorCode == "#181818") {
          document.getElementById(
            "colorCode"
          ).innerText = `It is unusable and you should change the water as soon as possible`;
          alert(
            "system failure imminent"
          );
          console.log(`${closestColorCode}`);
        } else {
          document.getElementById(
            "colorCode"
          ).innerText = `Color code at point (${x}, ${y}): ${colorCode}. Closest color: "the color not in renge"`;
        }
            });
        }
    }
}

  // Add event listener to file input element
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', handleFileSelect);
