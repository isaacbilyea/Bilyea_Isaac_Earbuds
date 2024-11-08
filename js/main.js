(() => {

  //Variables
  const model = document.querySelector("#model");
  const hotspotDots = document.querySelectorAll(".Hotspot-dot");

  const infoBoxes = [
      { title: 'Secure Fit Wing', text: 'Ergonomic wing design ensures a secure and comfortable fit during any activity.', image: 'images/secure-fit.svg' },
      { title: 'Multi-Function Button', text: 'One button to control music, calls, and voice assistant functions.', image: 'images/multi-function.svg' },
      { title: 'Ambient Sound Mode', text: 'Stay aware of your surroundings for safe, focused training without missing a beat.', image: 'images/ambient-sound.svg' },
      { title: 'Noise-Isolating Tips', text: 'Soft silicone tips to block external noise for immersive audio experiences.', image: 'images/noise-cancelling.svg' },
      { title: 'IPX6 Water Resistant', text: 'Engineered to withstand sweat and rain, perfect for intense workouts.', image: 'images/water-resistant.svg' },
      { title: 'Super Fast Charging', text: 'Enjoy rapid charging for minimal downtime and maximum playtime.', image: 'images/fast-charge.svg' }
    ];

  //Functions

  //Creates hotspot elements using array content and appends them to hotspot annotation divs
  function loadInfo() {
    infoBoxes.forEach((infoBox, index)=> {

      let selected = document.querySelector(`#hotspot-${index+1}`);

      hotspotTitle = document.createElement('h2');
      hotspotTitle.textContent = infoBox.title;

      hotspotText = document.createElement('p');
      hotspotText.textContent = infoBox.text;

      hotspotImage = document.createElement('img');
      hotspotImage.src = infoBox.image;

      selected.appendChild(hotspotImage);
      selected.appendChild(hotspotTitle);
      selected.appendChild(hotspotText);

    });
  }

  //Shows hotspot annotation
  function showInfo() {

    //I changed the selector as I prefered to have the hover functionality only on the hotspot dots
    const parent = this.parentElement;
    const slotName = parent.slot;
    const selected = document.querySelector(`#${slotName}`);

    gsap.set(selected, {autoAlpha: 0, scale: 0.8, rotation: -5 });
    gsap.to(selected, {autoAlpha: 1, scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)"});

    //Adds class once hotspot has been hovered to stop animation and change content
    parent.classList.add('hovered');
  }
  
  //Hides hotspot annotation
  function hideInfo() {

    const parent = this.parentElement;
    const slotName = parent.slot;
    const selected = document.querySelector(`#${slotName}`);

    gsap.to(selected, {
      autoAlpha: 0,
      scale: 0.8,
      rotation: -5,
      duration: 0.5,
      ease: "power1.out",
    });
  }
  
  //Loads model first before hotspot content (only on tablet and )
  function modelLoaded() {
      loadInfo();
  }

  //Event Listeners

  model.addEventListener("load", modelLoaded);

  hotspotDots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
  });

})();