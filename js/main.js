//Hamburger Menu
(() => {

  //VARIABLES

  const hamburgerMenu = document.querySelector('#hamburger-menu');
  const mainNav = document.querySelector('#main-nav');
  const header = document.querySelector('#main-header');
  

  //FUNCTIONS

  function toggleMenu() {
    if (window.innerWidth < 1200) {
      hamburgerMenu.classList.toggle('activate');
      mainNav.classList.toggle('show');
      header.classList.toggle('menu-open');
    }
  }

  function hideMenu() {
    //Resets the menu for desktop
    if (window.innerWidth >= 1200) {
      hamburgerMenu.classList.remove('activate');
      mainNav.classList.remove('show');
      header.classList.remove('menu-open');
    }
  }

  //EVENT LISTENERS

  hamburgerMenu.addEventListener('click', toggleMenu);
  window.addEventListener('resize', hideMenu);

})();


//----------------------------------------------------------------------------------//


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


//----------------------------------------------------------------------------------//


//Earbuds Scrub
(() => {

  //VARIABLES

  const canvas = document.querySelector('#explode-view');
  const context = canvas.getContext('2d');
  const frameCount = 280;
  const images = [];
  const buds = {
    frame: 0
  };
  
  //FUNCTIONS

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 9 / 16;
  }

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0, canvas.width, canvas.height);
  }

  setCanvasSize();

  for(let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/earbud_${((i+1).toString().padStart(5, '0'))}.png`;
      images.push(img);
  }

  gsap.to(buds, {
      frame: 279,
      snap: "frame",
      scrollTrigger: {
          trigger: "#explode-view",
          pin: true,
          scrub: 1,
          start: "top top",
          end: "500% top"
      },
      onUpdate: render

  })

  //EVENT LISTENERS

  images[0].addEventListener('load', render);

  //Resets canvas size when window is resized
  window.addEventListener('resize', setCanvasSize); 


})();


//----------------------------------------------------------------------------------//


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


//----------------------------------------------------------------------------------//


//Features
(() => {

  const infoCards = document.querySelectorAll('.info-card');

  infoCards.forEach(card => {

    const image = card.querySelector('.info-card-image');
    const text = card.querySelector('.info-card-text');

    function toggleInfo() {
      text.classList.toggle('show');
      image.classList.toggle('active');
    }

    image.addEventListener('click', toggleInfo);

  });

})();


//----------------------------------------------------------------------------------//


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


//----------------------------------------------------------------------------------//


//GSAP
(() => {

    gsap.registerPlugin(ScrollTrigger);
    
    //VARIABLES
    const oddInfoCards = document.querySelectorAll('.info-card:nth-child(odd)');
    const evenInfoCards = document.querySelectorAll('.info-card:nth-child(even)');
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
        duration: 1, 
        ease: "power2.out", 
      });
    });

    oddInfoCards.forEach((card) => {
      gsap.from(card, {
        x: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: card,
          start: "top 80%", 
          end: "top 60%", 
          toggleActions: "play none none reverse",
          scrub: 0.3,
        },
        duration: 1,
        ease: "power1.out", 
      });
    });
    
    evenInfoCards.forEach((card) => {
      gsap.from(card, {
        x: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse",
          scrub: 0.3,
        },
        duration: 1,
        ease: "power1.out",
      });
    });

})();
