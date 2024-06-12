const express = require("express");
const path = require("path");
const app = express()

app.use(express.static(path.join(__dirname + "/public")))
app.use(express.urlencoded({extended: true}))

app.get("/", (req,res) => {
    res.redirect("index.html")
})

const pris = require("./json/pris.json")
app.get("/pris", (req, res) => { 
    res.json(pris)
})

const motherboard = require("./json/motherboard.json")
app.get("/hovedkort", (req, res) => {
    res.json(motherboard)
    /*
    "name": "MSI B650 GAMING PLUS WIFI",
    "price": 169.99,
    "socket": "AM5",
    "form_factor": "ATX",
    "max_memory": 192,
    "memory_slots": 4,
    "color": "Black"
    */
})

const Case = require("./json/case.json")
app.get("/case", (req, res) => {
    res.json(Case)
    /*
    "name": "Corsair 4000D Airflow",
    "price": 104.99,
    "type": "ATX Mid Tower",
    "color": "Black",
    "psu": null,
    "side_panel": "Tinted Tempered Glass",
    "external_volume": 48.6,
    "internal_35_bays": 2
    */
})

const cpu = require("./json/cpu.json")
app.get("/cpu", (req, res) => {
    res.json(cpu)
    /*
    "name": "AMD Ryzen 7 7800X3D",
    "price": 339,
    "core_count": 8,
    "core_clock": 4.2,
    "boost_clock": 5,
    "tdp": 120,
    "graphics": "Radeon",
    "smt": true
    */
})

const CpuCooler = require("./json/cpu-cooler.json")
app.get("/CpuCooler", (req, res) => {
    res.json(CpuCooler)
    /*
    "name": "Deepcool GAMMAXX AG400 ARGB",
    "price": 29.99,
    "rpm": [500, 2000],
    "noise_level": 31.6,
    "color": "Black",
    "size": null
    */
})

const memory = require("./json/memory.json")
app.get("/memory", (req, res) => {
    res.json(memory)
    /*
    "name": "Corsair Vengeance LPX 16 GB",
    "price": 38.99,
    "speed": [4, 3200],
    "modules": [2, 8],
    "price_per_gb": 2.437,
    "color": "Black / Yellow",
    "first_word_latency": 10,
    "cas_latency": 16
    */
})

const gpu = require("./json/video-card.json")
app.get("/gpu", (req, res) => {
    for(let i = 0; i < gpu.length; i++) {
        if(gpu[i].price == null) {
            gpu.splice(i,1); 
        }
    }
    res.json(gpu)
    /*
    "name": "MSI GeForce RTX 3060 Ventus 2X 12G",
    "price": 288,
    "chipset": "GeForce RTX 3060 12GB",
    "memory": 12,
    "core_clock": 1320,
    "boost_clock": 1777,
    "color": "Black",
    "length": 235
    */
})

const nvme = require("./json/internal-hard-drive.json")
app.get("/disk", (req, res) => {
    res.json(nvme)
    /*
    "name": "Samsung 980 Pro",
    "price": 169.99,
    "capacity": 2000,
    "price_per_gb": 0.085,
    "type": "SSD",
    "cache": 2048,
    "form_factor": "M.2-2280",
    "interface": "M.2 PCIe 4.0 X4"
    */
})

const psu = require("./json/power-supply.json")
app.get("/psu", (req, res) => {
    res.json(psu)
    /*
    "name": "Corsair RM750e (2023)",
    "price": 99.99,
    "type": "ATX",
    "efficiency": "gold",
    "wattage": 750,
    "modular": "Full",
    "color": "Black"
    */
})

const ups = require("./json/ups.json")
app.get("/ups", (req, res) => {
    res.json(ups)
    /*
    "name": "CyberPower CP1500PFCLCD",
    "price": 214.95,
    "wattage": 900,
    "battery": 1500,
    "color": "Black"
    */
})





const hdd = require("./json/external-hard-drive.json")
app.get("/edisk", (req, res) => {
    res.json(hdd)
    /*
    "name": "Apricorn Aegis Fortress L3",
    "price": 12999,
    "type": "Portable",
    "interface": "USB Type-A 3.2 Gen 1, USB Type-C 3.2 Gen 1",
    "capacity": 20000,
    "price_per_gb": 0.65,
    "color": "Black"
    */
})


app.listen(3000, () => {
    console.log("Up!")
})