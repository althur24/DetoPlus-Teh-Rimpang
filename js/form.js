// form.js
export function initForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;

    const ADMIN_WA_NUMBER = "6281234567890"; // Ganti dengan nomor asli

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
            alert("⚠️ PEMBERITAHUAN:\nMohon centang kotak persetujuan bahwa data yang diisi sudah benar sebelum mengirim pesanan.");
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
        
        window.open(waLink, '_blank');
    });
}
