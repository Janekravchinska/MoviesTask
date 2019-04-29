

const {axios} = window;
const main = document.querySelector('.main');

const pgnFirst = document.getElementById('pgn-first');
const pgnLast = document.getElementById('pgn-last');
const pgnPrev = document.getElementById('pgn-prev');
const pgnNext = document.getElementById('pgn-next');
const pgnCurrent = document.getElementById('pgn-current');

const moviesApi = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=5874acfd11651a28c55771624f7021f4'; // should be moved to secret storage
let pageNum =1;
let searchInd = false;
const input = document.getElementById("mySearch");

let moviesURL = `${moviesApi}/movie/now_playing?${apiKey}`;



window.onload= ()=>{
	loadUsersTable();
	buttonListener();
  loadSearchListener();
  pagination();
}

async function loadSearchListener() {

  input.addEventListener("keyup", async event => {
    event.preventDefault()
    if (event.keyCode === 13) {
      pageNum =1;
      searchInd = true;
      console.log(searchInd);
      await searchUsers(input.value);
    }
  });
}

async function searchUsers(val) {
  response = await axios.get(`${moviesApi}/search/movie?${apiKey}&query=${val}&page=${pageNum}`);
  console.log(pageNum)
  dataList = response.data.results;
  dataList.sort((a, b) => a.popularity - b.popularity);
  main.innerHTML="";
  post(dataList);
}

async function buttonListener() {
  const popularBtn =document.getElementById('popular');
  const topratedBtn = document.getElementById('top-rated');
  const nowPlayingBtn = document.getElementById('now-played');

  popularBtn.onclick = ()=>{
    moviesURL =`${moviesApi}/movie/popular?${apiKey}&${pageNum}`;
    main.innerHTML="";
    pageNum=1;
    searchInd =false;
    loadUsersTable();
  
  }
  topratedBtn.onclick = ()=>{
    moviesURL =`${moviesApi}/movie/top_rated?${apiKey}&${pageNum}`; 
    main.innerHTML=""
    pageNum =1;
    searchInd =false;
    loadUsersTable();
  }
   nowPlayingBtn.onclick = ()=>{
    moviesURL =`${moviesApi}/movie/now_playing?${apiKey}&${pageNum}` 
    main.innerHTML="";
    pageNum=1;
    searchInd =false;
    loadUsersTable();
  }

}
function post(list){
  for( const element of list){
  	_madeMoviePos(element);
  }
}

async function loadUsersTable() {
  const response = await axios.get(`${moviesURL}&page=${pageNum}`);
  const dataList = response.data.results;
  dataList.sort((a, b) => a.popularity - b.popularity);
  console.log(dataList);
  post(dataList);
}

function pagination(){
    // const pgnFirst = document.getElementById('pgn-first');
    // const pgnLast = document.getElementById('pgn-last');
    // const pgnPrev = document.getElementById('pgn-prev');
    // const pgnNext = document.getElementById('pgn-next');
    // const pgnCurrent = document.getElementById('pgn-current');
  

    pgnFirst.onclick = () =>{
      main.innerHTML="";
      pageNum =1;
      if(searchInd){
        searchUsers(input.value);
      }
      else{
        loadUsersTable();}
    };
    pgnNext.onclick = () =>{
      main.innerHTML="";
      pageNum +=1;
      if(searchInd){
        searchUsers(input.value);
      }
      else{
        loadUsersTable();}

    }
    pgnPrev.onclick = () =>{
      main.innerHTML="";
      pageNum -=1;
      if(searchInd){
        searchUsers(input.value);
      }
      else{
        loadUsersTable();}

    }

  
}

function _madeMoviePos(obj) {
  pgnText();

	const wraperItem = document.createElement('div');
	wraperItem.setAttribute('class', 'item');

	const title =document.createElement('h3');
	title.innerHTML=`${obj.title}`

	const wraperImg = document.createElement('div');
	wraperImg.setAttribute('class', 'poster')

	const postImgA = document.createElement('a');
	postImgA.setAttribute('href', '#');

	const img = document.createElement('img');
	if (obj.poster_path !==null) {
		img.setAttribute('src', `https://image.tmdb.org/t/p/w1280${obj.poster_path}`);
	}
	else{
		img.setAttribute('class', 'without-img');
		img.setAttribute('src', 'images/no_img.jpg');
	}

	postImgA.appendChild(img);
	wraperImg.appendChild(postImgA);
	wraperItem.appendChild(wraperImg);
	wraperItem.appendChild(title);

	main.appendChild(wraperItem);	
}

function pgnText(){
  pgnCurrent.innerHTML=pageNum;
  pgnPrev.innerHTML=pageNum-1;
  if(pageNum <= 1){
    pgnPrev.setAttribute('class', 'display');
  }
  else{
    pgnPrev.removeAttribute('class')
  }
  pgnNext.innerHTML=pageNum+1;
}