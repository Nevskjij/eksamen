// script.js

let kurs = 10.6901114765

const hovedkortEL = document.getElementById('hovedkort');
const kabinettEL = document.getElementById('kabinett');
const prosessorEL = document.getElementById('prosessor');
const prosessorKjølerEL = document.getElementById('prosessorKjøler');
const minneEL = document.getElementById('minne');
const lagringEL = document.getElementById('lagring');
const skjermkortEL = document.getElementById('skjermkort');
const strømforsyningEL = document.getElementById('strømforsyning');

let motherboards = [];
let cases = [];
let cpus = [];
let cpuCoolers = [];
let memory = [];
let disks = [];
let gpus = [];
let psus = [];

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

async function populateDropdown(element, data) {
    element.innerHTML = ''; // Clear existing options
    const option = document.createElement('option');
    option.value = 0;
    element.appendChild(option);
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.price;
        option.textContent = `${item.name} - ${Math.round(item.price*kurs)} kr`;
        element.appendChild(option);
    });
}

async function showComponents() {
    [motherboards, cases, cpus, cpuCoolers, memory, disks, gpus, psus] = await Promise.all([
        fetchData('/hovedkort'),
        fetchData('/case'),
        fetchData('/cpu'),
        fetchData('/CpuCooler'),
        fetchData('/memory'),
        fetchData('/disk'),
        fetchData('/gpu'),
        fetchData('/psu')
    ]);

    populateDropdown(hovedkortEL, motherboards);
    populateDropdown(kabinettEL, cases);
    populateDropdown(prosessorEL, cpus);
    populateDropdown(prosessorKjølerEL, cpuCoolers);
    populateDropdown(minneEL, memory);
    populateDropdown(lagringEL, disks);
    populateDropdown(skjermkortEL, gpus);
    populateDropdown(strømforsyningEL, psus);
}

    hovedkortEL.addEventListener('change', () => {
        calculateTotal()
    });

    kabinettEL.addEventListener('change', () => {
        calculateTotal()
    });

    prosessorEL.addEventListener('change', () => {
        calculateTotal()
    });

    prosessorKjølerEL.addEventListener('change', () => {
        calculateTotal()
    });

    minneEL.addEventListener('change', () => {
        calculateTotal()
    });

    lagringEL.addEventListener('change', () => {
        calculateTotal()
    });

    skjermkortEL.addEventListener('change', () => {
        calculateTotal()
    });

    strømforsyningEL.addEventListener('change', () => {
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
        total = Math.round(total*kurs)
        const footer = document.querySelector('footer');
        footer.innerHTML = `Total pris ${total} kr`;
    }


function start() {
    showComponents();
}

start();
