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
