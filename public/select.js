async function kurs(price) {
    const response = await fetch('/kurs');
    let data = await response.json();
    let conversionRate = data.data.NOK.value;
    let convertedPrice = Math.round(conversionRate * price);
    return convertedPrice;
}

async function fetchComponents(componentType) {
    const response = await fetch(`/${componentType}`);
    return response.json();
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function selectComponent(componentType, component) {
    window.opener.saveSelection(componentType, component);
    window.close();
}

async function createComponentCard(component, componentType) {
    const card = document.createElement('div');
    card.className = 'component-card';

    const convertedPrice = await kurs(component.price);

    switch (componentType) {
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

    card.onclick = () => selectComponent(componentType, component);
    return card;
}

async function showComponents() {
    const componentType = getQueryParam('component');
    const components = await fetchComponents(componentType);
    console.log(components);

    if (componentType === 'cpu') {
        const motherboardSocket = localStorage.getItem('motherboardSocket');
        if (motherboardSocket === "AM5" || motherboardSocket === "AM4" || motherboardSocket === "AM3" || motherboardSocket === "AM2" || motherboardSocket === "AM1") {
            // Use a while loop to properly iterate and remove elements
            let i = 0;
            while (i < components.length) {
                if (components[i].name.includes("Intel") || components[i].name.includes("Core")) {
                    components.splice(i, 1);
                } else {
                    i++; // Move to the next element only if no removal occurred
                }
            }
            console.log(components);
        } else if (motherboardSocket === "LGA1700" || motherboardSocket === "LGA1200" || motherboardSocket === "LGA1151" || motherboardSocket === "LGA1150" || motherboardSocket === "LGA1155" || motherboardSocket === "LGA1156") {
            // Use a while loop to properly iterate and remove elements
            let i = 0;
            while (i < components.length) {
                if (components[i].name.includes("AMD") || components[i].name.includes("Ryzen")) {
                    components.splice(i, 1);
                } else {
                    i++; // Move to the next element only if no removal occurred
                }
            }
            console.log(components);
        }
    } else if (componentType === 'hovedkort') { 
        const cpuBrand = localStorage.getItem('cpuBrand');
        console.log(cpuBrand);
        const caseform = localStorage.getItem('case');
        const slots = localStorage.getItem('motherboardSlots');
        if (cpuBrand === "Intel") {
            // Use a while loop to properly iterate and remove elements
            let i = 0;
            while (i < components.length) {
                if (components[i].socket !== "LGA1700" && components[i].socket !== "LGA1200" && components[i].socket !== "LGA1151" && components[i].socket !== "LGA1150" && components[i].socket !== "LGA1155" && components[i].socket !== "LGA1156") {
                    components.splice(i, 1);
                } else {
                    i++; // Move to the next element only if no removal occurred
                }
            }
            console.log(components);
        } else if (cpuBrand === "AMD") {
            // Use a while loop to properly iterate and remove elements
            let i = 0;
            while (i < components.length) {
                if (components[i].socket !== "AM5" && components[i].socket !== "AM4" && components[i].socket !== "AM3" && components[i].socket !== "AM2" && components[i].socket !== "AM1") {
                    components.splice(i, 1);
                } else {
                    i++; // Move to the next element only if no removal occurred
                }
            }
            //console.log(components);
        } if (caseform === "ATX") {
            // Use a while loop to properly iterate and remove elements
            let i = 0;
            while (i < components.length) {
                if (components[i].form_factor !== "ATX") {
                    components.splice(i, 1);
                } else {
                    i++; // Move to the next element only if no removal occurred
                }
            }
            console.log(components);
        } else if (caseform === "MicroATX") { 
            // Use a while loop to properly iterate and remove elements
            let i = 0;
            while (i < components.length) {
                if (components[i].form_factor !== "Micro ATX") {
                    components.splice(i, 1);
                } else {
                    i++; // Move to the next element only if no removal occurred
                }
            }
            console.log(components);
        } else if (caseform === "Mini ITX") {
            // Use a while loop to properly iterate and remove elements
            let i = 0;
            while (i < components.length) {
                if (components[i].form_factor !== "Mini ITX") {
                    components.splice(i, 1);
                } else {
                    i++; // Move to the next element only if no removal occurred
                }
            }
            console.log(components);
        }
    } else if (componentType === 'case') {
        const motherboardFormFactor = localStorage.getItem('motherboardFormFactor');
        // Use a while loop to properly iterate and remove elements
        let i = 0;
        if (motherboardFormFactor === "ATX") {
        while (i < components.length) {
            if (components[i].type.includes("Mini ITX") || components[i].type.includes("MicroATX")) {
                components.splice(i, 1);
            } else {
                i++; // Move to the next element only if no removal occurred
            }
        }
        console.log(components);
    } else if (motherboardFormFactor === "Micro ATX") {
        while (i < components.length) {
            if (components[i].type.startsWith("ATX") || components[i].type.includes("Mini ITX")) {
                components.splice(i, 1);
            } else {
                i++; // Move to the next element only if no removal occurred
            }
        }
        console.log(components);
    } else if (motherboardFormFactor === "Mini ITX") {
        while (i < components.length) {
            if (components[i].type.startsWith("ATX") || components[i].type.includes("MicroATX")) {
                components.splice(i, 1);
            } else {
                i++; // Move to the next element only if no removal occurred
            }
        }
        console.log(components);
    }
} else if (componentType === 'memory') {
    const motherboardSlots = parseInt(localStorage.getItem('motherboardSlots'));
    if (motherboardSlots === 2) {
        // Use a while loop to properly iterate and remove elements
        let i = 0;
        while (i < components.length) {
            if (components[i].modules[0] > 2) {
                components.splice(i, 1);
            } else {
                i++; // Move to the next element only if no removal occurred
            }
        }
    } else if (motherboardSlots === 4) {
        // Use a while loop to properly iterate and remove elements
        let i = 0;
        while (i < components.length) {
            if (components[i].modules[0] > 4) {
                components.splice(i, 1);
            } else {
                i++; // Move to the next element only if no removal occurred
            }
        }
    }
} else if (componentType === 'psu') {
    const gpuexist = localStorage.getItem('gpu');
    if (gpuexist != undefined) {
        // Use a while loop to properly iterate and remove elements
        let i = 0;
        while (i < components.length) {
            if (components[i].wattage < 500) {
                components.splice(i, 1);
            } else {
                i++; // Move to the next element only if no removal occurred
            }
        }
    }
}

const componentGrid = document.getElementById('componentGrid');
componentGrid.innerHTML = ''; // Clear any existing components
    for (const component of components) {
        const card = await createComponentCard(component, componentType);
        componentGrid.appendChild(card);
    }
}


// Show components when the page loads
window.onload = showComponents;
