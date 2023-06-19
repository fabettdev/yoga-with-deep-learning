import { PoseLandmarker } from "@mediapipe/tasks-vision";

export function getPoseDraw(poseName, landmarks, videoWidth, videoHeight) {
  const filteredLandmarks = getFilteredLandmarks(landmarks);
  const connectors = getBodyConnectors();
  const drawArguments = [filteredLandmarks, videoWidth, videoHeight];
  let color;

  switch (poseName) {
    case "Tadasana":
      color = getTadasanaDraw(...drawArguments);
      break;
    case "Virabhadrasana II":
      color = getVirabhadrasanaIIDraw(...drawArguments);
      break;
    case "Kumbhakasana":
      color = getKumbhakasanaDraw(...drawArguments);
      break;
  }

  return [filteredLandmarks, connectors, color];
}

function getTadasanaDraw(filteredLandmarks, videoWidth, videoHeight) {
  let color = "red";
  const angleArguments = [filteredLandmarks, videoWidth, videoHeight];

  // Left elbow
  const leftElbowAngle = getLeftElbowAngle(...angleArguments);

  // Right elbow
  const rightElbowAngle = getRightElbowAngle(...angleArguments);

  // Left shoulder
  const leftShoulderAngle = getLeftShoulderAngle(...angleArguments);

  // Right shoulder
  const rightShoulderAngle = getRightShoulderAngle(...angleArguments);

  // Check angles
  if (
    leftElbowAngle <= 190 &&
    leftElbowAngle >= 160 &&
    rightElbowAngle <= 190 &&
    rightElbowAngle >= 160 &&
    leftShoulderAngle <= 180 &&
    leftShoulderAngle >= 150 &&
    rightShoulderAngle <= 180 &&
    rightShoulderAngle >= 150
  ) {
    color = "green";
  }

  return color;
}

function getVirabhadrasanaIIDraw(filteredLandmarks, videoWidth, videoHeight) {
  let color = "red";

  const angleArguments = [filteredLandmarks, videoWidth, videoHeight];

  // Left elbow
  const leftElbowAngle = getLeftElbowAngle(...angleArguments);

  // Right elbow
  const rightElbowAngle = getRightElbowAngle(...angleArguments);

  // Left shoulder
  const leftShoulderAngle = getLeftShoulderAngle(...angleArguments);

  // Right shoulder
  const rightShoulderAngle = getRightShoulderAngle(...angleArguments);

  // Left knee
  const leftKneeAngle = getLeftKneeAngle(...angleArguments);

  // Right knee
  const rightKneeAngle = getRightKneeAngle(...angleArguments);

  // Check angles
  if (
    leftElbowAngle <= 190 &&
    leftElbowAngle >= 160 &&
    rightElbowAngle <= 190 &&
    rightElbowAngle >= 160 &&
    leftShoulderAngle <= 110 &&
    leftShoulderAngle >= 60 &&
    rightShoulderAngle <= 110 &&
    rightShoulderAngle >= 60 &&
    leftKneeAngle <= 160 &&
    leftKneeAngle >= 90 &&
    rightKneeAngle <= 190 &&
    rightKneeAngle >= 150
  ) {
    color = "green";
  }

  return color;
}

function getKumbhakasanaDraw(filteredLandmarks, videoWidth, videoHeight) {
  let color = "red";

  const angleArguments = [filteredLandmarks, videoWidth, videoHeight];

  // Left elbow
  const leftElbowAngle = getLeftElbowAngle(...angleArguments);

  // Right elbow
  const rightElbowAngle = getRightElbowAngle(...angleArguments);

  // Left shoulder
  const leftShoulderAngle = getLeftShoulderAngle(...angleArguments);

  // Right shoulder
  const rightShoulderAngle = getRightShoulderAngle(...angleArguments);

  // Left knee
  const leftKneeAngle = getLeftKneeAngle(...angleArguments);

  // Right knee
  const rightKneeAngle = getRightKneeAngle(...angleArguments);

  // Check angles
  const leftBody =
    leftElbowAngle <= 190 &&
    leftElbowAngle >= 160 &&
    leftShoulderAngle <= 110 &&
    leftShoulderAngle >= 60 &&
    leftKneeAngle <= 190 &&
    leftKneeAngle >= 150;

  const rightBody =
    rightElbowAngle <= 190 &&
    rightElbowAngle >= 160 &&
    rightShoulderAngle <= 110 &&
    rightShoulderAngle >= 60 &&
    rightKneeAngle <= 190 &&
    rightKneeAngle >= 150;

  if (leftBody || rightBody) {
    color = "green";
  }

  return color;
}

