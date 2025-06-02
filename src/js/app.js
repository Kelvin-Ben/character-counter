import { ThemeSwitch } from './modules/themeSwitch.js';

class App {
    constructor() {
        this.themeSwitch = new ThemeSwitch();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});