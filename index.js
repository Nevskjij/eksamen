const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("index.html");
});

const pris = require("./json/pris.json");
app.get("/kurs", (req, res) => {
    res.json(pris);
});

const motherboard = require("./json/motherboard.json");
app.get("/hovedkort", (req, res) => {
    const filteredM = motherboard.filter(g => g.price !== null);
    res.json(filteredM);
    //res.json(motherboard);
});

const Case = require("./json/case.json");
app.get("/case", (req, res) => {
    const fliteredC = Case.filter(g => g.price !== null);
    res.json(fliteredC);
    //res.json(Case);
});

const cpu = require("./json/cpu.json");
app.get("/cpu", (req, res) => {
    const fliteredcpu = cpu.filter(g => g.price !== null);
    res.json(fliteredcpu);
    //res.json(cpu);
});

const CpuCooler = require("./json/cpu-cooler.json");
app.get("/CpuCooler", (req, res) => {
    const fliteredCpuCooler = CpuCooler.filter(g => g.price !== null);
    res.json(fliteredCpuCooler);
    //res.json(CpuCooler);
});

const memory = require("./json/memory.json");
app.get("/memory", (req, res) => {
    const fliteredmemory = memory.filter(g => g.price !== null);
    res.json(fliteredmemory);
    //res.json(memory);
});

const gpu = require("./json/video-card.json");
app.get("/gpu", (req, res) => {
    const filteredGpu = gpu.filter(g => g.price !== null);
    res.json(filteredGpu);
    //res.json(gpu);
});

const nvme = require("./json/internal-hard-drive.json");
app.get("/disk", (req, res) => {
    const filterednvme = nvme.filter(g => g.price !== null);
    res.json(filterednvme);
    //res.json(nvme);
});

const psu = require("./json/power-supply.json");
app.get("/psu", (req, res) => {
    const filteredpsu = psu.filter(g => g.price !== null);
    res.json(filteredpsu);
    //res.json(psu);
});

//Mindre viktige komponenter
const hdd = require("./json/external-hard-drive.json");
const caseAccessory = require("./json/case-accessory.json");
const caseFan = require("./json/case-fan.json");
const externalHardDrive = require("./json/external-hard-drive.json");
const fanController = require("./json/fan-controller.json");
const headphones = require("./json/headphones.json");
const keyboard = require("./json/keyboard.json");
const monitor = require("./json/monitor.json");
const mouse = require("./json/mouse.json");
const opticalDrive = require("./json/optical-drive.json");
const os = require("./json/os.json");
const soundCard = require("./json/sound-card.json");
const speakers = require("./json/speakers.json");
const webcam = require("./json/webcam.json");
const wiredNetworkCard = require("./json/wired-network-card.json");
const wirelessNetworkCard = require("./json/wireless-network-card.json");

app.get("/edisk", (req, res) => {
    const filteredhdd = hdd.filter(g => g.price !== null);
    res.json(filteredhdd);
    //res.json(hdd);
});
app.get("/caseAccessory", (req, res) => {
    const filteredCaseAccessory = caseAccessory.filter(g => g.price !== null);
    res.json(filteredCaseAccessory);
});

app.get("/caseFan", (req, res) => {
    const filteredCaseFan = caseFan.filter(g => g.price !== null);
    res.json(filteredCaseFan);
});

app.get("/externalHardDrive", (req, res) => {
    const filteredExternalHardDrive = externalHardDrive.filter(g => g.price !== null);
    res.json(filteredExternalHardDrive);
});

app.get("/fanController", (req, res) => {
    const filteredFanController = fanController.filter(g => g.price !== null);
    res.json(filteredFanController);
});

app.get("/headphones", (req, res) => {
    const filteredHeadphones = headphones.filter(g => g.price !== null);
    res.json(filteredHeadphones);
});

app.get("/keyboard", (req, res) => {
    const filteredKeyboard = keyboard.filter(g => g.price !== null);
    res.json(filteredKeyboard);
});

app.get("/monitor", (req, res) => {
    const filteredMonitor = monitor.filter(g => g.price !== null);
    res.json(filteredMonitor);
});

app.get("/mouse", (req, res) => {
    const filteredMouse = mouse.filter(g => g.price !== null);
    res.json(filteredMouse);
});

app.get("/opticalDrive", (req, res) => {
    const filteredOpticalDrive = opticalDrive.filter(g => g.price !== null);
    res.json(filteredOpticalDrive);
});

app.get("/os", (req, res) => {
    const filteredOs = os.filter(g => g.price !== null);
    res.json(filteredOs);
});

app.get("/soundCard", (req, res) => {
    const filteredSoundCard = soundCard.filter(g => g.price !== null);
    res.json(filteredSoundCard);
});

app.get("/speakers", (req, res) => {
    const filteredSpeakers = speakers.filter(g => g.price !== null);
    res.json(filteredSpeakers);
});

app.get("/webcam", (req, res) => {
    const filteredWebcam = webcam.filter(g => g.price !== null);
    res.json(filteredWebcam);
});

app.get("/wiredNetworkCard", (req, res) => {
    const filteredWiredNetworkCard = wiredNetworkCard.filter(g => g.price !== null);
    res.json(filteredWiredNetworkCard);
});

app.get("/wirelessNetworkCard", (req, res) => {
    const filteredWirelessNetworkCard = wirelessNetworkCard.filter(g => g.price !== null);
    res.json(filteredWirelessNetworkCard);
});



app.listen(3000, () => {
    console.log("Up!");
});
