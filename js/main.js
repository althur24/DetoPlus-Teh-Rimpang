// main.js
import { initAnimations } from './animations.js';
import { initFAQ } from './faq.js';
import { initForm } from './form.js';
import { initTimer } from './timer.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize animations
    initAnimations();

    // 2. Initialize FAQ accordion
    initFAQ();

    // 3. Initialize Order Form
    initForm();
    
    // 4. Initialize Evergreen Timer
    initTimer();

});
