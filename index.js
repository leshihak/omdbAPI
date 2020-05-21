const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const cross = document.querySelector('.cross');
const blockOfFilms = document.querySelector('.film-blocks');
const description = document.querySelector('.description');
const formFilm = document.forms['nav'];

searchBtn.onclick = async (event) => {
  event.preventDefault();
  const inputValue = search.value;
  const res = await fetch(`http://www.omdbapi.com/?apikey=d2e0794b&s=${inputValue}`);
  const data = await res.json()
  const arrayOfFilms = data.Search;
  console.log(arrayOfFilms);
  
  arrayOfFilms.forEach(film => {
    let block = document.createElement('div');
    let img = document.createElement('img');
    let name = document.createElement('div');
    let type = document.createElement('div');
    let year = document.createElement('div');
    let btnDetails = document.createElement('button');
    block.classList.add('block');
    img.classList.add('poster');
    name.classList.add('name');
    type.classList.add('txt');
    year.classList.add('txt');
    btnDetails.classList.add('film-btn');
    btnDetails.classList.add('film-btn:hover');
    img.src = film.Poster;
    name.innerText = film.Title;
    type.innerText = film.Type;
    year.innerText = film.Year;
    btnDetails.innerText = 'More details';
    blockOfFilms.appendChild(block);
    block.appendChild(img);
    block.appendChild(name);
    block.appendChild(type);
    block.appendChild(year);
    block.appendChild(btnDetails);

    let filmAPI = film.imdbID;
    btnDetails.addEventListener('click', async () => {
      const responsive = await fetch(`http://www.omdbapi.com/?apikey=d2e0794b&i=${filmAPI}`);
      const dataBtn = await responsive.json()
      description.classList.add('show');
      description.classList.remove('hide');
      console.log(dataBtn);

      let imgBlock = document.createElement('div');
      let filmBlock = document.createElement('div');
      let img = document.createElement('img');
      let name = document.createElement('div');
      let type = document.createElement('div');
      let plot = document.createElement('div');
      let write = document.createElement('div');
      let direct = document.createElement('div');
      let star = document.createElement('div');
      let box = document.createElement('div');
      let award = document.createElement('div');
      let rate = document.createElement('div');
      let btnClose = document.createElement('button');
      img.classList.add('poster-descr');
      filmBlock.classList.add('film-description');
      name.classList.add('name-descr');
      type.classList.add('txt-descr');
      plot.classList.add('main-descr');
      write.classList.add('main-descr');
      direct.classList.add('main-descr');
      star.classList.add('main-descr');
      box.classList.add('main-descr');
      award.classList.add('main-descr');
      rate.classList.add('main-descr');
      btnClose.classList.add('film-btn-descr');
      btnClose.classList.add('film-btn-descr:hover');
      img.src = dataBtn.Poster;
      name.innerHTML = dataBtn.Title;
      type.innerHTML = `${dataBtn.Rated} ${dataBtn.Year} ${dataBtn.Genre}`;
      plot.innerHTML = dataBtn.Plot;
      write.innerHTML = `<b>Written by:</b> ${dataBtn.Writer}`;
      direct.innerHTML = `<b>Directed by:</b> ${dataBtn.Director}`;      
      star.innerHTML = `<b>Starring:</b> ${dataBtn.Actors}`;
      box.innerHTML = `<b>BoxOffice:</b> ${dataBtn.imdbVotes}$`;
      award.innerHTML = `<b>Awards:</b> ${dataBtn.Awards}`;
      rate.innerHTML = `<b>Ratings:</b><br>${dataBtn.Ratings[0].Source} ${dataBtn.Ratings[0].Value}<br>${dataBtn.Ratings[1].Source} ${dataBtn.Ratings[1].Value}`;
      btnClose.innerText = 'Close film';
      description.appendChild(imgBlock);
      description.appendChild(filmBlock);
      imgBlock.appendChild(img);
      filmBlock.appendChild(name);
      filmBlock.appendChild(type);
      filmBlock.appendChild(plot);
      filmBlock.appendChild(write);
      filmBlock.appendChild(direct);
      filmBlock.appendChild(star);
      filmBlock.appendChild(box);
      filmBlock.appendChild(award);
      filmBlock.appendChild(rate);
      filmBlock.appendChild(btnClose);

      btnClose.onclick = function() {
        description.classList.add('hide');
        description.classList.remove('show');
        description.removeChild(filmBlock);
        description.removeChild(imgBlock);
      }
    })
    
    cross.addEventListener('click', () => {
      formFilm.reset();
      blockOfFilms.removeChild(block);
    })
  });
};

