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

async function fetchComponents(componentType) {
    const response = await fetch(`/${componentType}`); // Gjør en nettverksforespørsel med komponenttypen som parameter
    return response.json(); // Returnerer responsen i JSON-format
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search); // Henter URL-parametre
    return urlParams.get(param); // Returnerer verdien til den spesifiserte parameteren
}

function selectComponent(componentType, component) {
    window.opener.saveSelection(componentType, component); // Lagrer valgt komponent via en funksjon på forelder-vinduet
    window.close(); // Lukker gjeldende vindu
}

async function createComponentCard(component, componentType) {
    const card = document.createElement('div'); // Oppretter en ny <div> for å vise komponenten
    card.className = 'component-card'; // Legger til CSS-klasse for stilisering

    const convertedPrice = await kurs(component.price); // Konverterer prisen til NOK

     // Basert på komponenttypen, oppretter HTML-innholdet for komponentkortet
    switch (componentType) {
        // Hver case inneholder spesifikk HTML-struktur basert på komponenttypen
        // Her vises komponentnavn, pris, og spesifikke egenskaper for hver type komponent
        case 'hovedkort':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-socket">Socket: ${component.socket}</div>
                <div class="component-form_factor">Produktformfaktor: ${component.form_factor}</div>
                <div class="component-memory-slots">Minne Slots: ${component.memory_slots}</div>
            `;
            break;
        case 'case':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Type: ${component.type}</div>
                <div class="component-color">Farge: ${component.color}</div>
                <div class="component-side-panel">Side Panel: ${component.side_panel}</div>
            `;
            break;
        case 'cpu':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-core-count">Kjerner: ${component.core_count}</div>
                <div class="component-core-clock">Hastighet: ${component.core_clock} GHz</div>
                <div class="component-boost-clock">Maksimal Hastighet: ${component.boost_clock} GHz</div>
                <div class="component-tdp">Påkrevd Strøm ${component.tdp}w</div>
                <div class="component-socket">Socket: ${component.socket}</div>
            `;
            break;
        case 'CpuCooler':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">RPM: ${component.rpm}</div>
                <div class="component-color">Støy: ${component.noise_level} db</div>
                <div class="component-side-panel">Farge: ${component.color}</div>
            `;
            break;
        case 'memory':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Fart: ${component.speed[1]} MHz</div>
                <div class="component-color">DDR${component.speed[0]}</div>
                <div class="component-side-panel">Type: ${component.modules[0]}x${component.modules[1]} GB</div>
                <div class="component-color">Farge: ${component.color}</div>
            `;
            break;
        case 'gpu':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Chip: ${component.chipset}</div>
                <div class="component-color">Minne: ${component.memory} GB</div>
                <div class="component-side-panel">Hastighet: ${component.core_clock} MHz</div>
                <div class="component-color">Maksimal hastighet: ${component.boost_clock} MHz</div>
            `;
            break;
        case 'disk':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Lagringsplass: ${component.capacity} GB</div>
                <div class="component-color">Type: ${component.type}</div>
                <div class="component-side-panel">Tilkoblings type: ${component.form_factor}</div>
                <div class="component-color">Tilkoblingsport: ${component.interface}</div>
            `;
            break;
        case 'psu':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Type: ${component.type}</div>
                <div class="component-color">Effektivitet: ${component.efficiency}</div>
                <div class="component-side-panel">Watt: ${component.wattage}</div>
            `;
            break;
        case 'caseAccessory':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Type: ${component.type}</div>
                <div class="component-color">Form faktor: ${component.form_factor}</div>
            `;
            break;
        case 'caseFan': 
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-color">Størrelse: ${component.size}</div>
                <div class="component-side-panel">RPM: ${component.rpm}</div>
                <div class="component-color">Støy: ${component.noise_level} db</div>
            `;
            break;
        case 'externalHardDrive':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Type: ${component.type}</div>
                <div class="component-color">Kapasitet: ${component.capacity} GB</div>
                <div class="component-side-panel">Tilkobling: ${component.interface}</div>
            `;
            break;
        case 'fanController':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Porter: ${component.channels}</div>
            `;
            break;
        case 'headphones':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-name">Mikrofon: ${component.microphone}</div>
                <div class="component-name">Trådløst ${component.wireless}</div>
                <div class="component-name">Farge: ${component.color}</div>
            `;
            break;
        case 'keyboard':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-name">Type: ${component.style}</div>
                <div class="component-name">Switches: ${component.switches}</div>
                <div class="component-name">Tilkobling: ${component.connection_type}</div>
            `;
            break;
        case 'monitor':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-name">Oppløsning: ${component.resolution}</div>
                <div class="component-name">Størrelse: ${component.size} tommer</div>
                <div class="component-name">Hertz: ${component.refresh_rate} hz</div>
                <div class="component-name">Panel type: ${component.panel_type}</div>
            `;
            break;
        case 'mouse':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-name">Tracking: ${component.tracking_method}</div>
                <div class="component-name">Tilkobling: ${component.connection_type}</div>
                <div class="component-name">Maks DPI: ${component.max_dpi}</div>
                <div class="component-name">Hånd: ${component.hand_orientation}</div>
            `;
            break;
        case 'opticalDrive':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-name">Dvd: ${component.dvd}</div>
                <div class="component-name">Blu-ray: ${component.bd}</div>
                <div class="component-name">CD: ${component.cd}</div>
            `;  
            break;
        case 'os':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-bit">Bit: ${component.mode}</div>
            `;
            break;
        case 'soundCard':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-kanal">Kanal: ${component.channels}</div>
                <div class="component-prøvefrekvens">Prøvefrekvens: ${component.sample_rate}</div>
                <div class="component-bit">Chip: ${component.chipset}</div>
            `;
            break;
        case 'wirelessNetworkCard':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-type">Protokoll: ${component.protocol}</div>
            `;
            break;
        case 'speakers':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-antall">Antall: ${component.configuration}</div>
                <div class="component-watt">Frekvens: ${component.frequency_response} Hz</div>
            `;
            break;
        case 'webcam':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
                <div class="component-name">Oppløsning: ${component.resolutions}</div>
            `;
            break;
        case 'wiredNetworkCard':
            card.innerHTML = `
                <div class="component-name">${component.name}</div>
                <div class="component-price">${convertedPrice} kr</div>
            `;
            break;
        default:
            break;
    }

    card.onclick = () => selectComponent(componentType, component); // Legger til klikkfunksjon for å velge komponenten
    return card; // Returnerer det opprettede komponentkortet
}

