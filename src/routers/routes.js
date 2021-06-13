const HOME = "/";
const LOGIN = "/login";
const RESULT = "/result";
const WATCH = "/watch";

// Channel

const CHANNEL = "/channel/:channel_id";
const VIDEOS = "/videos";
const PLAYLIST = "/playlist";
const UPLOAD = "/upload";
const FEATURED = "/featured";


const routes = {
    home: HOME,
    login: LOGIN,
    result: RESULT,
    watch: WATCH,

    channel: (channel_id) => {
        if (channel_id) {
            return `/channel/${channel_id}`
        } else {
            return CHANNEL
        }
    },
    featured: FEATURED,
    videos: VIDEOS,
    playlist: PLAYLIST,
    upload: VIDEOS + UPLOAD,
    editVideo: (video_id) => {
        if (video_id) {
            return `/videos/${video_id}/edit`;
        } else {
            return "/videos/:video_id/edit";
        }
    }
};

export default routes;