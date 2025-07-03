import { ThemeSwitch } from './modules/themeSwitch.js';
import { TextAnalysis } from './modules/textAnalysis.js';
import { LetterDensity } from './modules/letterDensity.js';

class App {
    constructor() {
        this.themeSwitch = new ThemeSwitch();
        this.textAnalysis = new TextAnalysis();
        this.letterDensity = new LetterDensity();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});