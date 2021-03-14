// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";

// Users

const USERS = "/users";
const PROFILE = "/:id";
const PROFILE_EDIT = `${PROFILE}/edit`;

// Video

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const VIDEO_DETAIL_EDIT = `${VIDEO_DETAIL}/edit`;


const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,

    users: USERS,
    profile: PROFILE,

    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: VIDEO_DETAIL
};

export default routes;