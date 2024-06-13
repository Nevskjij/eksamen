async function kurs(price) {
    const response = await fetch('/kurs');
    let data = await response.json();
    let conversionRate = data.data.NOK.value;
    let convertedPrice = Math.round(conversionRate * price);
    return convertedPrice;
}

let total = 0
async function start() {
    const componentTypes = [
        'hovedkort', 'case', 'cpu', 'CpuCooler', 'memory', 'disk', 'gpu', 'psu', 'caseAccessory', 'caseFan', 'externalHardDrive', 'fanController', 'headphones', 'keyboard', 'monitor', 'mouse', 'opticalDrive', 'os', 'soundCard', 'speakers', 'webcam', 'wiredNetworkCard', 'wirelessNetworkCard'
    ];

    // Loop through the component types
    for (const componentType of componentTypes) {
        // Get the component from local storage
        const component = localStorage.getItem(componentType);

        // Check if the component exists
        if (component) {
            // Parse the component JSON
            const { name, price } = JSON.parse(component);

            // Convert the price
            let convertedPrice = await kurs(price);
            total += convertedPrice;
            let comp = document.createElement("h5")
            comp.innerHTML = `${name}`;
            let prisEL = document.createElement("h5");
            prisEL.innerHTML = `${convertedPrice} kr`;
            let mains = document.getElementById("mains");
            mains.appendChild(comp);
            mains.appendChild(prisEL);
        }
    } 
    let totalElement = document.createElement("p");
    totalElement.innerHTML = `Totalt: ${total} kr`;
    let mains = document.getElementById("mains");
    mains.appendChild(totalElement);
}

start();
