const HOME = "/";
const LOGIN = "/login";
const UPLOAD = "/upload";
const EDIT = "/edit";
const RESULT = "/result";
const WATCH = "/watch";

// Channel

const CHANNEL = "/channel/:id";
const VIDEOS = "/videos";
const PLAYLIST = "/playlist";


const routes = {
    home: HOME,
    login: LOGIN,
    result: RESULT,
    edit: EDIT,
    watch: WATCH,

    channel: (id) => {
        if (id) {
            return `/channel/${id}`
        } else {
            return CHANNEL
        }
    },
    videos: (id) => {
        if (id) {
            return `/channel/${id}/videos`
        } else {
            return VIDEOS
        }
    },
    playlist: (id) => {
        if (id) {
            return `/channel/${id}/playlist`
        } else {
            return PLAYLIST
        }
    },
    upload: UPLOAD,
};

export default routes;