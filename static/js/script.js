searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  // searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 3000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 6500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const form = document.getElementById('search-form');
const input = document.getElementById('search-box');

// get a reference to the element that will display the search results
const results = document.getElementById('results');

// handle the form submission
form.addEventListener('submit', event => {
    // prevent the form from submitting
    event.preventDefault();

    // get the search query from the input field
    const query = input.value;

    // search the JSON file for the query and display the results
    searchJSON(query, results);
});

function searchJSON(query, results) {
  // load the JSON file
  fetch('static/json/books.json')
      .then(response => response.json())
      .then(data => {
          // search the data for the query
          const filteredData = data.filter(book => {
              return book.book_title.toLowerCase().includes(query.toLowerCase());
          });

          // check if there are any results
          if (filteredData.length > 0) {
              // transform the search results into HTML elements
              const html = filteredData.map(book => {
                  return `
                  <div class="result_product" >
                    <div class="books_info">
                        <div id="results"></div>
                        <div class="id">
                            <h1>${book.id}</h1>
                        </div>
                        <div class="books_image">
                            <img src="${ book.image }" alt="${ book.book_title }">
                        </div>
                        <div class="product-summary">
                            <div class="title">
                                <h1>${book.book_title}</h1>
                            </div>
                            <div class="author-publisher">
                                <p>${book.book_author}</p>
                                <p>Publisher:${book.publisher}</p>
                            </div>
                            <div class="attributes">
                                <div class="attributes">Release : ${book.release}</div>
                                <div class="attributes">Language : ${book.language}</div>
                            </div>
                            <div class="price-attrib">
                                <div class="price"> <strong>&#8377;</strong> ${book.price}</div>
                                <div class="right_hub">
                                </div>
                            </div>
                            <div class="action">
                                <div class="action-btn">
                                    <input type="button" id="buy-now" value="Buy Now">
                                    <div id="add_to_cart" class="fas fa-shopping-cart"></div>
                                    <div id="add_to_fav" class="fas fa-heart"></div>
                                </div>
                            </div>
                        </div>
        
                    </div>

                  </div>
                `;
              });

              // insert the HTML elements into the page
              results.innerHTML = html.join('');
          } else {
              // display a message if no results are found
              results.innerHTML = '<p>Book not available.</p>';
          }
      });
}



