export enum PrivacyMode {
    FULL_NAMES, // If a user added the song their full name is displayed on TV
    USER_OR_AUTO, // If a user added the song, "Added by user" is displayed , otherwise "Added automatically"
    HIDDEN, // No information is displayed relating to user adding the song.
}

export enum PlayerState {
    UNKNOWN = 'UNKNOWN', // We don't know. We either have conflicting data or the reported state isn't recognised
    BUFFERING = 'BUFFERING', // The player is buffering a video
    CUED = 'CUED', // A video is cued, but hasn't begun buffering or playing yet
    ENDED = 'ENDED', // The video has ended, but the player hasn't been unloaded yet
    LOADED = 'LOADED', // The player has loaded. This is the only event which fires if the player
    NOTPLAYING = 'NOTPLAYING', // The player exists, but nothing is playing
    PAUSED = 'PAUSED', // The player has a paused video
    PLAYING = 'PLAYING', // The player is playing a video
    UNLOADED = 'UNLOADED', // The player is no longer loaded in a web browser. Possibly awaiting reload
    UNSTARTED = 'UNSTARTED', // The player exists, but no video has been cued yet
}
