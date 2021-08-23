const watch_player = document.getElementById("player_container");
const watch_player_bottom = watch_player.querySelector(".player_bottom");
const watch_player_video = document.getElementById("player_video");
const watch_player_play = document.getElementById("player_play");
const watch_player_mute = document.getElementById("player_mute");
const watch_player_expand = document.getElementById("player_expand");

const watch_player_time_current = document.getElementById("player_time_current");
const watch_player_time_duration = document.getElementById("player_time_duration");

const watch_progress = watch_player_bottom.querySelector(".progress_wrap");
const watch_progress_hover = watch_progress.querySelector(".progress_hover");
const watch_progress_played = watch_progress.querySelector(".progress_played");
const watch_progress_loaded = watch_progress.querySelector(".progress_loaded");
const watch_progress_handler = watch_progress.querySelector(".progress_handler_container");

const watch_volume = watch_player_bottom.querySelector(".player_volume_range");
const watch_volume_slider = watch_volume.querySelector(".player_volume_handler");

const watch_theaterView = document.getElementById("player_theaterView");
const watch_theater_container = document.querySelector(".watch_theater_container");
const watch_player_container_inner = document.querySelector(".player_container_inner");

let viewed = false;
let timer = null;

const doubleToTime = (double) => {
    let time = "";
    const double_sec = Math.floor(double);
    const double_min = Math.floor(double_sec / 60);
    const hour = Math.floor(double_min / 60);

    const sec = double_sec % 60;
    const min = double_min % 60;
    if (sec < 10) {
        time = `0${sec}`;
    } else {
        time = `${sec}`;
    }
    if (double_min == 0) {
        time = `0:${time}`;
    } else {
        time = `${min}:${time}`;
    }

    if (hour > 0) {
        if (min < 10) {
            time = `${hour}:0${time}`;
        } else {
            time = `${hour}:${time}`;
        }
    }

    return time;
};

const viewBottom = () => {
    if (timer != null) {
        clearTimeout(timer);
        timer = null;
    }
    watch_player_bottom.classList.add("opacity");
    watch_player.style.cursor = "default";
};
const hiddenBottom = () => {
    if (!watch_player_video.paused) {
        if (timer != null) {
            clearTimeout(timer);
        }
        watch_player_bottom.classList.remove("opacity");
        watch_player.style.cursor = "none";
    }
};
const hiddenBottom3s = () => {
    if (!watch_player_video.paused) {
        if (timer != null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            watch_player_bottom.classList.remove("opacity");
            watch_player.style.cursor = "none";
        }, 3000);
    }
};
const view3sec = () => {
    viewBottom();
    hiddenBottom3s();
};


const handleLoadmetadata = () => {
    watch_player_time_current.innerText = doubleToTime(watch_player_video.currentTime);
    watch_player_time_duration.innerText = doubleToTime(watch_player_video.duration);

    watch_progress_played.style.transform = `scaleX(${watch_player_video.currentTime / watch_player_video.duration})`;

    if (watch_player_video.muted) {
        watch_volume_slider.style.left = "0px";
        watch_player_mute.innerHTML = "<i class = 'fas fa-volume-mute fa-2x'></i>";
    } else if (watch_player_video.volume == 0) {
        watch_volume_slider.style.left = watch_player_video.volume * 40 + "px";
        watch_player_mute.innerHTML = "<i class = 'fas fa-volume-mute fa-2x'></i>";
    } else if (watch_player_video.volume <= 20) {
        watch_volume_slider.style.left = watch_player_video.volume * 40 + "px";
        watch_player_mute.innerHTML = "<i class = 'fas fa-volume-down fa-2x'></i>";
    } else {
        watch_volume_slider.style.left = watch_player_video.volume * 40 + "px";
        watch_player_mute.innerHTML = "<i class = 'fas fa-volume-up fa-2x'></i>";
    }

    if (watch_player_video.paused) {
        watch_player_play.innerHTML = "<i class = 'fas fa-play fa-2x'></i>";
    } else {
        watch_player_play.innerHTML = "<i class = 'fas fa-pause fa-2x'></i>";
    }
};
const handlePlayClick = () => {
    if (watch_player_video.paused) {
        watch_player_video.play();
        watch_player_play.innerHTML = "<i class = 'fas fa-pause fa-2x'></i>";
        hiddenBottom3s();
    } else {
        watch_player_video.pause();
        watch_player_play.innerHTML = "<i class = 'fas fa-play fa-2x'></i>";
        viewBottom();
    }
};
const handleProgress = (e) => {
    watch_progress_played.style.transitionDuration = "0s";
    watch_progress_handler.style.transitionDuration = "0s";
    const base = watch_progress.getBoundingClientRect().left;
    let value = e.clientX - base;
    if (value < 0) {
        value = 0;
    } else if (value > watch_progress.clientWidth) {
        value == watch_progress.clientWidth;
    }
    watch_progress_handler.style.transform = `translateX(${value}px)`;
    watch_progress_played.style.transform = `scaleX(${value / watch_progress.clientWidth})`;
    if (watch_player_video.ended) {
        watch_player_video.currentTime = value / watch_progress.clientWidth * watch_player_video.duration;
        handlePlayClick();
    } else {
        watch_player_video.currentTime = value / watch_progress.clientWidth * watch_player_video.duration;
    }
};
const handleVolumeSlider = (e) => {
    viewBottom();
    const base = watch_volume.getBoundingClientRect().left;
    let value = e.clientX - base - 6;
    if (value < 0) {
        value = 0;
    } else if (value > 40) {
        value = 40;
    }
    if (value == 0) {
        watch_player_mute.innerHTML = "<i class = 'fas fa-volume-mute fa-2x'></i>";
    } else if (value <= 20) {
        watch_player_mute.innerHTML = "<i class = 'fas fa-volume-down fa-2x'></i>";
    } else {
        watch_player_mute.innerHTML = "<i class = 'fas fa-volume-up fa-2x'></i>";
    }
    watch_player_video.volume = value / 40;
    watch_volume_slider.style.left = value + "px";
};