async function showComponents() {
    const componentType = getQueryParam('component'); // Henter komponenttypen fra URL-parameteren

    // Henter komponenter basert på komponenttypen fra serveren
    const components = await fetchComponents(componentType);

     // Utfører filtrering basert på spesifikke kriterier avhengig av komponenttypen
    if (componentType === 'cpu') {
        // Filtrer ut CPU-er basert på hovedkortets socket-type eller CPU-merke
        const motherboardSocket = localStorage.getItem('motherboardSocket');
        if (motherboardSocket === "AM5" || motherboardSocket === "AM4" || motherboardSocket === "AM3" || motherboardSocket === "AM2" || motherboardSocket === "AM1") {
            // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
            let i = 0;
            while (i < components.length) {
                if (components[i].name.includes("Intel") || components[i].name.includes("Core")) {
                    components.splice(i, 1);
                } else {
                    i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
                }
            }

        } else if (motherboardSocket === "LGA1700" || motherboardSocket === "LGA1200" || motherboardSocket === "LGA1151" || motherboardSocket === "LGA1150" || motherboardSocket === "LGA1155" || motherboardSocket === "LGA1156") {
            // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
            let i = 0;
            while (i < components.length) {
                if (components[i].name.includes("AMD") || components[i].name.includes("Ryzen")) {
                    components.splice(i, 1);
                } else {
                    i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
                }
            }

        }
    } else if (componentType === 'hovedkort') { 
        // Filtrer ut hovedkort basert på CPU-merke og kabinettformfaktor
        const cpuBrand = localStorage.getItem('cpuBrand');
        console.log(cpuBrand);
        const caseform = localStorage.getItem('case');
        const slots = localStorage.getItem('motherboardSlots');
        if (cpuBrand === "Intel") {
            // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
            let i = 0;
            while (i < components.length) {
                if (components[i].socket !== "LGA1700" && components[i].socket !== "LGA1200" && components[i].socket !== "LGA1151" && components[i].socket !== "LGA1150" && components[i].socket !== "LGA1155" && components[i].socket !== "LGA1156") {
                    components.splice(i, 1);
                } else {
                    i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
                }
            }

        } else if (cpuBrand === "AMD") {
            // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
            let i = 0;
            while (i < components.length) {
                if (components[i].socket !== "AM5" && components[i].socket !== "AM4" && components[i].socket !== "AM3" && components[i].socket !== "AM2" && components[i].socket !== "AM1") {
                    components.splice(i, 1);
                } else {
                    i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
                }
            }
        } if (caseform === "ATX") {
            // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
            let i = 0;
            while (i < components.length) {
                if (components[i].form_factor !== "ATX") {
                    components.splice(i, 1);
                } else {
                    i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
                }
            }
        } else if (caseform === "MicroATX") { 
            // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
            let i = 0;
            while (i < components.length) {
                if (components[i].form_factor !== "Micro ATX") {
                    components.splice(i, 1);
                } else {
                    i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
                }
            }
        } else if (caseform === "Mini ITX") {
            // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
            let i = 0;
            while (i < components.length) {
                if (components[i].form_factor !== "Mini ITX") {
                    components.splice(i, 1);
                } else {
                    i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
                }
            }
        }
    } else if (componentType === 'case') {
        // Filtrer ut kabinetter basert på hovedkortets formfaktor
        const motherboardFormFactor = localStorage.getItem('motherboardFormFactor');
        // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
        let i = 0;
        if (motherboardFormFactor === "ATX") {
        while (i < components.length) {
            if (components[i].type.includes("Mini ITX") || components[i].type.includes("MicroATX")) {
                components.splice(i, 1);
            } else {
                i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
            }
        }
        console.log(components);
    } else if (motherboardFormFactor === "Micro ATX") {
        while (i < components.length) {
            if (components[i].type.startsWith("ATX") || components[i].type.includes("Mini ITX")) {
                components.splice(i, 1);
            } else {
                i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
            }
        }
        console.log(components);
    } else if (motherboardFormFactor === "Mini ITX") {
        while (i < components.length) {
            if (components[i].type.startsWith("ATX") || components[i].type.includes("MicroATX")) {
                components.splice(i, 1);
            } else {
                i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
            }
        }
        console.log(components);
    }
} else if (componentType === 'memory') {
    // Filtrer ut minne basert på antall minnespor på hovedkortet
    const motherboardSlots = parseInt(localStorage.getItem('motherboardSlots'));
    if (motherboardSlots === 2) {
        // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
        let i = 0;
        while (i < components.length) {
            if (components[i].modules[0] > 2) {
                components.splice(i, 1);
            } else {
                i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
            }
        }
    } else if (motherboardSlots === 4) {
        // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
        let i = 0;
        while (i < components.length) {
            if (components[i].modules[0] > 4) {
                components.splice(i, 1);
            } else {
                i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
            }
        }
    }
} else if (componentType === 'psu') {
    // Filtrer ut strømforsyninger basert på dersom det er et dedikert skjermkort
    const gpuexist = localStorage.getItem('gpu');
    if (gpuexist != undefined) {
        // Bruker en while løkke for å gå gjennom alle komponentene og fjerne de som ikke møter kravet
        let i = 0;
        while (i < components.length) {
            if (components[i].wattage < 500) {
                components.splice(i, 1);
            } else {
                i++; // Forsetter til neste i kø dersom ingen fjerning skjedde
            }
        }
    }
}

const componentGrid = document.getElementById('componentGrid');
componentGrid.innerHTML = ''; // Tømmer innholdet i komponentgridet

// Oppretter og legger til komponentkort for hvert filtrert komponent i komponentruten
    for (const component of components) {
        const card = await createComponentCard(component, componentType);
        componentGrid.appendChild(card);
    }
}


// Laster inn komponenter når siden lastes
window.onload = showComponents;
