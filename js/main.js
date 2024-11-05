(() => {

  //Variables
  const model = document.querySelector("#model");
  const hotspotAnnotations = document.querySelectorAll(".HotspotAnnotation");
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
      { title: 'Super Fast Charging', text: 'Enjoy rapid charging for minimal downtime and maximum playtime.', image: 'images/fast-charge.svg' },
      { title: 'Noise-Isolating Tips', text: 'Soft silicone tips to block external noise for immersive audio experiences.', image: 'images/noise-cancelling.svg' },
      { title: 'Secure Fit Wing', text: 'Ergonomic wing design ensures a secure and comfortable fit during any activity.', image: 'images/secure-fit.svg' },
      { title: 'IPX6 Water Resistant', text: 'Engineered to withstand sweat and rain, perfect for intense workouts.', image: 'images/water-resistant.svg' },
      { title: 'Multi-Function Button', text: 'One button to control music, calls, and voice assistant functions.', image: 'images/multi-function.svg' }
  ];

  //Functions
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

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
    this.classList.add('hovered');
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }
  
  function modelLoaded() {
    loadInfo();
  }

  //Event Listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
  });

})();