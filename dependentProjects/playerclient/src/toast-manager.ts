import $ from 'jquery';
import {IVideoDetails} from './models/video-details';
import {hide, show} from './util';

class ToastManager {

    private currentTimeout;
    private currentAddedSong;

    /**
     * Show a toast on screen.
     * @param text The text to display
     * @param iconName The icon to display
     * @param timeout The time to display the toast.
     * If this is '-1', the toast will not disappear until a new toast is displayed
     */
    public showToast(text: string, iconName: string = 'info', timeout: number = 3000) {

        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }

        $('#toast_icon').text(iconName);
        $('#toast_text').text(text);

        const toastElem = $('#toast');

        show(toastElem);

        if (timeout !== -1) {
            this.currentTimeout = setTimeout(() => {
                hide(toastElem);
                this.currentTimeout = undefined;
            }, timeout);
        }
    }

    public showVideoAddedNotification(video: IVideoDetails, user: string, position: 'FRONT'|'END') {
        if (this.currentAddedSong) {
            clearTimeout(this.currentAddedSong);
        }

        $('#added_song_img').attr('src', video.thumbnail.big);
        $('#added_song_title').text(video.title);
        $('#added_song_user').text(`Added by ${user}`);
        $('#added_song_icon').text(position === 'FRONT' ? 'queue_play_next' : 'add_to_queue');

        const toastElem = $('#added_song');

        show(toastElem);

        this.currentAddedSong = setTimeout(() => {
            hide(toastElem);
            this.currentAddedSong = undefined;
        }, 5000);
    }
}

export const toastManager = new ToastManager();
