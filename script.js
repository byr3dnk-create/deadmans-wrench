const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

audio.volume = 0.15; // Ses seviyesi kısık (%15)

// Sayfa yüklendiğinde müziği başlatmayı dener
window.addEventListener('DOMContentLoaded', () => {
    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicBtn.innerText = "🔊 Müzik: Açık";
            musicBtn.style.backgroundColor = "#8b0000";
        }).catch(() => {
            // Tarayıcı ilk anda engellerse, fare hareketi veya herhangi bir etkileşimde tetikler
            const enableAudio = () => {
                audio.play();
                musicBtn.innerText = "🔊 Müzik: Açık";
                musicBtn.style.backgroundColor = "#8b0000";
                window.removeEventListener('mousemove', enableAudio);
                window.removeEventListener('scroll', enableAudio);
                window.removeEventListener('keydown', enableAudio);
            };
            window.addEventListener('mousemove', enableAudio);
            window.addEventListener('scroll', enableAudio);
            window.addEventListener('keydown', enableAudio);
        });
    }
});

// Sağ alttaki müziği açma / kapama butonu
musicBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (audio.paused) {
        audio.play();
        musicBtn.innerText = "🔊 Müzik: Açık";
        musicBtn.style.backgroundColor = "#8b0000";
    } else {
        audio.pause();
        musicBtn.innerText = "🔇 Müzik: Kapalı";
        musicBtn.style.backgroundColor = "#333";
    }
});

// FORM VE DISCORD WEBHOOK GÖNDERİMİ
document.getElementById('garageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const webhookURL = "https://discord.com/api/webhooks/1560806099118981240/xgnxVZc0KYQfetWAMhy9q7IlbEiqsD2D3y4Bs16Nx-_-DnuV-DuKOcvMakpBB8UYEKFl"; 

    const icName = document.getElementById('icName').value;
    const phone = document.getElementById('phone').value;
    const bikeModel = document.getElementById('bikeModel').value;
    const details = document.getElementById('details').value;

    const selectedParts = [];
    const checkboxes = document.querySelectorAll('input[name="parts"]:checked');
    checkboxes.forEach((cb) => {
        selectedParts.push(cb.value);
    });

    const statusMsg = document.getElementById('statusMessage');

    if (selectedParts.length === 0) {
        statusMsg.style.color = "orange";
        statusMsg.innerText = "Lütfen en az bir tane yapılacak işlem/parça seçin!";
        return;
    }

    statusMsg.style.color = "yellow";
    statusMsg.innerText = "Gönderiliyor...";

    const discordPayload = {
        username: "Dead Man's Wrench Bot",
        embeds: [{
            title: "🛠️ Yeni Tamir & Parça Montaj Talebi",
            color: 9109504,
            fields: [
                { name: "👤 Müşteri (IC Adı)", value: icName || "Belirtilmedi", inline: true },
                { name: "📞 Telefon", value: phone || "Belirtilmedi", inline: true },
                { name: "🏍️ Motosiklet Model", value: bikeModel || "Belirtilmedi", inline: false },
                { name: "🔧 Seçilen İşlemler & Parçalar", value: selectedParts.join(", "), inline: false },
                { name: "📝 Ek Notlar / Detaylar", value: details || "Detay belirtilmedi." }
            ],
            footer: { text: "Dead Man's Wrench Custom Bike Garage" },
            timestamp: new Date().toISOString()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordPayload)
    })
    .then(response => {
        if (response.ok || response.status === 204) {
            statusMsg.style.color = "#00ff00";
            statusMsg.innerText = "Talebiniz garaja iletildi! En kısa sürede dönüş yapacağız.";
            document.getElementById('garageForm').reset();
        } else {
            statusMsg.style.color = "red";
            statusMsg.innerText = "Bir hata oluştu, lütfen tekrar deneyin.";
        }
    })
    .catch(error => {
        console.error("Ağ Hatası:", error);
        statusMsg.style.color = "red";
        statusMsg.innerText = "Bağlantı hatası oluştu!";
    });
});
