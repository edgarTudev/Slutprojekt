function showSection(sectionId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

const dropZoneHem = document.getElementById('dropZoneHem');
const fileInputHem = document.getElementById('fileInputHem');
const songListHem = document.getElementById('songListHem');

dropZoneHem.addEventListener('click', () => fileInputHem.click());
fileInputHem.addEventListener('change', (e) => handleFiles(e.target.files, songListHem));

dropZoneHem.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZoneHem.classList.add('dragover');
});
dropZoneHem.addEventListener('dragleave', () => dropZoneHem.classList.remove('dragover'));
dropZoneHem.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZoneHem.classList.remove('dragover');
    handleFiles(e.dataTransfer.files, songListHem);
});

function handleFiles(files, listElement) {
    for (let i = 0; i < files.length; i++) {
        if (files[i].type === 'audio/mpeg' || files[i].name.endsWith('.mp3')) {
            addSongToList(files[i], listElement);
        } else {
            alert('Vänligen ladda upp en giltig MP3-fil.');
        }
    }
}

function addSongToList(file, listElement) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const songCard = document.createElement('div');
        songCard.classList.add('song-card');
        songCard.innerHTML = `
            <h3>${file.name.replace('.mp3', '')}</h3>
            <audio controls src="${e.target.result}"></audio>
            <div class="rating-section">
                <label>Betyg:</label>
                <span class="stars" onclick="rateSong(event)">
                    <span data-value="1">★</span>
                    <span data-value="2">★</span>
                    <span data-value="3">★</span>
                    <span data-value="4">★</span>
                    <span data-value="5">★</span>
                </span>
                <span class="rating-text">(0/5)</span>
            </div>
            <div class="comments-section">
                <h4>Kommentarer</h4>
                <div class="comments-list"></div>
                <form class="comment-form" onsubmit="addComment(event)">
                    <input type="text" placeholder="Skriv en kommentar..." required>
                    <button type="submit">Skicka</button>
                </form>
            </div>
        `;
        listElement.appendChild(songCard);
    };
    reader.readAsDataURL(file);
}

function rateSong(e) {
    if (e.target.tagName === 'SPAN' && e.target.hasAttribute('data-value')) {
        const starsContainer = e.target.parentElement;
        const stars = starsContainer.children;
        const value = parseInt(e.target.getAttribute('data-value'));

        for (let i = 0; i < stars.length; i++) {
            if (i < value) {
                stars[i].classList.add('selected');
            } else {
                stars[i].classList.remove('selected');
            }
        }
        const ratingText = starsContainer.nextElementSibling;
        ratingText.textContent = `(${value}/5)`;
    }
}

function addComment(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input');
    const commentText = input.value.trim();

    if (commentText) {
        const commentsList = form.previousElementSibling;
        const newComment = document.createElement('p');
        newComment.classList.add('comment');
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);
        input.value = '';
    }
}

function addGlobalComment(e) {
    e.preventDefault();
    const nameInput = document.getElementById('commentNameInput').value;
    const textInput = document.getElementById('commentTextInput').value;

    const commentsList = document.getElementById('commentsList');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `<strong>${nameInput}:</strong> ${textInput}`;
    
    commentsList.appendChild(newComment);

    document.getElementById('commentNameInput').value = '';
    document.getElementById('commentTextInput').value = '';
}
