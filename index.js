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
    //const filteredM = motherboard.filter(g => g.price !== null);
    //res.json(filteredM);
    res.json(motherboard);
});

const Case = require("./json/case.json");
app.get("/case", (req, res) => {
    //const fliteredC = Case.filter(g => g.price !== null);
    //res.json(fliteredC);
    res.json(Case);
});

const cpu = require("./json/cpu.json");
app.get("/cpu", (req, res) => {
    //const fliteredcpu = cpu.filter(g => g.price !== null);
    //res.json(fliteredcpu);
    res.json(cpu);
});

const CpuCooler = require("./json/cpu-cooler.json");
app.get("/CpuCooler", (req, res) => {
    //const fliteredCpuCooler = CpuCooler.filter(g => g.price !== null);
    //res.json(fliteredCpuCooler);
    res.json(CpuCooler);
});

const memory = require("./json/memory.json");
app.get("/memory", (req, res) => {
    //const fliteredmemory = memory.filter(g => g.price !== null);
    //res.json(fliteredmemory);
    res.json(memory);
});

const gpu = require("./json/video-card.json");
app.get("/gpu", (req, res) => {
    //const filteredGpu = gpu.filter(g => g.price !== null);
    //res.json(filteredGpu);
    res.json(gpu);
});

const nvme = require("./json/internal-hard-drive.json");
app.get("/disk", (req, res) => {
    //const filterednvme = nvme.filter(g => g.price !== null);
    //res.json(filterednvme);
    res.json(nvme);
});

const psu = require("./json/power-supply.json");
app.get("/psu", (req, res) => {
    //const filteredpsu = psu.filter(g => g.price !== null);
    //res.json(filteredpsu);
    res.json(psu);
});

const hdd = require("./json/external-hard-drive.json");
app.get("/edisk", (req, res) => {
    //const filteredhdd = hdd.filter(g => g.price !== null);
    //res.json(filteredhdd);
    res.json(hdd);
});

app.listen(3000, () => {
    console.log("Up!");
});
