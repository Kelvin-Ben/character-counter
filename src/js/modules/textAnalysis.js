export class TextAnalysis {
  constructor() {
    this.remainingCharsElement = document.querySelector('.remaining-chars .count');
    this.textArea = document.getElementById('typing-area');
    this.excludeSpacesCheckbox = document.getElementById('spaces');
    this.setLimitCheckbox = document.getElementById('limit');
    this.characterLimitInput = document.getElementById('character-count');
    this.readingTimeElement = document.querySelector('.reading-time');
    this.totalCharacterElement = document.querySelector('.total-character .number');
    this.totalWordElement = document.querySelector('.word-count .number');
    this.totalSentenceElement = document.querySelector('.sentence-count .number');
    this.remainingChars = document.querySelector('.character-limit-info');


    // Create debounced version of updateTextArea
    this.debouncedUpdateTextArea = this.debounce(this.updateTextArea.bind(this), 300);

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.textArea.addEventListener('input', () => {
      this.analyzeText();

      // call the debounceif when text changes
      if(this.setLimitCheckbox.checked) {
        this.debouncedUpdateTextArea()
      }
    });
    this.excludeSpacesCheckbox.addEventListener('change', () => this.analyzeText());
    this.setLimitCheckbox.addEventListener('change', () => {
      if(this.setLimitCheckbox.checked) {
        this.characterLimitInput.focus()
        this.remainingChars.classList.add('visible');
      } else {
        this.remainingChars.classList.remove('visible');
      }
    })
    this.characterLimitInput.addEventListener('input', () => {
      this.analyzeText();
      this.debouncedUpdateTextArea();
    })
  }


  analyzeText() {
    // get the text from the text area
    const text = this.textArea.value;
    
    // count the characters
    const characterCount = this.countCharacters(text);
    this.totalCharacterElement.textContent = characterCount.toString().padStart(2, '0');

    // count the words
    const wordCount = this.countWords(text);
    this.totalWordElement.textContent = wordCount.toString().padStart(2, '0');

    // count the sentences
    const sentenceCount = this.countSentences(text);
    this.totalSentenceElement.textContent = sentenceCount.toString().padStart(2, '0');
    
    // update the reading time
    this.updateReadingTime(text);
    this.updateRemainingChars();
  }

  countCharacters(text) {
    const excludeSpaces = this.excludeSpacesCheckbox.checked;
    if (excludeSpaces) {
      return text.replace(/\s/g, '').length
    }
    return text.trim().length;
  }

  countWords(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return words;
  }

  countSentences(text) {
    const sentences = text.trim() ? text.trim().split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length : 0;
    return sentences;
  }

  updateReadingTime(text) {
    const wordCount = this.countWords(text);
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    this.readingTimeElement.textContent = `Approx. reading time: ${readingTime} minute${readingTime > 1 ? 's' : ''}`;
  }

  updateRemainingChars() {
    if (!this.setLimitCheckbox.checked) {
      this.remainingCharsElement.textContent = '';
      this.remainingCharsElement.classList.remove('danger', 'warning');
      return;
    }

    const limit = parseInt(this.characterLimitInput.value);
    if (isNaN(limit) || limit <= 0) {
      this.remainingCharsElement.textContent = '';
      return;
    }

    const currentCount = this.countCharacters(this.textArea.value);
    const remaining = limit - currentCount;

    // Update remaining characters display
    this.remainingCharsElement.textContent = `${remaining} / ${limit}`;

    // CONTINUE FIXING THIS FEATURE
    // Update styling based on remaining characters
    this.remainingCharsElement.classList.remove('danger', 'warning');
    if (remaining <= 0) {
      this.remainingCharsElement.classList.add('danger');
      this.textArea.classList.add('limit-exceeded');
    } else if (remaining <= Math.ceil(limit * 0.2)) { // Warning at 20% remaining
      this.remainingCharsElement.classList.add('warning');
      this.textArea.classList.remove('limit-exceeded');
    } else {
      this.textArea.classList.remove('limit-exceeded');
    }
  }

  // Debounce function to prevent multiple calls
  debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // Update the text area to respect the character limit
  updateTextArea() {
    const limit = parseInt(this.characterLimitInput.value);
    if (isNaN(limit) || limit <= 0) return;

    const currentCount = this.countCharacters(this.textArea.value);
    if (currentCount > limit) {
      this.textArea.value = this.textArea.value.slice(0, limit);
      this.analyzeText(); // Update all counters after truncating
    }
  }
}
