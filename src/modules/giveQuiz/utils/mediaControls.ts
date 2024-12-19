let mediaStream : MediaStream | null = null; // If we need to access any sort of media

export const startMedia = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      mediaStream = stream; 
    })
    .catch((error) => {
      console.error("Error accessing media devices:", error);
    });
}

export const stopMedia = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop()); // Will return an array, jiska [0] is the video track and [1] is the audio track.
    }
    mediaStream = null;
}
