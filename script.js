document.getElementById('garageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Sizin verdiğiniz Discord Webhook URL'si eklendi
    const webhookURL = "https://discord.com/api/webhooks/1560806099118981240/xgnxVZc0KYQfetWAMhy9q7IlbEiqsD2D3y4Bs16Nx-_-DnuV-DuKOcvMakpBB8UYEKFl"; 

    const icName = document.getElementById('icName').value;
    const phone = document.getElementById('phone').value;
    const bikeModel = document.getElementById('bikeModel').value;
    const serviceType = document.getElementById('serviceType').value;
    const details = document.getElementById('details').value;

    const statusMsg = document.getElementById('statusMessage');

    statusMsg.style.color = "yellow";
    statusMsg.innerText = "Gönderiliyor...";

    // Discord Embed Mesaj Formatı
    const discordPayload = {
        username: "Dead Man's Wrench Bot",
        embeds: [{
            title: "🛠️ Yeni Tamir & Müşteri Talebi",
            color: 9109504,
            fields: [
                { name: "👤 Müşteri (IC Adı)", value: icName || "Belirtilmedi", inline: true },
                { name: "📞 Telefon", value: phone || "Belirtilmedi", inline: true },
                { name: "🏍️ Motosiklet Model", value: bikeModel || "Belirtilmedi", inline: false },
                { name: "🔧 Hizmet Türü", value: serviceType || "Belirtilmedi", inline: false },
                { name: "📝 Detaylar", value: details || "Detay belirtilmedi." }
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
// Mağazada "Sipariş Ver" butonuna basıldığında formu seçili hale getiren fonksiyon
function selectProduct(productName) {
    const selectBox = document.getElementById('serviceType');
    for (let i = 0; i < selectBox.options.length; i++) {
        if (selectBox.options[i].text.includes(productName) || selectBox.options[i].value.includes(productName)) {
            selectBox.selectedIndex = i;
            break;
        }
    }
}
