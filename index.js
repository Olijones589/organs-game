document.querySelectorAll('[state]').forEach(element => {
    element.style.display = 'none';
});

var organs = [
    {
        name: "Liver",
        currentPrice: 100.00,
        prices: [],
        desc: "The liver is a critical organ in the human body that is responsible for an array of functions that help support metabolism, immunity, digestion, detoxification, vitamin storage among other functions.",
        minPrice: 200.00,
        maxPrice: 300.00
    },
    {
        name: "Kidney",
        currentPrice: 150.00,
        prices: [],
        desc: "The kidney is responsible for filtering waste products from the blood and maintaining fluid and electrolyte balance in the body.",
        minPrice: 300.00,
        maxPrice: 400.00
    },
    {
        name: "Heart",
        currentPrice: 200.00,
        prices: [],
        desc: "The heart is a muscular organ responsible for pumping blood throughout the body, supplying oxygen and nutrients to the tissues and removing carbon dioxide and other waste products.",
        minPrice: 400.00,
        maxPrice: 500.00
    },
    {
        name: "Lung",
        currentPrice: 180.00,
        prices: [],
        desc: "The lungs are the primary organs of the respiratory system responsible for exchanging oxygen and carbon dioxide between the air and the blood.",
        minPrice: 350.00,
        maxPrice: 450.00
    },
    {
        name: "Brain",
        currentPrice: 300.00,
        prices: [],
        desc: "The brain is the command center of the central nervous system, responsible for processing sensory information, coordinating movement, regulating internal functions, and much more.",
        minPrice: 600.00,
        maxPrice: 700.00
    },
    {
        name: "Pancreas",
        currentPrice: 120.00,
        prices: [],
        desc: "The pancreas is a glandular organ located behind the stomach and is responsible for producing digestive enzymes and hormones that regulate blood sugar levels. No longer needed due to advances in the food industry",
        minPrice: 1.00,
        maxPrice: 1.00,
        backgroundText: "Why would you even buy this?"
    },
    {
        name: "Stomach",
        currentPrice: 80.00,
        prices: [],
        desc: "The stomach is a muscular organ located in the upper abdomen and is responsible for storing and breaking down food through the process of digestion.",
        minPrice: 150.00,
        maxPrice: 250.00
    },
    {
        name: "Intestine",
        currentPrice: 90.00,
        prices: [],
        desc: "The intestine is a long, tube-like organ that is part of the digestive system, responsible for absorbing nutrients and water from digested food.",
        minPrice: 180.00,
        maxPrice: 280.00
    },
    {
        name: "Spleen",
        currentPrice: 70.00,
        prices: [],
        desc: "The spleen is a lymphoid organ located in the upper left abdomen, responsible for filtering blood, storing red blood cells, and helping to fight infection.",
        minPrice: 140.00,
        maxPrice: 220.00
    },
    {
        name: "Bladder",
        currentPrice: 100.00,
        prices: [],
        desc: "The bladder is a hollow organ located in the pelvis, responsible for storing urine until it is excreted from the body.",
        minPrice: 200.00,
        maxPrice: 300.00
    }
];

for (var i = 0; i < organs.length; i++) {
    var organ = organs[i];
    for (var developments = 0; developments < 3000; developments++) {
        organ.currentPrice += ((Math.random() * 2) - 1) * 5;
        if (organ.currentPrice > organ.maxPrice) {
            organ.currentPrice = organ.maxPrice;
        } else if (organ.currentPrice < organ.minPrice) {
            organ.currentPrice = organ.minPrice;
        }
        organ.prices.push(organ.currentPrice);
    }
}

var selectedOrgan = Math.floor(Math.random() * organs.length);

const stockCanvas = document.getElementById("stockCanvas");
const contactCanvas = document.getElementById("contactCanvas");
const playerStats = document.getElementById("playerstats");
const ORGAN_DESC = document.getElementById("organ_desc");
const ORGAN_NAME = document.getElementById("organ_name");
const ORGAN_SELECTOR = document.getElementById("organ_selector");

var stockCtx = stockCanvas.getContext("2d");
var contactCtx = contactCanvas.getContext("2d");

