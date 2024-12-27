import { create } from 'zustand'

interface MediaState {
  mediaStream: MediaStream | null
  isMediaPermission: boolean
  error: string | null
  startMedia: () => void
  stopMedia: () => void
}

const useMedia = create<MediaState>((set, get) => ({
  mediaStream: null,
  isMediaPermission: false,
  error: null,

  startMedia: () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // Stopping Audio track after getting permission
        stream.getAudioTracks().forEach((track) => track.stop())

        set({
          mediaStream: stream,
          isMediaPermission: true,
          error: null,
        })
      })
      .catch((err) => {
        set({
          isMediaPermission: false,
          error: err instanceof Error ? err.message : 'Failed to get media permissions',
        })
      })
  },

  stopMedia: () => {
    const { mediaStream: stream } = get()
    if (stream) {
      if (stream.getVideoTracks && stream.getAudioTracks) {
        stream.getVideoTracks().map(track => {
          stream.removeTrack(track);
          track.stop();
        });
        stream.getAudioTracks().map(track => {
          stream.removeTrack(track);
          track.stop()
        });
      } else {
        ((stream as unknown) as MediaStreamTrack).stop();
      }
    }
    set({ mediaStream: null })
  },
}))

export default useMedia
