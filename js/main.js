//Hamburger Menu
(() => {

  //VARIABLES

  const hamburgerMenu = document.querySelector('#hamburger-menu');
  const mainNav = document.querySelector('#main-nav');
  const header = document.querySelector('#main-header');
  

  //FUNCTIONS

  // Toggles classes for showing/hiding mobile menu stuff
  function toggleMenu() {
    if (window.innerWidth < 1200) {
      hamburgerMenu.classList.toggle('activate');
      mainNav.classList.toggle('show');
      header.classList.toggle('menu-open');
    }
  }

  // Resets the menu for large screens
  function hideMenu() {
    if (window.innerWidth >= 1200) {
      hamburgerMenu.classList.remove('activate');
      mainNav.classList.remove('show');
      header.classList.remove('menu-open');
    }
  }

  // EVENT LISTENERS
  hamburgerMenu.addEventListener('click', toggleMenu);
  window.addEventListener('resize',hideMenu);

})();

//Plyr - Video Player
(() => {

const player = new Plyr('.player', {
  settings: [
      'play-large',
      'play',    
      'progress', 
      'current-time',
      'mute',     
      'volume',
      'fullscreen' 
  ]
  }); //Sets controls to remove defaults to get rid of settings

})();

//Earbuds Scrub
(() => {

  const canvas = document.querySelector('#explode-view');
  const context = canvas.getContext('2d');

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 9 / 16;
  }

  setCanvasSize();
  
  //Resets canvas size when window is resized
  window.addEventListener('resize', setCanvasSize); 

  const frameCount = 280; //How many still frames

  const images = [];

  for(let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/earbud_${((i+1).toString().padStart(5, '0'))}.png`;
      images.push(img);
  }

  const buds = {
      frame: 0
  }

  gsap.to(buds, {
      frame: 279,
      snap: "frame",
      scrollTrigger: {
          trigger: "#explode-view",
          pin: true,
          scrub: 1,
          markers: true,
          start: "top top",
          end: "500% top"
      },
      onUpdate: render

  })

  images[0].addEventListener('load', render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0, canvas.width, canvas.height);
  }

})();

//Model Viewer
(() => {

  //VARIABLES

  const model = document.querySelector("#model");
  const hotspotDots = document.querySelectorAll(".Hotspot-dot");

  const infoBoxes = [
      { title: 'SECURE FIT WING', text: 'Ergonomic wing design ensures a secure and comfortable fit during any activity.', image: 'images/secure-fit.svg' },
      { title: 'MULTI-FUNCTION BUTTON', text: 'One button to control music, calls, and voice assistant functions.', image: 'images/multi-function.svg' },
      { title: 'AMBIENT SOUND MODE', text: 'Stay aware of your surroundings for safe, focused training without missing a beat.', image: 'images/ambient-sound.svg' },
      { title: 'NOISE-ISOLATING TIPS', text: 'Soft silicone tips to block external noise for immersive audio experiences.', image: 'images/noise-cancelling.svg' },
      { title: 'IPX6 WATER RESISTANT', text: 'Engineered to withstand sweat and rain, perfect for intense workouts.', image: 'images/water-resistant.svg' },
      { title: 'SUPER FAST CHARGING', text: 'Enjoy rapid charging for minimal downtime and maximum playtime.', image: 'images/fast-charge.svg' }
    ];

  //FUNCTIONS

  //Creates hotspot elements using array content and appends them to hotspot annotation divs
  function loadInfo() {
    infoBoxes.forEach((infoBox, index)=> {

      let selected = document.querySelector(`#hotspot-${index+1}`);

      //Changed to innerHTML to add divs - seperating image and text
      selected.innerHTML = 
      `
          <div class="info-card-image">
              <img src="${infoBox.image}" alt="feature icon">
          </div>
          <div class="info-card-text">
              <h3>${infoBox.title}</h3>
              <p>${infoBox.text}</p>
          </div>
      `

    });
  }

  //Shows hotspot annotation
  function showInfo() {

    //I changed the selector as I prefered to have the hover functionality only on the hotspot dots
    const parent = this.parentElement;
    const selected = document.querySelector(`#${parent.slot}`);

    gsap.set(selected, {autoAlpha: 0, scale: 0.6, rotation: -5 });
    gsap.to(selected, {autoAlpha: 1, scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)"});

    //Adds class once hotspot has been hovered to stop animation and change content
    parent.classList.add('hovered');
  }
  
  //Hides hotspot annotation
  function hideInfo() {

    const parent = this.parentElement;
    const selected = document.querySelector(`#${parent.slot}`);

    //Fixes issue of info staying shown if moving mouse before animation finishes
    gsap.killTweensOf(selected);

    gsap.to(selected, {autoAlpha: 0, scale: 0.8, rotation: -5, duration: 0.3, ease: "power3.in"});
  }
  
  //Loads model first before hotspot content (only on tablet and )
  function modelLoaded() {
      loadInfo();
  }

  //EVENT LISTENERS

  model.addEventListener("load", modelLoaded);

  hotspotDots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
});

})();


