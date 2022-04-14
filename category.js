const gameCategory = document.getElementById('gaming');
const historyCategory = document.getElementById('history');
const sportsCategory = document.getElementById('sport');

var fetchUrl;
localStorage.clear();

gameCategory.addEventListener('click', function onClick()  {
    fetchUrl = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple';
    localStorage.setItem('url', fetchUrl);
    location.href = './game.html';
});

historyCategory.addEventListener('click', function onClick()  {
    fetchUrl = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple';
    localStorage.setItem('url', fetchUrl);
    location.href = './game.html';
});

sportsCategory.addEventListener('click', function onClick()  {
    fetchUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';
    localStorage.setItem('url', fetchUrl);
    location.href = './game.html';
});

