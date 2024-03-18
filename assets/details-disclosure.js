class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));

    this.mainDetailsToggle.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.mainDetailsToggle.addEventListener('mouseout', this.onMouseOut.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

    onMouseOver() {
    if(this.mainDetailsToggle.querySelector('summary').classList.contains('top-level')){
      if (!this.animations) this.animations = this.content.getAnimations();

      if (this.mainDetailsToggle.hasAttribute('open')) {
        document.body.classList.add('active');
        this.animations.forEach(animation => animation.play());
      } else {
        this.animations.forEach(animation => animation.cancel());
        this.mainDetailsToggle.setAttribute('open','');
      }
    }
  }
	
  onMouseOut() {
    if(this.mainDetailsToggle.querySelector('summary').classList.contains('top-level')){
      if (!this.animations) this.animations = this.content.getAnimations();

      if (this.mainDetailsToggle.hasAttribute('open')) {
        this.animations.forEach(animation => animation.play());
        this.mainDetailsToggle.removeAttribute('open');
        document.body.classList.remove('active');
      } else {
        this.animations.forEach(animation => animation.cancel());
      }
    }
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      document.body.classList.add('active');
      this.animations.forEach(animation => animation.play());
    } else {
      this.animations.forEach(animation => animation.cancel());
    }
  }

  close() {
    document.body.classList.remove('active'); 
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty('--header-bottom-position-desktop', `${Math.floor(this.header.getBoundingClientRect().bottom)}px`);
  }
}

customElements.define('header-menu', HeaderMenu);
