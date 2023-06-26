const domainBtn = document.querySelector('.domain-btn');
domainBtn.addEventListener('click', function(e) {
    e.preventDefault();
    getKeyword();
});

function getKeyword() {
    const keyword = document.querySelector('.domainChecker').value;
    const areAvailabel = checkDomain(keyword);
    if(areAvailabel === 'UNAVAILABLE') {
        alert('domain tidak tersedia');
    } else {
        alert('domain tersedia');
    }
}


const checkDomain = async (keyword) => {
    const url = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_ym0JkUgurWIzlQCGPRKH37ggDaei3&domainName=${keyword}&credits=DA`;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            const result = data.DomainInfo.domainAvailability;
            return result;
        });
}

// Packet Selection
const select = document.getElementById('packet');
select.addEventListener('change', function() {
    const value = select.options[select.selectedIndex].value;
    getData(value);
})


function getData(value) {
    fetch('./data/packet.json')
        .then(response => response.json())
        .then(data => {
            const result = data.filter(d => d.name == value);
            changePacketUI(result);
        });
}

function changePacketUI(result) {
    const resultData = result.reduce((result, current) => {
        return { ...result, ...current};
    }, {});
    const card = document.getElementById('container');

    str = `<div class="card packet-card">
    <div class="packet-name">
        <p>${resultData.type}</p>
        <h1>${resultData.name}</h1>
    </div>
    <div class="price">
        <s>${resultData.normalPrice}</s>
        <span class="discount-price leading">${resultData.discountPrice}</span>
    </div>
    <ul class="content">
        <li>
            <img src="assets/img/tech/disk.png" alt="disk-icon">
            <div class="text">
                <span class="feature-name">Disk</span>
                <span class="feature-value">${resultData.features.disk}</span>
            </div>
        </li>
        <li>
            <img src="assets/img/tech/bandwidth.png" alt="disk-icon">
            <div class="text">
                <span class="feature-name">Bandwidth</span>
                <span class="feature-value">${resultData.features.bandwith}</span>
            </div>
        </li>
        <li>
            <img src="assets/img/tech/cpu.png" alt="disk-icon">
            <div class="text">
                <span class="feature-name">Core CPU</span>
                <span class="feature-value">${resultData.features.core}</span>
            </div>
        </li>
        <li>
            <img src="assets/img/tech/addon.png" alt="disk-icon">
            <div class="text">
                <span class="feature-name">Addon / parked domain</span>
                <span class="feature-value">${resultData.features.addon}</span>
            </div>
        </li>
    </ul>
    <a href="" class="order-btn">Pesan Sekarang</a>
</div>`;

card.innerHTML = str;
}