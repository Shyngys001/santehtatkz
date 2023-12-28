const addressInfoData = [
    {
        city: "Алматы (Office)",
        address: "ул.Шевченко 165В, 7 этаж, 703 офис",
        number: "+7 771 731 28 48",
        email: 'info@santehtat.kz'
    },
    {
        city: "Алматы",
        address: "ул.Немировича-Данченко 18А",
        number: "+7 701 300 54 02",
        email: 'almaty@santehtat.kz'
    },
    {
        city: "Астана",
        address: "ул.Жана-Жол, дом 2, офис 1",
        number: "+7 701 300 54 14",
        email: 'astana@santehtat.kz'
    },
    {
        city: "Орал",
        address: "ул.Молдагулова 26ПБ, 1 этаж",
        number: "+7 771 788 88 91",
        email: 'oral@santehtat.kz'
    },
    {
        city: "Атырау",
        address: "трасса Атырау-Доссор 34",
        number: "+7 771 565 53 35",
        email: 'atyrau@santehtat.kz'
    },
    {
        city: "Актау",
        address: "мкр 29, ул.Толкын 2, 17А",
        number: "+7 701 081 86 18",
        email: 'aktau@santehtat.kz'
    },
    {
        city: "Кандыагаш",
        address: 'Рынок "Алан", 1 этаж',
        number: "+7 701 081 86 15",
        email: 'aktobe@santehtat.kz'
    }
]
const contactCard = document.querySelector('.contact-cards');

for (const address of addressInfoData) {
    contactCard.innerHTML += `
        <div class="card">
            <div class="city">
                <p class="text-blue">
                    <ion-icon name="home-outline" aria-hidden="true" aria-hidden="true"></ion-icon>
                    Город
                </p>
                <p>${address.city}</p>
            </div>
            <div class="address">
                <p class="text-blue">
                    <ion-icon name="location-outline" aria-hidden="true" aria-hidden="true"></ion-icon>
                    Адрес
                </p>
                <a href="https://2gis.kz/almaty/search/${address.address}">
                    ${address.address}
                </a>
            </div>
            <div class="phone">
                <p class="text-blue">
                    <ion-icon name="call-outline" aria-hidden="true" aria-hidden="true"></ion-icon>
                    Контакты
                </p>
                <a href="tel:${address.number}">${address.number}</a>
                <a href="mailto:${address.email}">${address.email}</a>
              </div>
        </div>
    `
}