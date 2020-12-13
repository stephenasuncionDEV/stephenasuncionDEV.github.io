let Bot_CPU = [];
let Bot_CPU_List = [ "5600", "5800", "5900", "5950" ];
let Bot_Current = 0;
let CORSproxy = "http://3.20.225.187:8080/";

let ryzen5600 = document.getElementById("cpu_ryzen5600").checked;
let ryzen5800 = document.getElementById("cpu_ryzen5800").checked;
let ryzen5900 = document.getElementById("cpu_ryzen5900").checked;
let ryzen5950 = document.getElementById("cpu_ryzen5950").checked;
let cpuAZ = document.getElementById("cpu_AZ").checked;
let cpuNE = document.getElementById("cpu_NE").checked;
let cpuCC = document.getElementById("cpu_CC").checked;
let cpuBB = document.getElementById("cpu_BB").checked;
let Log = document.querySelector(".Bot_Console");
let serverStatus = document.getElementById("ServerStatus");

function Bot() {
    let ryzen5600 = document.getElementById("ryzen5600").checked;
    let ryzen5800 = document.getElementById("ryzen5800").checked;
    let ryzen5900 = document.getElementById("ryzen5900").checked;
    let ryzen5950 = document.getElementById("ryzen5950").checked;

    let BotVersion = "Bot v0.1";
    let date = new Date;
    let BotDate = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getHours() >= 12 ? 'PM' : 'AM'}]`;

    Bot_Current++;

    $.getJSON("./Data/store.json", function(result) {
        if (ryzen5600 && Bot_Current == 1) {
            let item = "ryzen5600";
            axios.get(CORSproxy + result.newegg[0][item]).then((response) => {
                let store = "NewEgg";
                let source = response.data;
                if (source.indexOf("CURRENTLY SOLD OUT") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Sold Out</span></p>`);
                } else if (source.indexOf("Are you a human") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Error</span></p>`);
                } else {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #00fa00;">Available</span></p>`);
                }
            });
        }
    
        if (ryzen5800 && Bot_Current == 2) {
            let item = "ryzen5800";
            axios.get(CORSproxy + result.newegg[0][item]).then((response) => {
                let store = "NewEgg";
                let source = response.data;
                if (source.indexOf("CURRENTLY SOLD OUT") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Sold Out</span></p>`);
                } else if (source.indexOf("Are you a human") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Error</span></p>`);
                } else {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #00fa00;">Available</span></p>`);
                }
            });
        }
    
        if (ryzen5900 && Bot_Current == 3) {
            let item = "ryzen5900";
            axios.get(CORSproxy + result.newegg[0][item]).then((response) => {
                let store = "NewEgg";
                let source = response.data;
                if (source.indexOf("CURRENTLY SOLD OUT") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Sold Out</span></p>`);
                } else if (source.indexOf("Are you a human") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Error</span></p>`);
                } else {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #00fa00;">Available</span></p>`);
                }
            });
        }
    
        if (ryzen5950 && Bot_Current == 4) {
            let item = "ryzen5950";
            axios.get(CORSproxy + result.newegg[0][item]).then((response) => {
                let store = "NewEgg";
                let source = response.data;
                if (source.indexOf("CURRENTLY SOLD OUT") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Sold Out</span></p>`);
                } else if (source.indexOf("Are you a human") !== -1) {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #ff0000;">Error</span></p>`);
                } else {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #636363;">[${item}]</span> : <span style="color: #00fa00;">Available</span></p>`);
                }
            });
        }
    });

    if (Bot_Current > 4) {
        Bot_Current = 0;
    }

    if (Bot_CPU.length > 13) {
        Bot_CPU.shift();
    }

    Log.innerHTML = "";

    for (let n = 0; n < Bot_CPU.length; n++) {
        Log.innerHTML += Bot_CPU[n];
    }
    
}

function Bot2() {
    let BotVersion = "Bot v0.1";
    let date = new Date;
    let BotDate = `[${date.getHours() > 12 ? ('0'+(date.getHours() - 12)).slice(-2) : ('0'+date.getHours()).slice(-2)}:${date.getMinutes()}:${('0'+date.getSeconds()).slice(-2)} ${date.getHours() >= 12 ? 'PM' : 'AM'}]`;

    axios.get(CORSproxy + "http://3.20.225.187/data/CPU_URL.html").then((response) => {
            let source = response.data;
            let store = (source.indexOf(".com") !== -1) ? (source.substring(source.indexOf("www.") + 4, source.indexOf(".com"))) : (source.substring(source.indexOf("www.") + 4, source.indexOf(".ca")));
            let link = source.substring(source.indexOf("Url:") + 5, source.indexOf(", Status:"));
            let anchorLink = `<a class="Bot_Anchor" href="${link}" target="_blank">Link</a>`;
            let item = source.substring(source.indexOf("Item:") + 6, source.indexOf(", Url:"));
            let status = source.substring(source.indexOf("Status:") + 8, source.length);
            let statuscolor = (status == "SOLD OUT" || status == "ERROR") ? "#ff0000" : "#00fa00";
            //console.log(source);
            if (Bot_CPU.length > 0) {
                if (Bot_CPU[Bot_CPU.length - 1].indexOf(item) == -1) {
                    if (status == "AVAILABLE") {
                        Bot_CPU.push(`<p style="opacity:1;">${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #ffffff;">[${item}]</span> ${anchorLink} : <span style="color: ${statuscolor}; font-weight:bold;">${status}</span></p>`);
                    } else {
                        Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #ffffff;">[${item}]</span> ${anchorLink} : <span style="color: ${statuscolor}; font-weight:bold;">${status}</span></p>`);
                    }
                }
            } else if (Bot_CPU == 0) {
                if (status == "AVAILABLE") {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #ffffff;">[${item}]</span> ${anchorLink} : <span style="color: ${statuscolor}; font-weight:bold;">${status}</span></p>`);
                } else {
                    Bot_CPU.push(`<p>${BotDate} <span style="color: #dd332b;">${BotVersion}</span> : <span style="color: #2b55dd;">[${store}]</span> <span style="color: #ffffff;">[${item}]</span> ${anchorLink} : <span style="color: ${statuscolor}; font-weight:bold;">${status}</span></p>`);
                }
            }
        });

    if (Bot_CPU.length > 10) {
        Bot_CPU.shift();
    }

    Log.innerHTML = "";

    for (let n = 0; n < Bot_CPU.length; n++) {
        Log.innerHTML += Bot_CPU[n];
    }
}

Bot2();
let Interval = setInterval(Bot2, 500);

