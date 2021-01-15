
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Using let because photos will channge everytime.

let photosArray =[];

// Unsplash API
const count =10;
const apiKey = 'Pku2An1xeykDfZdR9R_UMkI7UDj8Bu8DhMPoA2yugxQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// CREATE ELEMENTS FOR LINKS & PHOTOS, ADD TO DOM
function displayPhotos() {
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
    } catch (error) {
        // Catch ERROR HERE
    }
}


// ON LOAD (runs function)

getPhotos();