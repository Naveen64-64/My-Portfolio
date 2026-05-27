// ==========================
// THREE JS BACKGROUND
// ==========================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  alpha: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document
  .getElementById("bg")
  .appendChild(renderer.domElement);

const geometry =
  new THREE.TorusGeometry(10, 3, 16, 100);

const material =
  new THREE.MeshBasicMaterial({
    color: 0x7c3aed,
    wireframe: true
  });

const torus =
  new THREE.Mesh(geometry, material);

scene.add(torus);

camera.position.z = 30;

function animate() {

  requestAnimationFrame(animate);

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});


// ==========================
// EMAIL JS
// ==========================

// Only initialize EmailJS and attach handlers if the library is loaded.
if (typeof emailjs !== "undefined") {
  window.addEventListener("load", function () {

    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");

    // Contact Form
    const form = document.getElementById("contact-form");
    if (!form) return;

    // Popup Elements
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupMessage = document.getElementById("popup-message");

    // Submit Form
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable Button While Sending
      const button = form.querySelector("button");
      if (button) button.innerHTML = "Sending...";

      emailjs
        .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
        .then(() => {
          // SUCCESS
          if (popup) popup.style.display = "flex";
          if (popupTitle) popupTitle.innerHTML = "Success ✅";
          if (popupMessage) popupMessage.innerHTML = "Message Sent Successfully!";
          form.reset();
          if (button) button.innerHTML = "Send Message";
        })
        .catch((error) => {
          // FAILED
          if (popup) popup.style.display = "flex";
          if (popupTitle) popupTitle.innerHTML = "Failed ❌";
          if (popupMessage) popupMessage.innerHTML = "Failed To Send Message.";
          console.log(error);
          if (button) button.innerHTML = "Send Message";
        });
    });

  });
}


// ==========================
// CLOSE POPUP
// ==========================

function closePopup() {

  document.getElementById("popup")
    .style.display = "none";

}