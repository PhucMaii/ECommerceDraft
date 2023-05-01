// Take the id from req.params
const url = window.location.href;
const id = url.substring(url.lastIndexOf('/') + 1);
console.log(id);

const image = document.querySelectorAll('.image');
const imageContainer = document.querySelector('#image-slider');
// Count how many images in total in image slider
const imgCounts = imageContainer.childElementCount;

let percentageUp = 0;

function up() {
    // -2, because I have the button-group div in imageContainer and the percentage should be less than the images 1 and times 100%
    if(percentageUp < ((imgCounts - 2) * 100)) {
        percentageUp += 100;
    }


    for(let i = 0; i < image.length; i++) {
        image[i].style.transform = `translateY(-${percentageUp}%)`;
    }
}

function down() {

    if(percentageUp <= 0) {
        percentageUp = 0;
    } else {
        percentageUp -= 100;
    }

    for(let i = 0; i < image.length; i++) {
        image[i].style.transform = `translateY(-${percentageUp}%)`;
    }
}