//Features
(() => {

  //VARIABLES
  const infoCardImage = document.querySelectorAll('.info-card-image');
  const infoCardText = document.querySelectorAll('.info-card-text');


  //FUNCTIONS
  function toggleInfoText(event) {
    const clickedElement = event.target.closest('.info-card-image');
    
    infoCardImage.forEach((image, index) => {
        if (image === clickedElement) {
            infoCardText[index].classList.toggle('show');
            image.classList.toggle('active'); 
        }
    });
  }

  //EVENT LISTENERS

  infoCardImage.forEach(image => {
    image.addEventListener('click', toggleInfoText);
  }); 

})();

//X-Ray Slider
(() => {

  //VARIABLES
  const divisor = document.querySelector('#divisor');
  const slider = document.querySelector('#slider');

  //FUNCTIONS
  function moveDivisor() {
    divisor.style.width = `${slider.value}%`;
  }

  function resetSlider() {
    slider.value = 50; 
  }

  //EVENT LISTENERS
  slider.addEventListener('input', moveDivisor);
  window.addEventListener('load', resetSlider);
})();


//GSAP
(() => {

    gsap.registerPlugin(ScrollTrigger);
    
    // //gsap.utils is a collection of methods from GSAP
    // //Takes a bunch of elements and turns them into an Array so we can mass apply a basic scrollTrigger animation
    // gsap.utils.toArray("#hero-video-con, #hero-text, .player").forEach((item) => {
    
    // //Sets initial state
    // gsap.set(item, { opacity: 0, y: 50 });
    
    // gsap.to(item, {
    //     scrollTrigger: {
    //     trigger: item, 
    //     start: "top 90%",
    //     end: "bottom 75%",
    //     toggleActions: "play none none reverse",
    //     scrub: true,
    //     },
    //     opacity: 1, 
    //     y: 0,  
    //     duration: 1, 
    //     ease: "power2.inOut",
    // });
    // });
    
    //VARIABLES
    const oddInfoCards = document.querySelectorAll(".info-card:nth-child(odd)");
    const evenInfoCards = document.querySelectorAll(".info-card:nth-child(even)");
    const scrollAnimation = document.querySelectorAll('.scroll-animation');

    scrollAnimation.forEach((element) => {
      gsap.from(element, {
        y: 50, 
        opacity: 0,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 75%", 
          toggleActions: "play none none reverse",
          scrub: 0.1,
        },
        duration: 0.5, 
        ease: "power2.out", 
      });
    });

    oddInfoCards.forEach((card) => {
      gsap.set(card, { opacity: 0, x: 50 });
    
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%", 
          end: "top 50%", 
          toggleActions: "play none none reverse",
          scrub: 0.3,
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power1.out", 
      });
    });
    
    evenInfoCards.forEach((card) => {
      gsap.set(card, { opacity: 0, x: -50 });
    
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          scrub: 0.3,
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power1.out",
      });
    });

})();