if (watch_player_play) {
    watch_player_play.addEventListener("click", handlePlayClick);
    watch_player_video.addEventListener("click", handlePlayClick);
}
if (watch_player_mute) {
    watch_player_mute.addEventListener("click", () => {
        if (watch_player_video.muted) {
            watch_player_video.muted = false;
            watch_volume_slider.style.left = watch_player_video.volume * 40 + "px";
            watch_player_mute.innerHTML = "<i class = 'fas fa-volume-up fa-2x'></i>";
        } else {
            watch_player_video.muted = true;
            watch_volume_slider.style.left = "0px";
            watch_player_mute.innerHTML = "<i class = 'fas fa-volume-mute fa-2x'></i>";
        }
    });
}

if (watch_theaterView) {
    watch_theaterView.addEventListener("click", () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        view3sec();
        if (watch_theater_container.childNodes.length == 0) {
            watch_theater_container.insertBefore(watch_player, null);
            watch_theaterView.children[0].children[0].setAttribute("d", "m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z");
        } else {
            watch_player_container_inner.insertBefore(watch_player, null);
            watch_theaterView.children[0].children[0].setAttribute("d", "m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z");
        }
    });
}

if (watch_player_expand) {
    watch_player_expand.addEventListener("click", () => {
        if (document.fullscreenElement == watch_player) {
            document.exitFullscreen();
            view3sec();
        } else {
            watch_player.requestFullscreen();
        }
    });
    watch_player.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement == watch_player) {
            watch_player_expand.innerHTML = "<i class = 'fas fa-compress fa-2x'></i>";
        } else {
            watch_player_expand.innerHTML = "<i class = 'fas fa-expand fa-2x'></i>";
        }
    });
}

if (watch_player_video) {
    watch_player.addEventListener("mousemove", () => {
        view3sec();
        watch_player.style.cursor = "default";
    });
    watch_player.addEventListener("mouseleave", hiddenBottom);
    watch_progress.addEventListener("mousemove", (e) => {
        viewBottom();
        const width = e.clientX - watch_progress_handler.getBoundingClientRect().left - 6.5;
        if (width > 0) {
            watch_progress_hover.style.left = (watch_progress_handler.getBoundingClientRect().left + 6.5 - watch_progress.getBoundingClientRect().left) + "px";
            watch_progress_hover.style.transform = `scaleX(${width / watch_progress.clientWidth})`;
        }
    });

    window.addEventListener("mouseup", () => {
        hiddenBottom3s();
        window.removeEventListener("mousemove", handleVolumeSlider);
        window.removeEventListener("mousemove", handleProgress);
    });

    watch_volume.addEventListener("mousedown", (e) => {
        viewBottom();
        handleVolumeSlider(e);
        window.addEventListener("mousemove", handleVolumeSlider);
    });


    watch_progress.addEventListener("mousedown", (e) => {
        viewBottom();
        handleProgress(e);
        window.addEventListener("mousemove", handleProgress);
    });


    watch_player_video.addEventListener("timeupdate", () => {
        if (watch_player_video.paused) {
            watch_progress_played.style.transitionDuration = "0s";
            watch_progress_handler.style.transitionDuration = "0s";
        } else {
            watch_progress_played.style.transitionDuration = ".25s";
            watch_progress_handler.style.transitionDuration = ".25s";
        }
        watch_player_time_current.innerText = doubleToTime(watch_player_video.currentTime);
        watch_progress_played.style.transform = `scaleX(${watch_player_video.currentTime / watch_player_video.duration})`;
        watch_progress_handler.style.transform = `translateX(${watch_progress.clientWidth * watch_player_video.currentTime / watch_player_video.duration}px)`;

        if (watch_player_video.played.length > 0 && !viewed) {
            let played = 0;
            for (let i = 0; i < watch_player_video.played.length; i++) {
                played += watch_player_video.played.end(i) - watch_player_video.played.start(i);
            }
            if (played > 2 * watch_player_video.duration / 3) {
                viewed = true;
                fetch(`/view?v=${watch_player.dataset.id}`, { method: "POST" });
            }
        }
    });
    watch_player_video.addEventListener("ended", () => {
        viewBottom();
        watch_player_play.innerHTML = "<i class = 'fas fa-undo fa-2x'></i>";
    });
    watch_player_video.addEventListener("loadedmetadata", handleLoadmetadata);
    watch_player_video.addEventListener("progress", () => {
        if (watch_player_video.buffered.length == 1) {
            watch_progress_loaded.style.transform = `scaleX(${watch_player_video.buffered.end(0) / watch_player_video.duration})`;
        }
    });
    watch_player_video.addEventListener("volumechange", () => {
        if (!watch_player_video.muted) {
            watch_volume_slider.style.left = watch_player_video.volume * 40 + "px";
        }
    });
    handleLoadmetadata();
}

