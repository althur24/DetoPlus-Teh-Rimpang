// form.js
export function initForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;

    const ADMIN_WA_NUMBER = "6287775564462"; // Ganti dengan nomor asli

    // Handle visual card selection and order summary
    const radios = document.querySelectorAll('input[name="paket"]');
    const summaryDiv = document.getElementById('orderSummary');
    const summaryText = document.getElementById('summaryText');

    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = e.target.getAttribute('data-price');
            
            // Show the summary box
            summaryDiv.style.display = 'block';
            
            // Update text
            summaryText.innerText = `${name} (${price})`;
            
            // Remove error styling if present
            document.querySelector('.package-selection').classList.remove('error');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        let isValid = true;
        
        const nama = document.getElementById('nama');
        const whatsapp = document.getElementById('whatsapp');
        const alamat = document.getElementById('alamat');
        const confirmation = document.getElementById('confirmation');
        
        // Find selected radio
        const selectedPaket = document.querySelector('input[name="paket"]:checked');
        const packageSelectionContainer = document.querySelector('.package-selection');

        // Reset text inputs error
        [nama, whatsapp, alamat].forEach(el => el.classList.remove('error'));
        packageSelectionContainer.classList.remove('error');

        if (nama.value.trim().length < 3) {
            nama.classList.add('error');
            isValid = false;
        }

        const waClean = whatsapp.value.replace(/[\s\-\+]/g, '');
        if (waClean.length < 10 || waClean.length > 15 || isNaN(waClean)) {
            whatsapp.classList.add('error');
            isValid = false;
        }

        if (alamat.value.trim().length === 0) {
            alamat.classList.add('error');
            isValid = false;
        }

        if (!selectedPaket) {
            packageSelectionContainer.classList.add('error');
            isValid = false;
        }

        if (!confirmation.checked) {
            // Show custom inline warning instead of browser alert
            const confirmGroup = confirmation.closest('.form-confirmation');
            confirmGroup.style.borderColor = '#e63946';
            confirmGroup.style.backgroundColor = 'rgba(230, 57, 70, 0.06)';
            
            // Create or update toast notification
            let toast = document.getElementById('confirmToast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'confirmToast';
                toast.style.cssText = 'margin-top: -16px; margin-bottom: 16px; padding: 12px 16px; background: linear-gradient(135deg, #e63946, #d62839); color: #fff; border-radius: 8px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; animation: slideDown 0.3s ease; box-shadow: 0 4px 12px rgba(230,57,70,0.25);';
                confirmGroup.parentNode.insertBefore(toast, confirmGroup.nextSibling);
            }
            toast.innerHTML = '⚠️ Mohon centang kotak persetujuan bahwa data yang diisi sudah benar.';
            toast.style.display = 'flex';
            
            // Auto-hide after 4 seconds
            setTimeout(() => {
                toast.style.display = 'none';
                confirmGroup.style.borderColor = 'rgba(56, 176, 0, 0.3)';
                confirmGroup.style.backgroundColor = 'rgba(56, 176, 0, 0.05)';
            }, 4000);
            
            // Reset on check
            confirmation.addEventListener('change', function handler() {
                toast.style.display = 'none';
                confirmGroup.style.borderColor = 'rgba(56, 176, 0, 0.3)';
                confirmGroup.style.backgroundColor = 'rgba(56, 176, 0, 0.05)';
                confirmation.removeEventListener('change', handler);
            });
            
            isValid = false;
        }

        if (!isValid) return;

        const paketName = selectedPaket.getAttribute('data-name');
        const paketPrice = selectedPaket.getAttribute('data-price');

        // Construct message
        const message = `Halo admin, saya mau pesan Teh Rimpang DetoPlus+ via COD ya!

Detail Pemesan:
Nama: ${nama.value.trim()}
No. WA: ${whatsapp.value.trim()}
Alamat Lengkap: ${alamat.value.trim()}

Pesanan: ${paketName}
Harga: ${paketPrice}

Tolong dibantu proses pengirimannya ya kak, terima kasih!`;

        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodedMessage}`;
        
        // Disable button to prevent double-click
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" style="animation: spin 1s linear infinite; margin-right: 8px;"><path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z"/></svg> Mengirim...';
        }

        // Trigger Meta Pixel Custom Lead Event with delay for pixel to fire
        const openWhatsApp = () => {
            window.open(waLink, '_blank');
            // Re-enable button after redirect
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.098c-.244.688-.958 1.264-1.682 1.431-.497.115-1.146.207-3.334-.717-2.8-1.182-4.598-4.03-4.738-4.218-.14-.188-1.134-1.51-1.134-2.879 0-1.37.717-2.043.972-2.322.255-.28.557-.35.743-.35.186 0 .371.002.534.01.171.007.401-.065.627.479.233.561.79 1.931.86 2.07.07.14.116.303.023.489-.093.186-.14.303-.28.466-.14.163-.294.363-.42.489-.14.14-.286.29-.123.569.163.28.726 1.197 1.558 1.94 1.069.953 1.97 1.248 2.25 1.388.28.14.442.116.605-.07.163-.186.698-.814.884-1.094.186-.28.372-.233.627-.14.255.093 1.62.764 1.898.904.28.14.465.21.534.326.07.116.07.675-.174 1.323z"/></svg> Pesan lewat Whatsapp';
            }
        };

        try {
            // Trigger Meta Pixel Lead Event
            if (typeof fbq === 'function') {
                fbq('trackCustom', 'Lead Deto');
            }

            // Trigger Google Analytics Lead Event
            if (typeof gtag === 'function') {
                gtag('event', 'Lead_Deto', {
                    'event_category': 'conversion',
                    'event_label': paketName,
                    'value': paketPrice
                });
            }

            // Give trackers 500ms to fire before redirecting
            setTimeout(openWhatsApp, 500);
        } catch (err) {
            // Failsafe: always open WhatsApp even if trackers error
            console.warn('Tracking error:', err);
            openWhatsApp();
        }
    });
}
