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
    }
}


// Load selections when the page loads
window.onload = loadSelections;

// Calculate total price function (not shown in your provided code)
// Ensure it correctly calculates and updates the total price display

const bodyEL = document.querySelector('body');

bodyEL.addEventListener('mouseover', () => {
    calculateTotal();
});

function calculateTotal() {
    let total = 0;
    const selectedPsu = parseFloat(document.getElementById('psu').value);
    const selectedGpu = parseFloat(document.getElementById('gpu').value);
    const selectedDisk = parseFloat(document.getElementById('disk').value);
    const selectedMemory = parseFloat(document.getElementById('memory').value);
    const selectedCpuCooler = parseFloat(document.getElementById('CpuCooler').value);
    const selectedCpu = parseFloat(document.getElementById('cpu').value);
    const selectedCase = parseFloat(document.getElementById('case').value);
    const selectedMotherboard = parseFloat(document.getElementById('hovedkort').value);

    total = selectedPsu + selectedGpu + selectedDisk + selectedMemory + selectedCpuCooler + selectedCpu + selectedCase + selectedMotherboard;
    total = Math.round(total);
    
    const footer = document.querySelector('footer');
    footer.innerHTML = `Total pris ${total} kr`;
}

// Function to filter and display CPUs based on selected motherboard socket
async function filterAndDisplayCPUs(socketType) {
    const response = await fetch('/cpu');
    const components = await response.json();
    const filteredCPUs = components.filter(cpu => cpu.socket.startsWith(socketType));
    const componentGrid = document.getElementById('componentGrid');
    componentGrid.innerHTML = ''; // Clear existing CPU components
    filteredCPUs.forEach(cpu => {
        const card = createComponentCard(cpu, 'cpu');
        componentGrid.appendChild(card);
    });
}
