import { ThemeSwitch } from './modules/themeSwitch.js';
import { TextAnalysis } from './modules/textAnalysis.js';

class App {
    constructor() {
        this.themeSwitch = new ThemeSwitch();
        this.textAnalysis = new TextAnalysis();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});