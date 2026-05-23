export function initTimer() {
    const hoursEl = document.getElementById('tHours');
    const minutesEl = document.getElementById('tMinutes');
    const secondsEl = document.getElementById('tSeconds');
    
    if (!hoursEl || !minutesEl || !secondsEl) return;

    const TIMER_KEY = 'teh_rimpang_promo_end_v4';
    const TIMER_DATE_KEY = 'teh_rimpang_promo_date_v4';
    const DURATION_MS = 4 * 60 * 60 * 1000; // 4 hours

    let endTime = localStorage.getItem(TIMER_KEY);
    let savedDate = localStorage.getItem(TIMER_DATE_KEY);
    const currentDate = new Date().toDateString();

    if (!endTime || savedDate !== currentDate) {
        endTime = new Date().getTime() + DURATION_MS;
        localStorage.setItem(TIMER_KEY, endTime);
        localStorage.setItem(TIMER_DATE_KEY, currentDate);
    } else {
        endTime = parseInt(endTime, 10);
    }

    let interval;
    let isExpired = false;

    const updateTimer = () => {
        if (isExpired) return;
        
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            isExpired = true;
            if (interval) clearInterval(interval);
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            applyStrictPenalty();
            return;
        }

        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        hoursEl.innerText = h.toString().padStart(2, '0');
        minutesEl.innerText = m.toString().padStart(2, '0');
        secondsEl.innerText = s.toString().padStart(2, '0');
    };

    updateTimer();
    if (!isExpired) {
        interval = setInterval(updateTimer, 1000);
    }
}

function applyStrictPenalty() {
    const header = document.querySelector('.timer__header');
    if (header) {
        header.innerText = "Waktu Promo Diskon Telah Habis! Silakan tunggu waktu promo berikutnya.";
        header.style.color = "#e63946";
    }

    // Change all prices to original prices (Strict Mode)
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach(card => {
        const priceEl = card.querySelector('.pricing-card__price');
        const bonusEl = card.querySelector('.pricing-card__bonus');
        const btnEl = card.querySelector('.btn');
        
        if (priceEl && bonusEl) {
            // Get original price from bonus string
            const normalPrice = bonusEl.innerText;
            priceEl.innerText = normalPrice;
            
            bonusEl.innerText = "Harga Normal Berlaku";
            bonusEl.style.textDecoration = "none";
            bonusEl.style.color = "#e63946";
            bonusEl.style.fontWeight = "800";
        }
        
        if (btnEl) {
            btnEl.innerText = "Beli Harga Normal";
        }
    });
}