var contactText = [];
var contactMessages = [];

var mousePositionContact = [0, 0];
var mousePositionStock = [0, 0];

var player = {
    money: 3.45,
    stocks: [],
    networth: "Low"
}

function assureBoundsSelectedOrgan(amount) {
    selectedOrgan += amount;
    if (selectedOrgan == -1) { selectedOrgan = 0; }
    if (selectedOrgan == organs.length) { selectedOrgan = organs.length - 1; }
}

contactCanvas.addEventListener('mousemove', function (event) {
    var rect = contactCanvas.getBoundingClientRect();
    mousePositionContact = [event.clientX - rect.left, event.clientY - rect.top];
    var omousePositionContact = structuredClone(mousePositionContact);
    setTimeout(function () {
        if (omousePositionContact != mousePositionContact) {
            mousePositionContact = [-99999, -99999]
        }
    }, 1000);
});

stockCanvas.addEventListener('mousemove', function (event) {
    var rect = stockCanvas.getBoundingClientRect();
    mousePositionStock = [event.clientX - rect.left, event.clientY - rect.top];
    var omousePositionStock = structuredClone(mousePositionStock);
    setTimeout(function () {
        if (omousePositionStock != mousePositionStock) {
            mousePositionStock = [-99999, -99999]
        }
    }, 1000);
});

stockCanvas.width = (innerWidth - 40) / 2;
stockCanvas.height = 400;

contactCanvas.width = (innerWidth - 40) / 2;
contactCanvas.height = 400;

function drawCoolBackground(ctx, canvas) {
    const colors = [
        "rgba(128,0,128,0.01)",
        "rgba(255,165,0,0.01)",
        "rgba(173,216,230,0.01)",
        "rgba(209,179,255,0.01)",
        "rgba(255,87,51,0.01)"
    ];

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Draw original circles
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        const radius = Math.random() * 50 + 10; // Random radius between 10 and 60
        const color = colors[Math.floor(Math.random() * colors.length)];

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2); // Draw a full circle
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Draw additional circles around the mouse position
    const numExtraCircles = 20;
    for (let i = 0; i < numExtraCircles; i++) {
        const x = mousePositionStock[0] + (Math.random() - 0.5) * 100; // Random position within +/- 50 of mouse X
        const y = mousePositionStock[1] + (Math.random() - 0.5) * 100; // Random position within +/- 50 of mouse Y
        const radius = Math.random() * 50 + 10; // Random radius between 10 and 60
        const color = colors[Math.floor(Math.random() * colors.length)];
        const transparency = 0.01;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2); // Draw a full circle
        ctx.fillStyle = color.replace("0.01", transparency.toFixed(2)); // Update transparency
        ctx.fill();
    }
}

function generateRequest() {
    return {
        amountRequested: Math.floor(Math.random() * 200),
        organRequested: Math.floor(Math.random() * organs.length)
    }
}

