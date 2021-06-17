// console.log('Hello world');

// let name = prompt('Enter your name!');
// console.log('Name: ' + name);

// let confirmVar = confirm('Are you older than 18?');

// !confirmVar ? window.location.reload() : true;

const header = document.querySelector('#mainNav');
window.onscroll = (event) => {
    console.log(event);
    if (window.pageYOffset === 0) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
};

const imgs = document.querySelectorAll('img');
imgs.forEach((imgs) => {
    // imgs.addEventListener('mouseover', function() {
    //     this.classList.remove('shrink');
    //     this.classList.add('grow');
    // });
    // imgs.addEventListener('mouseout', function() {
    //     this.classList.remove('grow');
    //     this.classList.add('shrink');
    // });
    imgs.addEventListener('mouseover', function() {
        this.classList.toggle('grow');
    });
    imgs.addEventListener('mouseout', function() {
        this.classList.toggle('grow');
    });
});