import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="flash"
export default class extends Controller {
  connect() {
    const node = this.element;
    this.animateCSS("rubberBand").then(() => {
      this.animateCSS("zoomOut").then(() => {
        node.style.visibility = "hidden";
      });
    });
    setTimeout(() => {
      node.remove();
    }, 5000);
  }

  animateCSS(animation) {
    return new Promise((resolve, _reject) => {
      const animationName = `animate__${animation}`;
      const node = this.element;
      node.classList.add("animate__animated", animationName);

      //clean classes resolve when animation en d
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove("animate__animated", animationName);
        resolve("Animation ended");
      }
      node.addEventListened("animationend", handleAnimationEnd);
    });
  }
}
