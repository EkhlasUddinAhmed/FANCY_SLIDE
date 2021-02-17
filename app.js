const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
let div = document.createElement('div');

// selected image 
let sliders = [];
let imageNumber = 0;
let selectedImages = 0;

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';


// show images 
const showImages = (images) => {

  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);
  

  })

  imageNumber = images.length;
  toggleSpinner();
  

}

// Activate Enter KEY Starting
document.getElementById('search').addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById('search-btn').click();
  }
})
//Activate Enter Key Ending


const getImages = (query) => {

  toggleSpinner();
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))

}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  //element.classList.add('added');
  element.classList.toggle('added');


  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    //alert('Hey, Already added !')
    sliders.splice(item, 1);
    sliders = sliders;

  }

}
var timer
const createSlider = (sliders) => {

  div.innerText = "";

  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;

  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
        src="${slide}"
        alt="">`;
    sliderContainer.appendChild(item)
  })

  //Display Summary Start
  summaryDetails();

  ////Display Summary End

  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
  document.getElementById('duration').value="";
})

sliderBtn.addEventListener('click', function () {
  createSlider(sliders);

  
})


const toggleSpinner = () => {

  const spinner = document.getElementById('spinnerTesting');
  const imageDisplay = document.getElementById('imageDisplaySection');
  spinner.classList.toggle('initialSpinner');
  imageDisplay.classList.toggle('initialSpinner');
}

const summaryDetails = () => {

  
  const searchValue = document.getElementById('search').value;
  const displaySummary = document.getElementById('finalSummary');


  const display = `<h4 class="text-info">Got Total  ${imageNumber} Images of Type : <span class="text-capitalize">${searchValue} </span></h4> 
              <h4 class="text-info">U have Finally chosen ${sliders.length} Images for Slide Show</h4>`;

  div.innerHTML = display;
  displaySummary.appendChild(div);
  
}



