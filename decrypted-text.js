/**
 * DecryptedText - Cybernetic Decryption Text Animation
 * Based on @react-bits/DecryptedText-JS-CSS
 */

(function () {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const text = 'MADHAV SEVAK';
  const speed = 45;
  const sequential = true;
  const revealDirection = 'start';
  const maxIterations = 12;

  function initDecryptedText() {
    const container = document.getElementById('hero-decrypted-name');
    if (!container) return;

    container.classList.add('decrypted-text-wrapper');

    const availableChars = characters.split('');
    let isAnimating = false;
    let revealedIndices = new Set();
    let intervalId = null;
    let isDecrypted = false;

    function shuffleChar() {
      return availableChars[Math.floor(Math.random() * availableChars.length)];
    }

    function renderText(revealedSet, fullyDecrypted = false) {
      container.innerHTML = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');

        if (char === ' ') {
          span.innerHTML = '&nbsp;';
          span.className = 'decrypted-revealed';
        } else if (fullyDecrypted || revealedSet.has(i)) {
          span.textContent = char;
          span.className = 'decrypted-revealed';
        } else {
          span.textContent = shuffleChar();
          span.className = 'decrypted-scrambled';
        }
        container.appendChild(span);
      }
    }

    function triggerDecrypt() {
      if (isAnimating) return;
      isAnimating = true;
      isDecrypted = false;
      revealedIndices = new Set();

      let currentIteration = 0;
      let currentIndex = 0;

      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        if (sequential) {
          // Reveal 1 character per step sequentially
          if (revealedIndices.size < text.length) {
            // Find next unrevealed index
            while (currentIndex < text.length && text[currentIndex] === ' ') {
              revealedIndices.add(currentIndex);
              currentIndex++;
            }
            if (currentIndex < text.length) {
              revealedIndices.add(currentIndex);
              currentIndex++;
            }
            renderText(revealedIndices);
          } else {
            clearInterval(intervalId);
            intervalId = null;
            isAnimating = false;
            isDecrypted = true;
            renderText(revealedIndices, true);
          }
        } else {
          currentIteration++;
          renderText(revealedIndices);
          if (currentIteration >= maxIterations) {
            clearInterval(intervalId);
            intervalId = null;
            isAnimating = false;
            isDecrypted = true;
            renderText(revealedIndices, true);
          }
        }
      }, speed);
    }

    // Initial render with scramble then auto-decrypt
    renderText(new Set());
    setTimeout(triggerDecrypt, 250);

    // Hover to trigger decryption
    container.addEventListener('mouseenter', () => {
      if (!isAnimating) {
        triggerDecrypt();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDecryptedText);
  } else {
    initDecryptedText();
  }
})();
