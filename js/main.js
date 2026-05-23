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

    // 5. Track 10-second engagement
    setTimeout(() => {
        try {
            if (typeof fbq === 'function') {
                fbq('trackCustom', 'Stay10s_Deto');
            }
            if (typeof gtag === 'function') {
                gtag('event', 'Stay10s_Deto', {
                    'event_category': 'engagement',
                    'event_label': 'User stayed 10 seconds'
                });
            }
        } catch (err) {
            console.warn('Stay10s tracking error:', err);
        }
    }, 10000);

});
