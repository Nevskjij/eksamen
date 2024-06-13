// Denne funksjonen ser ut til å hente kursinformasjon fra /kurs og konvertere prisen basert på den hentede kursen. Her er kommentarer til hver linje:
async function kurs(price) {
    // Henter kursinformasjonen fra serveren
    const response = await fetch('/kurs');
    let data = await response.json();
    // Henter konverteringsratens verdi fra responsen
    let conversionRate = data.data.NOK.value;
    // Beregner den konverterte prisen og runder av til nærmeste heltall
    let convertedPrice = Math.round(conversionRate * price);
    return convertedPrice;
}

// Denne funksjonen åpner en ny fane for å velge komponenter:
function selectComponent(componentType) {
    // Åpner et nytt vindu for å velge komponenten
    const newWindow = window.open(`/select.html?component=${componentType}`, '_blank');
}

// Denne funksjonen oppdaterer knappens tekst og verdi basert på den konverterte prisen:
async function updateButton(componentType, component) {
    const button = document.getElementById(componentType);
    // Henter den konverterte prisen for komponenten
    const convertedPrice = await kurs(component.price);
    // Oppdaterer knappens tekst med komponentens navn og den konverterte prisen
    button.textContent = `${component.name} - ${convertedPrice} kr`;
    button.value = convertedPrice;
}

// Denne funksjonen laster lagrede valg fra localStorage
function loadSelections() {
    const componentTypes = [
        'hovedkort', 'case', 'cpu', 'CpuCooler', 'memory', 'disk', 'gpu', 'psu', 'caseAccessory', 'caseFan', 'externalHardDrive', 'fanController', 'headphones', 'keyboard', 'monitor', 'mouse', 'opticalDrive', 'os', 'soundCard', 'speakers', 'webcam', 'wiredNetworkCard', 'wirelessNetworkCard'
    ];
    // Går gjennom hver komponenttype og oppdaterer knappen hvis det er lagret data
    componentTypes.forEach(type => {
        const savedComponent = JSON.parse(localStorage.getItem(type));
        if (savedComponent) {
            updateButton(type, savedComponent);
        }
    });
}


// Denne funksjonen lagrer valgte komponenter til localStorage og oppdaterer knappen:
function saveSelection(componentType, component) {
    // Lagrer komponenten som JSON i localStorage
    localStorage.setItem(componentType, JSON.stringify(component));
    // Oppdaterer knappen med den nye komponenten
    updateButton(componentType, component);

    // Henter inn og lagrer spesifikke egenskaper for hovedkort, CPU, kabinett og minne som skal brukes senere
    if (componentType === 'hovedkort') {
        localStorage.setItem('motherboardSocket', component.socket);
        localStorage.setItem('motherboardFormFactor', component.form_factor);
        localStorage.setItem('motherboardSlots', component.memory_slots);
    }
    if (componentType === 'cpu') {
        // Sjekker om CPU-en er fra Intel eller AMD og lagrer det
        const cpuBrand = component.name.includes("Intel") ? "Intel" : "AMD";
        localStorage.setItem('cpuBrand', cpuBrand);
    }
    if (componentType === 'case') {
        // Sjekker hvilken type kabinett det er og lagrer det
        if (component.type.startsWith("ATX")) {
            localStorage.setItem('caseType', "ATX");
        } else if (component.type.includes("MicroATX")) {
            localStorage.setItem('caseType', "MicroATX");
        } else if (component.type.includes("Mini-ITX")) {
            localStorage.setItem('caseType', "Mini-ITX");
        }
    }
    if (componentType === 'memory') {
        // Lagrer antall minnemoduler
        localStorage.setItem('memorySlots', component.modules[0]);
    }
}


// Laster inn valgte komponenter når siden lastes hvis de finnes i localStorage
window.onload = loadSelections;

