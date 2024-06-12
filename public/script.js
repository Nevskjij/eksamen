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
}

// Load selections when the page loads
window.onload = loadSelections;

const hovedkortEL = document.getElementById('hovedkort');
const kabinettEL = document.getElementById('case');
const prosessorEL = document.getElementById('cpu');
const prosessorKjølerEL = document.getElementById('CpuCooler');
const minneEL = document.getElementById('memory');
const lagringEL = document.getElementById('disk');
const skjermkortEL = document.getElementById('gpu');
const strømforsyningEL = document.getElementById('psu');

hovedkortEL.addEventListener('mouseover', () => {
    calculateTotal()
});

kabinettEL.addEventListener('mouseover', () => {
    calculateTotal()
});

prosessorEL.addEventListener('mouseover', () => {
    calculateTotal()
});

prosessorKjølerEL.addEventListener('mouseover', () => {
    calculateTotal()
});

minneEL.addEventListener('mouseover', () => {
    calculateTotal()
});

lagringEL.addEventListener('mouseover', () => {
    calculateTotal()
});

skjermkortEL.addEventListener('mouseover', () => {
    calculateTotal()
});

strømforsyningEL.addEventListener('mouseover', () => {
    calculateTotal()
});

function calculateTotal() {
    let total = 0
    const selectedPsu = parseFloat(strømforsyningEL.value)
    const selectedGpu = parseFloat(skjermkortEL.value)
    const selectedDisk = parseFloat(lagringEL.value)
    const selectedMemory = parseFloat(minneEL.value)
    const selectedCpuCooler = parseFloat(prosessorKjølerEL.value)
    const selectedCpu = parseFloat(prosessorEL.value)
    const selectedCase = parseFloat(kabinettEL.value)
    const selectedMotherboard = parseFloat(hovedkortEL.value)
    console.log(selectedMotherboard, selectedCase, selectedCpu, selectedCpuCooler, selectedMemory, selectedDisk, selectedGpu, selectedPsu)
    total = selectedPsu + selectedGpu + selectedDisk + selectedMemory + selectedCpuCooler + selectedCpu + selectedCase + selectedMotherboard
    total = Math.round(total)
    const footer = document.querySelector('footer');
    footer.innerHTML = `Total pris ${total} kr`;
}