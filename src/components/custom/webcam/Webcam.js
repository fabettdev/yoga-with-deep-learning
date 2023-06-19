import React, { Component } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { getPoseDraw } from "../../../utils/mediaPipeUtils";

class Webcam extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.canvasElement = React.createRef();
    this.canvasCtx = null;
    this.runningMode = "IMAGE";
    this.drawingUtils = null;
    this.poseLandmarker = null;
    this.webcamRunning = false;
    this.lastVideoTime = -1;
    this.color = "red";

    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    this.canvasCtx = this.canvasElement.current.getContext("2d");
    this.drawingUtils = new DrawingUtils(this.canvasCtx);
    this.createPoseLandmarker();
  }

  createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: "GPU",
      },
      runningMode: this.runningMode,
      numPoses: 2,
    });

    this.enableCam();
  };

  enableCam = () => {
    if (!this.poseLandmarker) {
      console.log("Wait! poseLandmaker not loaded yet.");
      return;
    }

    if (this.webcamRunning === true) {
      this.webcamRunning = false;
    } else {
      this.webcamRunning = true;
    }

    const constraints = {
      video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.video.current.srcObject = stream;
    });
  };

  predictWebcam = async () => {
    if (!this.canvasElement.current || !this.video.current) return;
    this.canvasElement.current.style.height = this.props.videoHeight + "px";
    this.video.current.style.height = this.props.videoHeight + "px";
    this.canvasElement.current.style.width = this.props.videoWidth + "px";
    this.video.current.style.width = this.props.videoWidth + "px";

    if (this.runningMode === "IMAGE") {
      this.runningMode = "VIDEO";
      await this.poseLandmarker.setOptions({ runningMode: "VIDEO" });
    } else {
      if (!this.state.ready)
        this.setState({
          ready: true,
        });
    }

    let startTimeMs = performance.now();
    if (this.lastVideoTime !== this.video.current.currentTime) {
      this.lastVideoTime = this.video.current.currentTime;
      this.poseLandmarker.detectForVideo(
        this.video.current,
        startTimeMs,
        (result) => {
          this.canvasCtx.save();
          this.canvasCtx.clearRect(
            0,
            0,
            this.canvasElement.current.width,
            this.canvasElement.current.height
          );

          if (
            this.props.currentExercise &&
            result.landmarks &&
            result.landmarks.length > 0
          ) {
            const measurements = [
              this.props.currentExercise,
              result.landmarks[0],
              this.props.videoWidth,
              this.props.videoHeight,
            ];

            const [landmarks, connectors, color] = getPoseDraw(...measurements);

            this.drawingUtils.drawLandmarks(landmarks, {
              radius: (data) =>
                DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1),
            });
            this.drawingUtils.drawConnectors(landmarks, connectors, {
              fillColor: "red",
              color: color,
            });
          }

          this.canvasCtx.restore();
        }
      );
    }

    if (this.webcamRunning === true) {
      window.requestAnimationFrame(this.predictWebcam);
    }
  };

  render() {
    const display = !this.state.ready ? "none" : "block";
    return (
      <>
        {!this.state.ready && (
          <div
            style={{
              width: this.props.videoWidth + "px",
              height: this.props.videoHeight + "px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        )}
        <video
          onCanPlay={this.predictWebcam}
          ref={this.video}
          style={{
            display,
            width: this.props.videoWidth + "px",
            height: this.props.videoHeight + "px",
          }}
          autoPlay
          playsInline
        ></video>
        <canvas
          className="output_canvas"
          ref={this.canvasElement}
          width={this.props.videoWidth}
          height={this.props.videoHeight}
          style={{ position: "absolute", display, left: 0, top: 0 }}
        ></canvas>
      </>
    );
  }
}

export default Webcam;
