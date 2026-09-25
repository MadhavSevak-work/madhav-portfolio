/**
 * SplitFlapText - Departure Board Mechanical Text Animation
 * Based on @react-bits/TextAnimations-JS-CSS
 */

(function () {
  const CHARSETS = {
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    numeric: '0123456789'
  };

  const resolveCharset = charset => {
    if (CHARSETS[charset]) return CHARSETS[charset];
    return typeof charset === 'string' && charset.length > 0 ? charset : CHARSETS.alphanumeric;
  };

  const normalizePhrase = (phrase, width) => {
    const safe = String(phrase ?? '');
    return safe.padEnd(width, ' ').slice(0, width);
  };

  const sampleChar = charset => charset.charAt(Math.floor(Math.random() * charset.length)) || ' ';

  const buildSequence = (target, flips, charset) => {
    const steps = [];
    for (let i = 0; i < flips; i += 1) {
      steps.push(sampleChar(charset));
    }
    steps.push(target);
    return steps;
  };

  function initSplitFlap() {
    const container = document.getElementById('hero-name-flap');
    if (!container) return;

    const words = ['MADHAV', 'SEVAK ', 'CODING', 'CREATR'];
    const flipDuration = 0.12;
    const stagger = 0.06;
    const cycleDelay = 2400;
    const charset = 'alphanumeric';
    const flipsPerChar = 8;
    const tileColor = '#111827';
    const textColor = '#f8fafc';
    const tileRadius = 8;
    const gap = 6;
    const padTo = 6;
    const loop = true;

    const longest = words.reduce((max, phrase) => Math.max(max, phrase.length), 1);
    const width = Math.max(1, Math.ceil(Number(padTo) || 0), longest);
    const normalizedPhrases = words.map(phrase => normalizePhrase(phrase, width));

    const safeFlipMs = Math.max(40, flipDuration * 1000);
    const safeStaggerMs = Math.max(0, stagger * 1000);
    const safeCycleDelay = Math.max(400, cycleDelay);
    const safeFlips = Math.max(0, Math.floor(flipsPerChar));
    const activeCharset = resolveCharset(charset);

    // Apply CSS custom variables
    container.style.setProperty('--split-flap-tile-color', tileColor);
    container.style.setProperty('--split-flap-text-color', textColor);
    container.style.setProperty('--split-flap-radius', `${tileRadius}px`);
    container.style.setProperty('--split-flap-gap', `${gap}px`);
    container.style.setProperty('--split-flap-flip-duration', `${flipDuration}s`);
    container.classList.add('split-flap-text');

    // Create tile elements
    container.innerHTML = '';
    const tiles = [];
    for (let i = 0; i < width; i++) {
      const tile = document.createElement('span');
      tile.className = 'split-flap-text__tile';
      tile.setAttribute('aria-hidden', 'true');

      const topHalf = document.createElement('span');
      topHalf.className = 'split-flap-text__half split-flap-text__half--top';
      const topChar = document.createElement('span');
      topChar.className = 'split-flap-text__char';
      topChar.textContent = '\u00A0';
      topHalf.appendChild(topChar);

      const bottomHalf = document.createElement('span');
      bottomHalf.className = 'split-flap-text__half split-flap-text__half--bottom';
      const bottomChar = document.createElement('span');
      bottomChar.className = 'split-flap-text__char';
      bottomChar.textContent = '\u00A0';
      bottomHalf.appendChild(bottomChar);

      tile.appendChild(topHalf);
      tile.appendChild(bottomHalf);
      container.appendChild(tile);

      tiles.push({
        el: tile,
        topChar,
        bottomChar,
        frontFlap: null,
        backFlap: null,
        current: ' ',
        next: ' ',
        flipping: false
      });
    }

    let currentText = normalizedPhrases[0] || '';
    // Set initial text
    currentText.split('').forEach((ch, idx) => {
      if (tiles[idx]) {
        tiles[idx].current = ch;
        tiles[idx].next = ch;
        tiles[idx].topChar.textContent = ch === ' ' ? '\u00A0' : ch;
        tiles[idx].bottomChar.textContent = ch === ' ' ? '\u00A0' : ch;
      }
    });

    let rafId = null;
    let cycleTimer = null;
    let phraseIndex = 0;
    let isFlipping = false;

    function setTileFlipping(tileIndex, fromChar, nextChar) {
      const t = tiles[tileIndex];
      if (!t) return;

      t.flipping = true;
      t.bottomChar.textContent = nextChar === ' ' ? '\u00A0' : nextChar;

      // Remove existing flaps
      if (t.frontFlap) t.frontFlap.remove();
      if (t.backFlap) t.backFlap.remove();

      // Create new front flap
      const front = document.createElement('span');
      front.className = 'split-flap-text__flap split-flap-text__flap--front';
      const frontChar = document.createElement('span');
      frontChar.className = 'split-flap-text__char';
      frontChar.textContent = fromChar === ' ' ? '\u00A0' : fromChar;
      front.appendChild(frontChar);

      // Create new back flap
      const back = document.createElement('span');
      back.className = 'split-flap-text__flap split-flap-text__flap--back';
      const backChar = document.createElement('span');
      backChar.className = 'split-flap-text__char';
      backChar.textContent = nextChar === ' ' ? '\u00A0' : nextChar;
      back.appendChild(backChar);

      t.el.appendChild(front);
      t.el.appendChild(back);
      t.frontFlap = front;
      t.backFlap = back;
    }

    function setTileSettled(tileIndex, targetChar) {
      const t = tiles[tileIndex];
      if (!t) return;

      t.flipping = false;
      t.current = targetChar;
      t.next = targetChar;
      t.topChar.textContent = targetChar === ' ' ? '\u00A0' : targetChar;
      t.bottomChar.textContent = targetChar === ' ' ? '\u00A0' : targetChar;

      if (t.frontFlap) {
        t.frontFlap.remove();
        t.frontFlap = null;
      }
      if (t.backFlap) {
        t.backFlap.remove();
        t.backFlap = null;
      }
    }

    function animateTo(targetPhrase) {
      isFlipping = true;
      const fromPhrase = normalizePhrase(currentText, width);
      const targetChars = targetPhrase.split('');

      const plans = targetChars
        .map((targetChar, index) => {
          const fromChar = fromPhrase[index] || ' ';
          if (fromChar === targetChar) return null;

          return {
            index,
            from: fromChar,
            target: targetChar,
            sequence: buildSequence(targetChar, safeFlips, activeCharset),
            start: index * safeStaggerMs,
            step: -1,
            done: false
          };
        })
        .filter(Boolean);

      if (!plans.length) {
        currentText = targetPhrase;
        isFlipping = false;
        return 0;
      }

      const totalDuration = plans.reduce(
        (max, plan) => Math.max(max, plan.start + plan.sequence.length * safeFlipMs),
        0
      );
      const startedAt = performance.now();

      const tick = now => {
        const elapsed = now - startedAt;
        let shouldContinue = false;

        plans.forEach(plan => {
          const localElapsed = elapsed - plan.start;

          if (localElapsed < 0) {
            shouldContinue = true;
            return;
          }

          const step = Math.floor(localElapsed / safeFlipMs);

          if (step < plan.sequence.length) {
            shouldContinue = true;

            if (step !== plan.step) {
              plan.step = step;
              const fromChar = step === 0 ? plan.from : plan.sequence[step - 1];
              const nextChar = plan.sequence[step];
              setTileFlipping(plan.index, fromChar, nextChar);
            }
          } else if (!plan.done) {
            plan.done = true;
            setTileSettled(plan.index, plan.target);
          }
        });

        if (shouldContinue) {
          rafId = requestAnimationFrame(tick);
        } else {
          currentText = targetPhrase;
          isFlipping = false;
          rafId = null;
        }
      };

      rafId = requestAnimationFrame(tick);
      return totalDuration;
    }

    function scheduleNext(delay) {
      cycleTimer = window.setTimeout(() => {
        const nextIndex = phraseIndex + 1;
        if (nextIndex >= normalizedPhrases.length && !loop) return;

        phraseIndex = nextIndex % normalizedPhrases.length;
        const animationDuration = animateTo(normalizedPhrases[phraseIndex]);
        scheduleNext(safeCycleDelay + animationDuration);
      }, delay);
    }

    // Initial cycle after delay
    scheduleNext(safeCycleDelay);

    // Click/Hover to trigger immediate flip
    container.addEventListener('mouseenter', () => {
      if (isFlipping) return;
      window.clearTimeout(cycleTimer);
      phraseIndex = (phraseIndex + 1) % normalizedPhrases.length;
      const dur = animateTo(normalizedPhrases[phraseIndex]);
      scheduleNext(safeCycleDelay + dur);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplitFlap);
  } else {
    initSplitFlap();
  }
})();
