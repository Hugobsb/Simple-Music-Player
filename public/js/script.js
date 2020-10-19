var songsArray = [];
var currentIndex = 0;
var audio;
var previousVolume = 0.3;
var repeat = false;

window.onload = () => {
    $.get('/getSongs', response => {
        songsArray = response;

        setupPlayer(0);
    });
};

function setupPlayer(index) {
    document.getElementById('song-image').src = (typeof songsArray[index].image === 'undefined') ? '../src/images/song.jpg' : songsArray[index].image;
    document.getElementById('background').style.backgroundImage = (typeof songsArray[index].image === 'undefined') ? "url('../src/images/song.jpg')" : `url('${songsArray[index].image}')`;
    document.getElementById('autor').textContent = songsArray[index].artist;
    document.getElementById('song').textContent = songsArray[index].title;
    audio = new Audio(songsArray[index].path);
    audio.addEventListener('loadeddata', () => {
        document.getElementById('end-number').textContent = `${parseInt(audio.duration / 60, 10)}:${String('0' + parseInt(audio.duration % 60)).slice(-2)}`;
        document.getElementById('progress').max = audio.duration;
        audio.addEventListener('timeupdate', () => {
            document.getElementById('initial-number').textContent = `${parseInt(audio.currentTime / 60, 10)}:${String('0' + parseInt(audio.currentTime % 60)).slice(-2)}`;
            document.getElementById('progress').value = audio.currentTime;
        });
        audio.addEventListener('ended', () => {
            if (!audio.repeat) handleForwarding();
        });
        songPlay();
    });
}

function handleRepeat() {
    if (repeat) {
        repeat = false;
        audio.repeat = false;
        document.getElementById('repeat-control').children[0].title = 'Repetição desativada';
    } else {
        repeat = true;
        audio.repeat = true;
        document.getElementById('repeat-control').children[0].title = 'Repetição ativada';
    }
}

function handleBackwarding() {
    if (currentIndex > 0) {
        songPause();
        currentIndex--;
        setupPlayer(currentIndex);
    }
}

function handleForwarding() {
    if (currentIndex < songsArray.length - 1) {
        songPause();
        currentIndex++;
        setupPlayer(currentIndex);
    }
}

function handleMuting() {
    if (document.getElementById('volume-control').style.opacity === '') {
        document.getElementById('volume-control').style.opacity = 0.3;
        if (audio) {
            previousVolume = audio.volume;
            audio.volume = 0;
        }

        return 0;
    }

    document.getElementById('volume-control').style.opacity = '';

    if (audio) audio.volume = previousVolume

    return 1;
}

function handlePausing() {
    if (document.getElementById('pause-img').classList.contains('hidden')) return songPlay();
    return songPause();
}

function songPause() {
    document.getElementById('pause-img').classList.add('hidden');
    document.getElementById('play-img').classList.remove('hidden');
    
    if (audio) audio.pause();
}

function songPlay() {
    document.getElementById('play-img').classList.add('hidden');
    document.getElementById('pause-img').classList.remove('hidden');

    if (audio) audio.play();
}

function handleProgressChange() {
    if (audio) audio.currentTime = document.getElementById('progress').value;
}

function handleVolumeChange() {
    if (audio) audio.volume = document.getElementById('volume').value;
}