function generateUsername() {
    const adjectives = ['Pulsing', 'Tasty', 'Lively', 'Vital', 'Swift', 'Ethereal', 'Sizzling', 'Dynamic', 'Radiant', 'Euphoric', "`かわいい", "`漂亮", "`好", "`不好", "`美", "`大", "`小", "`胖", "`瘦", "Lento", "Seco", "Mojado", "Rápido", "Bueno", "Malo", "Largo", "Corto", "Blushing", "Bored", "Drainy", "Brave", "Breakable", "Bright", "Busy", "Calm", "Unhappy"];
    const nouns = ['Heart', 'Organ', 'Vein', 'Pulse', 'Artery', 'Fish', '.CORPORATE_ENTITY', 'Vessel', 'Synapse', '69', "TheFunnies", "`子供たち", "`女の子", "`骗子", "`电视", "`冰箱", "`空调", "`洗衣机", "Perro", "Gato", "Persona", "Amigo", "Grupo", "País", "Niña", "Vida", "Mundo", "Desk", "House", "Monitor", "Cat", "Doge", "Minor", "Cup", "Keyboard", "Pencil", "Spoon", "Wrapper", "Rapper", "Headphones"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
}

contactMessages.push({
    text: `To get you started...`,
    sender: "???",
    body: "As you know already, the market is thriving. Just don't buy pancreas and you'll be fine, buddy. If you're living under a rock, the year's 4588; and a friendly tip: if you're planning on kicking the bucket, make sure you've got $500 stashed away for genetic recombination. Just because I'm so very very nice, I attached 8000$. Btw, I'm a Corprate Ridiculously High Networth Invidual, chump.",
    viewonce: true,
    onview: "player.money+=8000;"
});

for (var i = 0; i < 10; i++) {
    var request = generateRequest();
    var organ_abbr = organs[request.organRequested].name.slice(0, 2);
    var user = generateUsername();
    contactMessages.push({
        text: `REQUEST: ${request.amountRequested} ${organ_abbr}`,
        sender: user,
        body: `${organs[request.organRequested].name}:${request.amountRequested}:${user}[OrganRequester™]`,
        viewonce: false
    });
}

function renderText(contents, x, y) {
    stockCtx.font = "30px Nunito";

    stockCtx.fillStyle = "gray";
    stockCtx.fillText(contents, x + 1, y + 1);
    stockCtx.fillStyle = "white";
    stockCtx.fillText(contents, x, y);
}

function updateStocks() {
    for (var stockIndex = 0; stockIndex < organs.length; stockIndex++) {
        var stock = organs[stockIndex];
        stock.prices.shift();
        stock.currentPrice += (((Math.random() * 2) - 1) * 5) + (Math.sin(Date.now() / 1000) / 10);
        if (stock.currentPrice > stock.maxPrice) {
            stock.currentPrice = stock.maxPrice;
        } else if (stock.currentPrice < stock.minPrice) {
            stock.currentPrice = stock.minPrice;
        }
        stock.prices.push(stock.currentPrice);
    }
}

function updateStocksUI(currentOrgan) {
    drawCoolBackground(stockCtx, stockCanvas);
    stockCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    stockCtx.fillRect(0, 0, stockCanvas.width, stockCanvas.height);

    var currentOrganPrices = currentOrgan.prices;

    var minPrice = Math.min(...currentOrganPrices);
    var maxPrice = Math.max(...currentOrganPrices);
    var mean = ((maxPrice + minPrice) / 2);

    // Calculate the vertical scaling factor
    var priceRange = Math.abs((maxPrice + 50) - (minPrice - 50)) * 1.5;
    var scaleY = (stockCanvas.height / priceRange) / 1.8;

    var offset = mean - (stockCanvas.height / 2 - mean);

    // stockCtx.fillStyle = "orange";
    // stockCtx.fillRect(0, (maxPrice), stockCanvas.width, 3);

    // stockCtx.fillStyle = "purple";
    // stockCtx.fillRect(0, (minPrice), stockCanvas.width, 3);

    // stockCtx.fillStyle = "gray";
    // stockCtx.fillRect(0, mean, stockCanvas.width, 3);

    // stockCtx.fillStyle = "black";
    // stockCtx.fillRect(0, stockCanvas.height / 2, stockCanvas.width, 3);

    // stockCtx.fillStyle = "purple";
    // stockCtx.fillRect(stockCanvas.width / 2, mean, 3, stockCanvas.height / 2 - mean);

    stockCtx.strokeStyle = "red";
    var last = 0;
    for (var i = 0; i < currentOrganPrices.length; i++) {
        var currentPrice = currentOrganPrices[i];
        var x = i * (stockCanvas.width / currentOrganPrices.length);
        var y = stockCanvas.height - currentPrice; // Invert y-coordinate to draw from top to bottom

        stockCtx.strokeStyle = y < last ? "green" : "red";
        stockCtx.beginPath();
        stockCtx.moveTo(x - 1, last + currentOrgan.minPrice);
        stockCtx.lineTo(x, y + currentOrgan.minPrice);
        stockCtx.stroke();

        last = y;
    }

    // Draw a rectangle at the topmost stock stored in the list of organs

    ORGAN_DESC.innerText = currentOrgan.desc;
    ORGAN_NAME.innerText = currentOrgan.name;

    renderText(currentOrgan.name, 30, 40);
    renderText(`${Math.round(currentOrgan.currentPrice)}$`, 30, 90);

    if (typeof currentOrgan.backgroundText != "undefined") {
        renderText(`${currentOrgan.backgroundText}`, 30, 140);
    }
}

var contactUISelectIndex = 0;
var oldContactUISelectIndex = 0;
var contactUIState = "listings";

function updateContactUI() {
    if (Math.random() * 100 > 90) {
        contactCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
        contactCtx.fillRect(0, 0, contactCanvas.width, contactCanvas.height);
    }
    contactCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
    contactCtx.fillRect(0, 0, contactCanvas.width, contactCanvas.height);

    contactCtx.fillStyle = "green";
    contactCtx.font = "30px 'Jersey 10'"
    var extra_off = 0;
    for (var i = 0; i < contactText.length; i++) {
        if (contactText[i].includes("`")) {
            extra_off += 10;
        }
        if (i == contactUISelectIndex) {
            contactCtx.fillStyle = "lightgreen";
        }
        contactCtx.fillText(contactText[i].replaceAll("`", ""), 20, (20 * (i * 1.1 + 1) + 10) + extra_off);
        contactCtx.fillStyle = "green";
    }

    // MOUSE
    // contactCtx.fillStyle = "green";
    // contactCtx.beginPath();
    // contactCtx.arc(mousePositionContact[0], mousePositionContact[1], 3, 0, 2 * Math.PI);
    // contactCtx.fill();
    if (mousePositionContact[0] > 0) {
        contactCtx.fillRect(Math.round(mousePositionContact[0] / 10) * 10, Math.round(mousePositionContact[1] / 20) * 20, 10, 20);
    }

    // Transparent green lines! Because why not
    const thick = 10;
    for (var i = 0; i < contactCanvas.height / thick; i++) {
        contactCtx.fillStyle = "rgba(0, 255, 0, 0.02)";
        contactCtx.fillRect(0, i * thick, contactCanvas.width, thick / 2);
    }
}

async function beanOS() {
    contactText = ["BeanOS loading...", "Use arrow keys to move cursor."];

    await new Promise(resolve => {
        setTimeout(() => {
            contactText = ["Welcome back!", "Mail:"];

            for (let i = 0; i < contactMessages.length; i++) {
                setTimeout(() => {
                    contactText.push(`     '${contactMessages[i].text}' from ${contactMessages[i].sender}`);
                }, (i + 1) * 100);
            }
            resolve();
        }, 2000);
    });
}


function update() {
    currentOrgan = organs[selectedOrgan];

    if (currentOrgan.currentPrice >= currentOrgan.maxPrice) {
        currentOrgan.currentPrice -= 10;
    } else if (currentOrgan.currentPrice <= currentOrgan.minPrice) {
        currentOrgan.currentPrice += 10;
    }

    updateStocks();

    updateContactUI();
    updateStocksUI(currentOrgan);
}

function setState(state) {
    document.querySelectorAll('[state]').forEach(element => {
        element.style.display = 'none';
    });

    const stateElement = document.querySelector(`[state="${state}"]`);
    if (stateElement) {
        stateElement.style.display = 'block';
    }
}

setState('main');

function calculateNetWorthLabel(playerMoney) {
    const thresholds = [
        { threshold: 1000, label: "Extremely Low" },
        { threshold: 3000, label: "Very Very Low" },
        { threshold: 6000, label: "Very Low" },
        { threshold: 12000, label: "Quite Low" },
        { threshold: 20000, label: "Low" },
        { threshold: 35000, label: "Medial" },
        { threshold: 60000, label: "Average" },
        { threshold: 100000, label: "Above Average" },
        { threshold: 200000, label: "High" },
        { threshold: 500000, label: "Very High" },
        { threshold: 1000000, label: "Extremely High" },
        { threshold: 2000000, label: "Incredibly High" },
        { threshold: 5000000, label: "Ridiculously High" },
        { threshold: 10000000, label: "Insanely High" },
        { threshold: 20000000, label: "Astronomically High" },
        { threshold: 50000000, label: "Unbelievably High" },
        { threshold: 100000000, label: "Mind-Bogglingly High" },
        { threshold: 200000000, label: "Epic" },
        { threshold: 500000000, label: "Legendary" },
        { threshold: 1000000000, label: "Mythical" },
        { threshold: 2000000000, label: "Corprate" },
        { threshold: 5000000000, label: "Corprate Extremely Low" },
        { threshold: 10000000000, label: "Corprate Very Very Low" },
        { threshold: 20000000000, label: "Corprate Very Low" },
        { threshold: 50000000000, label: "Corprate Quite Low" },
        { threshold: 100000000000, label: "Corprate Low" },
        { threshold: 200000000000, label: "Corprate Medial" },
        { threshold: 500000000000, label: "Corprate Average" },
        { threshold: 500000000000, label: "Corprate Above Average" },
        { threshold: 1000000000000, label: "Corprate High" },
        { threshold: 2000000000000, label: "Corprate Very High" },
        { threshold: 5000000000000, label: "Corprate Extremely High" },
        { threshold: 10000000000000, label: "Corprate Incredibly High" },
        { threshold: 20000000000000, label: "Corprate Ridiculously High" },
        { threshold: 50000000000000, label: "Corprate Insanely High" },
        { threshold: 100000000000000, label: "Corprate Astronomically High" },
        { threshold: 200000000000000, label: "Corprate Unbelievably High" },
        { threshold: 500000000000000, label: "Corprate Mind-Bogglingly High" },
        { threshold: 1000000000000000, label: "Corprate Epic" },
        { threshold: 2000000000000000, label: "Corprate Legendary" },
        { threshold: 5000000000000000, label: "Corprate Mythical" },
    ];

    for (const { threshold, label } of thresholds) {
        if (playerMoney < threshold) {
            return label;
        }
    }

    return "Infinite";
}

setInterval(update, 10);
setInterval(function () {
    player.networth = calculateNetWorthLabel(player.money);

    playerStats.innerText = `${player.money}$, ${player.networth} Networth Individual`;
}, 10);

addEventListener("resize", (event) => {
    stockCanvas.width = (innerWidth - 40) / 2;
    stockCanvas.height = 400;

    contactCanvas.width = (innerWidth - 40) / 2;
    contactCanvas.height = 400;
});

var contactMessage = null;

addEventListener("keydown", (event) => {

    if (event.key == "ArrowUp") {
        contactUISelectIndex -= 1;
    } else if (event.key == "ArrowDown") {
        contactUISelectIndex += 1
            ;
    } else if (event.key == "Enter") {
        if (contactUIState == "listings") {
            if (contactUISelectIndex > 0) {
                contactUIState = "view";
                contactMessage = contactMessages[contactUISelectIndex - 2];
                oldContactUISelectIndex = contactUISelectIndex;
                contactUISelectIndex = 0;
                contactText = [
                    `${contactMessage.viewonce ? "burn" : "return"}`,
                    "`...",
                    "[MAIL BEGIN]"
                ];
                contactText.push(`NAME: ${contactMessage.text}`,
                    `SENDER: ${contactMessage.sender}`,
                    ``);
                for (var i = 0; i < contactMessage.body.length; i++) {
                    if (contactText[contactText.length - 1].length < (contactCanvas.width / 12)) {
                        contactText[contactText.length - 1] += contactMessage.body[i];
                    } else {
                        contactText.push(contactMessage.body[i]);
                    }
                }
                contactUISelectIndex = 0;
                contactText.push("[MAIL END]");
            }
        } else if (contactUIState == "view" && contactUISelectIndex == 0) {
            contactUIState = "listings";
            if (contactMessage.viewonce) {
                contactUISelectIndex = 0;
                contactMessages.splice(oldContactUISelectIndex - 2, 1);
            } else {
                contactUISelectIndex = oldContactUISelectIndex;
            }
            eval(contactMessage.onview);
            contactText = ["...", "Mail:"];
            for (let i = 0; i < contactMessages.length; i++) {
                setTimeout(() => {
                    contactText.push(`     '${contactMessages[i].text}' from ${contactMessages[i].sender}`);
                }, (i + 1) * 10);
            }
        }
    }
});

setTimeout(function () {
    beanOS();
}, 1000);