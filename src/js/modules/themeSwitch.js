export class ThemeSwitch {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.themeButton = document.querySelector('.theme-switcher');
    this.moonIcon = this.themeButton.querySelector('img[alt="Moon icon"]');
    this.sunIcon = this.themeButton.querySelector('img[alt="Sun Icon"]');
    this.logoDark = document.querySelector('img[alt="logo character counter"][class="hidden"]');
    this.logoLight = document.querySelector('img[alt="logo character counter"]:not([class="hidden"])');

    this.init();
  }
  
  init() {
    this.applyTheme();
    this.themeButton.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    if (this.theme === 'dark') {
      this.moonIcon.classList.add('hidden');
      this.sunIcon.classList.remove('hidden');
      this.logoLight.classList.add('hidden');
      this.logoDark.classList.remove('hidden');
    } else {
      this.moonIcon.classList.remove('hidden');
      this.sunIcon.classList.add('hidden');
      this.logoLight.classList.remove('hidden');
      this.logoDark.classList.add('hidden');
    }
  }
}