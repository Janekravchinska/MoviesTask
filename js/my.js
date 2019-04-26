

const {axios} = window;
const main = document.querySelector('.main');

const moviesApi = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=5874acfd11651a28c55771624f7021f4'; // should be moved to secret storage

let moviesURL = `${moviesApi}/movie/now_playing?${apiKey}`;



window.onload= ()=>{
	loadUsersTable();
	buttonListener();
	loadSearchListener();
}

async function loadSearchListener() {
  const input = document.getElementById("mySearch");

  input.addEventListener("keyup", async event => {
    event.preventDefault()
    if (event.keyCode === 13) {
      await searchUsers(input.value);
    }
  });
}

async function searchUsers(val) {
  const responseSearch = await axios.get(`${moviesApi}/search/movie?${apiKey}&query=${val}`);
  console.log(responseSearch);
 const searchList = [...responseSearch.data.results]
   .sort((a, b) => a.id - b.id);

  main.innerHTML="";
  for (const obj of searchList){
    _madeMoviePos(obj);
  }
}

async function buttonListener() {
  const popularBtn =document.getElementById('popular');
  const latestBtn = document.getElementById('latest');
  const topratedBtn = document.getElementById('top-rated');
  const nowPlayingBtn = document.getElementById('now-played');

  popularBtn.onclick = ()=>{
    moviesURL =`${moviesApi}/movie/popular?${apiKey}`;
    main.innerHTML="";
    loadUsersTable();
  }
  topratedBtn.onclick = ()=>{
    moviesURL =`${moviesApi}/movie/top_rated?${apiKey}`;
    console.log('ok');
    main.innerHTML=""
    loadUsersTable()
  }
   nowPlayingBtn.onclick = ()=>{
    moviesURL =`${moviesApi}/movie/now_playing?${apiKey}`
    console.log('ok');
    main.innerHTML="";
    loadUsersTable();
  }


    latestBtn.onclick = ()=>{
    moviesURL =`${moviesApi}/movie/latest?${apiKey}`
    console.log('ok')
    // loadUsersTable()
  }

}

async function loadUsersTable() {
  const response = await axios.get(moviesURL);
  const dataList = response.data.results;
  for( const element of dataList){
  	_madeMoviePos(element)
  }
}

function _madeMoviePos(obj) {

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