function getFilteredLandmarks(landmarks) {
  const filteredLandmarks = [];
  filteredLandmarks[0] = landmarks[11];
  filteredLandmarks[1] = landmarks[12];
  filteredLandmarks[2] = landmarks[13];
  filteredLandmarks[3] = landmarks[14];
  filteredLandmarks[4] = landmarks[15];
  filteredLandmarks[5] = landmarks[16];
  filteredLandmarks[6] = landmarks[23];
  filteredLandmarks[7] = landmarks[24];
  filteredLandmarks[8] = landmarks[25];
  filteredLandmarks[9] = landmarks[26];
  filteredLandmarks[10] = landmarks[27];
  filteredLandmarks[11] = landmarks[28];
  return filteredLandmarks;
}

function getBodyConnectors() {
  const connectors = [];
  PoseLandmarker.POSE_CONNECTIONS.forEach((item) => {
    const obj = {};

    if (
      (item.start >= 11 && item.start <= 16) ||
      (item.start >= 23 && item.start <= 28)
    ) {
      if (
        (item.end >= 11 && item.end <= 16) ||
        (item.end >= 23 && item.end <= 28)
      ) {
        if (item.start >= 11 && item.start <= 16) {
          obj.start = item.start - 11;
        } else if (item.start >= 23 && item.start <= 28) {
          obj.start = item.start - 17;
        }

        if (item.end >= 11 && item.end <= 16) {
          obj.end = item.end - 11;
        } else if (item.end >= 23 && item.end <= 28) {
          obj.end = item.end - 17;
        }

        connectors.push(obj);
      }
    }
  });
  return connectors;
}

function getPointers(
  firstLandmark,
  secondLandmark,
  thirdLandmark,
  videoWidth,
  videoHeight
) {
  const pointers = [];
  const landmarks = [firstLandmark, secondLandmark, thirdLandmark];

  for (let i = 0; i < 3; i++) {
    const point = {
      x: landmarks[i].x * videoWidth,
      y: landmarks[i].y * videoHeight,
    };
    pointers.push(point);
  }
  return pointers;
}

function getAngle(pointers) {
  const a =
    Math.pow(pointers[1].x - pointers[0].x, 2) +
    Math.pow(pointers[1].y - pointers[0].y, 2);
  const b =
    Math.pow(pointers[1].x - pointers[2].x, 2) +
    Math.pow(pointers[1].y - pointers[2].y, 2);
  const c =
    Math.pow(pointers[2].x - pointers[0].x, 2) +
    Math.pow(pointers[2].y - pointers[0].y, 2);

  return (Math.acos((a + b - c) / Math.sqrt(4 * a * b)) * 180) / Math.PI;
}

function getLeftElbowAngle(filteredLandmarks, videoWidth, videoHeight) {
  const leftElbowPointers = getPointers(
    filteredLandmarks[0],
    filteredLandmarks[2],
    filteredLandmarks[4],
    videoWidth,
    videoHeight
  );
  return getAngle(leftElbowPointers);
}

function getRightElbowAngle(filteredLandmarks, videoWidth, videoHeight) {
  const rightElbowPointers = getPointers(
    filteredLandmarks[1],
    filteredLandmarks[3],
    filteredLandmarks[5],
    videoWidth,
    videoHeight
  );
  return getAngle(rightElbowPointers);
}

function getLeftShoulderAngle(filteredLandmarks, videoWidth, videoHeight) {
  const leftShoulderPointers = getPointers(
    filteredLandmarks[6],
    filteredLandmarks[0],
    filteredLandmarks[2],
    videoWidth,
    videoHeight
  );
  return getAngle(leftShoulderPointers);
}

function getRightShoulderAngle(filteredLandmarks, videoWidth, videoHeight) {
  const rightShoulderPointers = getPointers(
    filteredLandmarks[7],
    filteredLandmarks[1],
    filteredLandmarks[3],
    videoWidth,
    videoHeight
  );
  return getAngle(rightShoulderPointers);
}

function getLeftKneeAngle(filteredLandmarks, videoWidth, videoHeight) {
  const leftKneePointers = getPointers(
    filteredLandmarks[6],
    filteredLandmarks[8],
    filteredLandmarks[10],
    videoWidth,
    videoHeight
  );
  return getAngle(leftKneePointers);
}

function getRightKneeAngle(filteredLandmarks, videoWidth, videoHeight) {
  const rightKneePointers = getPointers(
    filteredLandmarks[7],
    filteredLandmarks[9],
    filteredLandmarks[11],
    videoWidth,
    videoHeight
  );
  return getAngle(rightKneePointers);
}
