
// Sidenav
const menu = document.querySelector('.menu');
const sideNav = document.querySelector('.sidenav');
menu.addEventListener('click', () => {
    sideNav.style.width = "300px";
    sideNav.style.marginRight = "0px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
})

const close = document.querySelector('.close');
close.addEventListener('click', () => {
    sideNav.style.width = "0px";
    sideNav.style.marginRight = "-100px";
    document.body.style.backgroundColor = 'white';
})


// Domain Checker
const domainBtn = document.querySelector('.domain-btn');
domainBtn.addEventListener('click', function(e) {
    e.preventDefault();
    getKeyword();
});

function getKeyword() {
    const keyword = document.querySelector('.domainChecker').value;
    checkDomain(keyword);
}

const checkDomain = (keyword) => {
    const url = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_ym0JkUgurWIzlQCGPRKH37ggDaei3&domainName=${keyword}&credits=DA`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const result = data.DomainInfo.domainAvailability;
            checkerUI(result);
        });
}

function checkerUI(result) {
    let resultContainer = document.querySelector('.result');
    let str = "";
    if(result === "UNAVAILABLE") {
        str = `<div class="unavailable">
        <h2>Domain tidak tersedia</h2>
    </div>`;
    resultContainer.innerHTML = str;
    } else if (result === 'AVAILABLE') {
        str = `<div class="available">
        <h2>Domain Tersedia</h2>
        <a href="#packet" class="domain-btn">Pilih Paket</a>
    </div>`;
    resultContainer.innerHTML = str;
    }
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

// accordion
const accordionContent = document.querySelectorAll('.accordion-content');

accordionContent.forEach((item, index) => {
    let header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        item.classList.toggle('open');

        let descrpition = item.querySelector('.description');
        if(item.classList.contains("open")){
            descrpition.style.height = `${descrpition.scrollHeight}px`;
            item.querySelector("i").classList.replace("fa-angle-down", "fa-angle-up");
        } else {
            descrpition.style.height = "0px";
            item.querySelector("i").classList.replace("fa-angle-up", "fa-angle-down");
        }
        removeOpen(index);
    })
})

function removeOpen(index1){
    accordionContent.forEach((item2, index2) => {
        if(index1 !== index2) {
            item2.classList.remove('open');

            let des = item2.querySelector('.description');
            des.style.height = "0px";
            item2.querySelector('i').classList.replace("fa-angle-up", "fa-angle-down");
        }
    })
}