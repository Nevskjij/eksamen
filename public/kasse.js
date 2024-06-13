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

// Deklarerer en variabel for totalprisen
let total = 0
// Denne funksjonen laster lagrede valg fra localStorage
async function start() {
    const componentTypes = [
        'hovedkort', 'case', 'cpu', 'CpuCooler', 'memory', 'disk', 'gpu', 'psu', 'caseAccessory', 'caseFan', 'externalHardDrive', 'fanController', 'headphones', 'keyboard', 'monitor', 'mouse', 'opticalDrive', 'os', 'soundCard', 'speakers', 'webcam', 'wiredNetworkCard', 'wirelessNetworkCard'
    ];

    // Går gjennom hver komponenttype 
    for (const componentType of componentTypes) {
        // Henter komponenten fra localStorage basert på komponenttypen
        const component = localStorage.getItem(componentType);

        // Sjekker om komponenten finnes i localStorage
        if (component) {
            // Parser JSON-dataen til komponentens navn og pris
            const { name, price } = JSON.parse(component);

            // Konverterer prisen til NOK ved å kalle på kurs-funksjonen
            let convertedPrice = await kurs(price);
            // Legger til den konverterte prisen til totalen
            total += convertedPrice;
            // Oppretter HTML-elementer for å vise komponentens navn og pris i NOK
            let comp = document.createElement("h5")
            comp.innerHTML = `${componentType.charAt(0).toUpperCase() + componentType.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}: ${name}`;
            let prisEL = document.createElement("h5");
            prisEL.innerHTML = `${convertedPrice} kr`;

            // Legger til HTML-elementene til hovedelementet med id "mains" i dokumentet
            let mains = document.getElementById("mains");
            mains.appendChild(comp);
            mains.appendChild(prisEL);
        }
    } 

    // Oppretter et HTML-element for å vise totalprisen
    let totalElement = document.createElement("p");
    totalElement.innerHTML = `Totalt: ${total} kr`;
    totalElement.style.color = "green";
    totalElement.style.fontSize = "50px";

    // Legger til totalpris-elementet til hovedelementet med id "mains" i dokumentet
    let mains = document.getElementById("mains");
    mains.appendChild(totalElement);
}

// Starter funksjonen når siden lastes
start();
