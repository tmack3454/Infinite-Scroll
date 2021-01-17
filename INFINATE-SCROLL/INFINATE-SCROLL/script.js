
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Using let because photos will channge everytime.

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[];
let isInitialLoad = true;


// Unsplash API Initial load
let initialCount = 5;
const apiKey = 'Pku2An1xeykDfZdR9R_UMkI7UDj8Bu8DhMPoA2yugxQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// API load after initial
function updateNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;
}

// Check if all images were loaded 
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
       }
}


// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// CREATE ELEMENTS FOR LINKS & PHOTOS, ADD TO DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    
    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
       
        // Create <a> (anchor element) to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank'); 
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create image for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_discription);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished 
        img.addEventListener('load', imageLoaded)
        
        // Put <img> inside the <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




// Get PHOTOS FROM UNSPLASH API
async function getPhotos() {
    try {
       const response = await fetch(apiUrl);
       photosArray = await response.json();
       displayPhotos();
       if (isInitialLoad) {
           updateNewCount(30);
           isInitialLoad = false;
       }
    } catch (error) {
        // Catch ERROR HERE
    }
}

// Check to see if scrollin near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
});
// ON LOAD (runs function)

getPhotos();