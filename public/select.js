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
    // Save the selected component and close the window
    window.opener.saveSelection(componentType, component);
    window.close();
}

async function createComponentCard(component, componentType) {
    const card = document.createElement('div');
    card.className = 'component-card';

    const convertedPrice = await kurs(component.price);

    if (componentType === 'hovedkort') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-socket">Socket: ${component.socket}</div>
            <div class="component-form_factor">Produktformfaktor: ${component.form_factor}</div>
            <div class="component-memory-slots">Minne Slots: ${component.memory_slots}</div>
        `;
    } else if (componentType === 'case') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-type">Type: ${component.type}</div>
            <div class="component-color">Farge: ${component.color}</div>
            <div class="component-side-panel">Side Panel: ${component.side_panel}</div>
        `;
    } else if (componentType === 'cpu') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-core-count">Kjerner: ${component.core_count}</div>
            <div class="component-core-clock">Hastighet: ${component.core_clock} GHz</div>
            <div class="component-boost-clock">Maksimal Hastighet: ${component.boost_clock} GHz</div>
            <div class="component-tdp">Påkrevd Strøm ${component.tdp}w</div>
        `;
    } else if (componentType === 'CpuCooler') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-type">RPM: ${component.rpm}</div>
            <div class="component-color">Lydhøyde: ${component.noise_level} db</div>
            <div class="component-side-panel">Farge: ${component.color}</div>
        `;
    } else if (componentType === 'memory') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-type">Fart: ${component.speed[1]} MHz</div>
            <div class="component-color">DDR${component.speed[0]}</div>
            <div class="component-side-panel">Type: ${component.modules[0]}x${component.modules[1]} GB</div>
            <div class="component-color">Farge: ${component.color}</div>
        `;
    } else if (componentType === 'gpu') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-type">Chip: ${component.chipset}</div>
            <div class="component-color">Minne: ${component.memory} GB</div>
            <div class="component-side-panel">Hastighet: ${component.core_clock} MHz</div>
            <div class="component-color">Maksimal hastighet: ${component.boost_clock} MHz</div>
        `;
    } else if (componentType === 'disk') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-type">Lagringsplass: ${component.capacity} GB</div>
            <div class="component-color">Type: ${component.type}</div>
            <div class="component-side-panel">Tilkoblings type: ${component.form_factor}</div>
            <div class="component-color">Tilkoblingsport: ${component.interface}</div>
        `;
    } else if (componentType === 'psu') {
        card.innerHTML = `
            <div class="component-name">${component.name}</div>
            <div class="component-price">${convertedPrice} kr</div>
            <div class="component-type">Type: ${component.type}</div>
            <div class="component-color">Effektivitet: ${component.efficiency}</div>
            <div class="component-side-panel">Watt: ${component.wattage}</div>
        `;
    }

    card.onclick = () => selectComponent(componentType, component);
    return card;
}

async function showComponents() {
    const componentType = getQueryParam('component');
    const components = await fetchComponents(componentType);

    const componentGrid = document.getElementById('componentGrid');
    for (const component of components) {
        const card = await createComponentCard(component, componentType);
        componentGrid.appendChild(card);
    }
}

// Show components when the page loads
window.onload = showComponents;
