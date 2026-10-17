document.getElementById('garageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const webhookURL = "https://discord.com/api/webhooks/1560806099118981240/xgnxVZc0KYQfetWAMhy9q7IlbEiqsD2D3y4Bs16Nx-_-DnuV-DuKOcvMakpBB8UYEKFl"; // Discord Webhook URL'inizi yazın

    const icName = document.getElementById('icName').value;
    const phone = document.getElementById('phone').value;
    const bikeModel = document.getElementById('bikeModel').value;
    const serviceType = document.getElementById('serviceType').value;
    const details = document.getElementById('details').value;

    const statusMsg = document.getElementById('statusMessage');

    // Discord Embed Mesaj Formatı
    const discordPayload = {
        embeds: [{
            title: "🛠️ Yeni Tamir & Müşteri Talebi",
            color: 9109504, // Koyu kırmızı renk kodu
            fields: [
                { name: "👤 Müşteri (IC Adı)", value: icName, inline: true },
                { name: "📞 Telefon", value: phone, inline: true },
                { name: "🏍️ Motosiklet Model", value: bikeModel, inline: false },
                { name: "🔧 Hizmet Türü", value: serviceType, inline: false },
                { name: "📝 Detaylar", value: details || "Detay belirtilmedi." }
            ],
            footer: { text: "Dead Man's Wrench Custom Bike Garage" },
            timestamp: new Date()
        }]
    };

    if(webhookURL === "https://discord.com/api/webhooks/1560806099118981240/xgnxVZc0KYQfetWAMhy9q7IlbEiqsD2D3y4Bs16Nx-_-DnuV-DuKOcvMakpBB8UYEKFl") {
        statusMsg.style.color = "orange";
        statusMsg.innerText = "Form gönderildi ancak Discord Webhook adresi henüz ayarlanmamış!";
        return;
    }

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
    })
    .then(response => {
        if (response.ok) {
            statusMsg.style.color = "lime";
            statusMsg.innerText = "Talebiniz garaja iletildi! En kısa sürede dönüş yapacağız.";
            document.getElementById('garageForm').reset();
        } else {
            statusMsg.style.color = "red";
            statusMsg.innerText = "Bir hata oluştu, lütfen tekrar deneyin.";
        }
    })
    .catch(error => {
        statusMsg.style.color = "red";
        statusMsg.innerText = "Bağlantı hatası oluştu!";
    });
});
