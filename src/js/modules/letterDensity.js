export class LetterDensity {
  constructor() {
    this.textArea = document.getElementById('typing-area');
    this.densityChart = document.querySelector('.density-chart');
    this.alert = document.querySelector('.alert');
    this.setLimitcheckbox = document.querySelector('#limit');
    this.showAll = false;
    this.maxToShow = 5;
    this.initialize()
  }
  initialize() {
    this.textArea.addEventListener('input', () => this.updateDensity())
    this.setLimitcheckbox.addEventListener('change', () => this.updateDensity())
  }
  updateDensity() {
    const text = this.textArea.value.toLowerCase().replace(/[^a-z]/g, '');
    if (!text) {
      this.densityChart.innerHTML = '';
      this.alert.classList.remove('hidden');
      return;
    }
    this.alert.classList.add('hidden');
    const counts = this.getLetterCount(text);
    this.renderDensity(counts, text.length);
  }
  getLetterCount(text) {
    const counts = {};
    for (const char of text) {
      counts[char] = (counts[char] || 0) + 1
    }
    return counts;
  }
  
  renderDensity(counts, total) {
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const toShow = this.showAll ? sorted : sorted.slice(0, this.maxToShow);
    this.densityChart.innerHTML = toShow.map(([letter, count]) => {
      const percent = (count / total * 100);
      return `
      <div class="density-container">
        <div class="density-item">
          <span class="letter">${letter.toUpperCase()}</span>
          <div class="bar-container">
            <div class="bar" style="width: ${percent}%;">&nbsp;</div>
          </div>
          <span class="count">${count}</span>
          <span class="percent">${percent.toFixed(1)}%</span>
        </div>
      </div>
      `;
    }).join('')

    if (sorted.length > this.maxToShow) {
      const btn = document.createElement('button');
      btn.textContent = this.showAll ? 'See Less' : 'See More';
      btn.className = 'show-more-btn';
      btn.onclick = () => {
        this.showAll = !this.showAll;
        this.renderDensity(counts, total)
      }
      this.densityChart.appendChild(btn);
    }
  }
}