// Denne funksjonen starter funksjonen som regner ut totalprisen basert på valgte komponenter og viser den i footer
const bodyEL = document.querySelector('body');
bodyEL.addEventListener('mouseover', () => {
    calculateTotal();
});

// Denne funksjonen regner ut totalprisen basert på valgte komponenter og viser den i footer
function calculateTotal() {
    const componentTypes = [
        'hovedkort', 'case', 'cpu', 'CpuCooler', 'memory', 'disk', 'gpu', 'psu', 'caseAccessory', 'caseFan', 'externalHardDrive', 'fanController', 'headphones', 'keyboard', 'monitor', 'mouse', 'opticalDrive', 'os', 'soundCard', 'speakers', 'webcam', 'wiredNetworkCard', 'wirelessNetworkCard'
    ];

    let total = 0;

    // Beregner totalprisen ved å gå gjennom hver komponenttype
    componentTypes.forEach(type => {
        const element = document.getElementById(type);
        if (element && element.value) {
            total += parseFloat(element.value) || 0;
        }
    });

    // Runder av totalprisen til nærmeste heltall
    total = Math.round(total);
    const footer = document.querySelector('footer');
    footer.innerHTML = `Total pris ${total} kr`;

    // Sjekker om det er valgt en GPU eller CPU med integrert grafikk
    const cpu = JSON.parse(localStorage.getItem('cpu'));
    const gpu = JSON.parse(localStorage.getItem('gpu'));
    // Hvis ingen GPU er valgt og CPU-en ikke har integrert grafikk, vises en melding
    if (cpu.graphics == null && gpu == undefined) {
        const melding = document.getElementById('melding');
        melding.innerHTML = 'Du har ikke valgt en GPU eller CPU med integrert grafikk. Vennligst velg en av disse for å kunne fullføre byggingen.';
    }
    else {
        const melding = document.getElementById('melding');
        melding.innerHTML = '';
    }
}
calculateTotal()

// Denne funksjonen fjerner en valgt komponent fra localStorage og oppdaterer knappen
function fjern(key) {
    if (key === 'hovedkort') {
        localStorage.removeItem('motherboardSocket');
        localStorage.removeItem('motherboardFormFactor');
        localStorage.removeItem('motherboardSlots');
    } else if (key === 'cpu') {
        localStorage.removeItem('cpuBrand');
    } else if (key === 'case') {
        localStorage.removeItem('caseType');
    } else if (key === 'memory') {
        localStorage.removeItem('memorySlots');
    }
    localStorage.removeItem(key)
    location.reload();
}

// Denne funksjonen eksporterer lagrede komponenter til en JSON-fil:
async function exporter() {
    const componentTypes = [
        'hovedkort', 'case', 'cpu', 'CpuCooler', 'memory', 'disk', 'gpu', 'psu', 'caseAccessory', 'caseFan', 'externalHardDrive', 'fanController', 'headphones', 'keyboard', 'monitor', 'mouse', 'opticalDrive', 'os', 'soundCard', 'speakers', 'webcam', 'wiredNetworkCard', 'wirelessNetworkCard'
    ];

    const componentArray = [];
    
    // Henter konverteringsraten én gang
    const response = await fetch('/kurs');
    const data = await response.json();
    const conversionRate = data.data.NOK.value;

    // Oppdaterer prisen på hver komponent med konverteringsraten
    for (const type of componentTypes) {
        const savedComponent = JSON.parse(localStorage.getItem(type));
        if (savedComponent) {
            savedComponent.price = Math.round(conversionRate * savedComponent.price);
            componentArray.push(savedComponent);
        }
    }

    console.log(componentArray);

    // Konverterer arrayet til JSON og oppretter en Blob
    // Blob er en datatype som kan lagre store mengder data
    const jsonString = JSON.stringify(componentArray, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    // Oppretter en nedlastingslenke og utløser nedlastningen
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.json";

    document.body.appendChild(a);
    a.click();

    // Rydder opp
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}