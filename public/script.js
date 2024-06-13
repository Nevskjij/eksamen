async function kurs(price) {
    const response = await fetch('/kurs');
    let data = await response.json();
    let conversionRate = data.data.NOK.value;
    let convertedPrice = Math.round(conversionRate * price);
    return convertedPrice;
}

// Function to handle component selection
function selectComponent(componentType) {
    console.log(componentType);
    // Open a new window to select the component
    const newWindow = window.open(`/select.html?component=${componentType}`, '_blank');
}

// Function to update the button text and value
async function updateButton(componentType, component) {
    const button = document.getElementById(componentType);
    const convertedPrice = await kurs(component.price);
    button.textContent = `${component.name} - ${convertedPrice} kr`;
    button.value = convertedPrice;
}

// Load saved selections from localStorage
function loadSelections() {
    const componentTypes = [
        'hovedkort', 'case', 'cpu', 'CpuCooler',
        'memory', 'disk', 'gpu', 'psu'
    ];

    componentTypes.forEach(type => {
        const savedComponent = JSON.parse(localStorage.getItem(type));
        if (savedComponent) {
            updateButton(type, savedComponent);
        }
    });
}

// Save selected component to localStorage and update button
function saveSelection(componentType, component) {
    localStorage.setItem(componentType, JSON.stringify(component));
    updateButton(componentType, component);

    if (componentType === 'hovedkort') {
        localStorage.setItem('motherboardSocket', component.socket);
        localStorage.setItem('motherboardFormFactor', component.form_factor);
        localStorage.setItem('motherboardSlots', component.memory_slots);
    }
    if (componentType === 'cpu') {
        const cpuBrand = component.name.includes("Intel") ? "Intel" : "AMD";
        localStorage.setItem('cpuBrand', cpuBrand);
    }
    if (componentType === 'case') {
        if (component.type.startsWith("ATX")) {
            localStorage.setItem('caseType', "ATX");
        } else if (component.type.includes("MicroATX")) {
            localStorage.setItem('caseType', "MicroATX");
        } else if (component.type.includes("Mini-ITX")) {
            localStorage.setItem('caseType', "Mini-ITX");
        }
    }
    if (componentType === 'memory') {
        localStorage.setItem('memorySlots', component.modules[0]);
    }
}

// Load selections when the page loads
window.onload = loadSelections;

const bodyEL = document.querySelector('body');

bodyEL.addEventListener('mouseover', () => {
    calculateTotal();
});

function calculateTotal() {
    const componentTypes = [
        'hovedkort', 'case', 'cpu', 'CpuCooler',
        'memory', 'disk', 'gpu', 'psu'
    ];

    let total = 0;

    componentTypes.forEach(type => {
        const element = document.getElementById(type);
        if (element && element.value) {
            total += parseFloat(element.value) || 0;
        }
    });

    total = Math.round(total);
    const footer = document.querySelector('footer');
    footer.innerHTML = `Total pris ${total} kr`;

    const cpu = JSON.parse(localStorage.getItem('cpu'));
    const gpu = JSON.parse(localStorage.getItem('gpu'));
    if (cpu.graphics == null && gpu == undefined) {
        const melding = document.getElementById('melding');
        melding.innerHTML = 'Du har ikke valgt en GPU eller CPU med integrert grafikk. Vennligst velg en av disse for å kunne fullføre byggingen.';
    }
}
calculateTotal()

function exporter() { 
    console.log(123)
}