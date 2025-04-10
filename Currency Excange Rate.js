// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic;

// possible currencies:
//AUD - Australia, BGN - Bulgaria, BRL - Brazil, CAD - Canada, CHF - Switzerland, CNY - China, CZK - Czech Republic, DKK - Denmark, GBP - United Kingdom, HKD - Hong Kong, HUF - Hungary, IDR - Indonesia, ILS - Israel, INR - India, ISK - Iceland, JPY - Japan, KRW - South Korea, MXN - Mexico, MYR - Malaysia, NOK - Norway, NZD - New Zealand, PHP - Philippines, PLN - Poland, RON - Romania, SEK - Sweden, SGD - Singapore, THB - Thailand, TRY - Turkey, USD - United States, ZAR - South Africa
currency = 'AUD';
let start_date =  '2024-07-21';
//let showDate = false

let widgetInputRAW = args.widgetParameter;
let widgetInput = null;

if (widgetInputRAW !== null) {
  widgetInput = widgetInputRAW.toString().split(";");
  if (/^\d{4}-\d{2}-\d{2}$/.test(widgetInput[0].trim()) === false) {
     throw new Error('Invalid Date format. Please use the ISO8601 format: 2020-12-31') 
  }
  start_date = widgetInput[0].trim()
  currency = widgetInput[1] || 'AUD';
  if (widgetInput[2] && widgetInput[2].toLowerCase() === 'true') {
    //showDate = true
  }
} else {
  throw new Error('No Date set! Please set a Date via Widget parameter like 2020-12-31')
}

const url = 'https://api.frankfurter.app/latest'
const req = new Request(url)
const res = await req.loadJSON()
const amount = res.amount;
const base = res.base;
const date = res.date;
console.log(typeof(date))


const rates = res.rates[currency];
console.log(rates)


const url2 = 'https://api.frankfurter.app/latest?from='+currency;
const req2 = new Request(url2)
const res2 = await req2.loadJSON()
// nst amount = res2.amount;
const aus = res2.base;
const austoeur = res2.rates.EUR;
console.log(austoeur)

const url_history = "https://api.frankfurter.app/"+ start_date +".."+ date +"?to="+currency;
const req3 = new Request(url_history);
const res3 = await req3.loadJSON();

// Step 1: Extract dates and rates
const entries = Object.entries(res3.rates).map(([date, rateObj]) => {
    return { date, rate: rateObj[currency] };
});

// Step 2: Sort the entries based on the date
entries.sort((a, b) => new Date(a.date) - new Date(b.date));

// Step 3: Create the sorted ratesArray
const ratesArray = entries.map(entry => entry.rate);
console.log("Sorted ratesArray: ", ratesArray);

// Find the minimum value
const minRate = Math.min(...ratesArray);

// Find the maximum value
const maxRate = Math.max(...ratesArray);

// Calculate the average
const sumRates = ratesArray.reduce((acc, rate) => acc + rate, 0);
const avgRate = sumRates / ratesArray.length;

// Log the values
console.log("Min " + currency + " rate: " + minRate);
console.log("Max " + currency + " rate: " + maxRate);
console.log("Average " + currency + " rate: " + avgRate);

//1.
// Canvas size
const graphWidth = 300;
const graphHeight = 100;
const spacing = (graphWidth - 50) / (ratesArray.length - 1); // 50px margin for the Y-axis labels

// 2. Create a draw context for the graph
let context = new DrawContext();
context.size = new Size(graphWidth, graphHeight);
context.opaque = false; // Transparent background
context.respectScreenScale = true;

// 3. Create a path for the line graph
let path = new Path();
const normalizeRate = rate => graphHeight - (rate - minRate) / (maxRate - minRate) * (graphHeight - 20); // leave 20px margin at the bottom

// Start at the first point
path.move(new Point(50, normalizeRate(ratesArray[0]))); // 50px margin for Y-axis

// Draw the line graph by connecting points
for (let i = 1; i < ratesArray.length; i++) {
    let x = 50 + i * spacing; // 50px margin for Y-axis
    let y = normalizeRate(ratesArray[i]);
    path.addLine(new Point(x, y));  // Add line to the path
}

// 4. Draw the line graph
context.addPath(path);
context.setStrokeColor(new Color("#00A8E8")); // Set line color (blue)
context.setLineWidth(2);
context.strokePath();

// 5. Create a new path for the Y-axis
let yAxisPath = new Path();
yAxisPath.move(new Point(50, normalizeRate(maxRate))); // Start Y-axis at the top
yAxisPath.addLine(new Point(50, graphHeight)); // Draw Y-axis to the bottom

// Add and stroke the Y-axis
context.addPath(yAxisPath);
context.setStrokeColor(new Color("#000000")); // Black color for Y-axis
context.setLineWidth(2);
context.strokePath();

// 6. Create a path for the horizontal average line
let avgLinePath = new Path();
let avgY = normalizeRate(avgRate); // Calculate Y-coordinate for the average value
avgLinePath.move(new Point(50, avgY)); // Start at the left side (50px margin)
avgLinePath.addLine(new Point(graphWidth, avgY)); // Draw to the right edge of the graph

// Add and stroke the average line
context.addPath(avgLinePath);
context.setStrokeColor(new Color("#FF0000")); // Red color for average line
context.setLineWidth(1.5);
context.strokePath();

// 7. Add min, max, and average labels on the Y-axis
context.setTextColor(new Color("#000000")); // Black text
context.setFont(Font.systemFont(12));

// Draw max value at the top
context.drawText(maxRate.toFixed(3), new Point(5, normalizeRate(maxRate) - 3)); // Align with max value on Y-axis

// Draw min value at the bottom
context.drawText(minRate.toFixed(3), new Point(5, normalizeRate(minRate) - 12)); // Align with min value on Y-axis

// Draw average value in the middle
context.drawText(avgRate.toFixed(3), new Point(5, avgY - 7)); // Align with average value on Y-axis

// 8. Add the graph image to the widget
let graphImage = context.getImage();


//load equal back sign
let i3 = null;
let img3 = null;
i3 = new Request("https://marius-giesa.github.io/equal_back.png");
img3 = await i3.loadImage()


let widget = createWidget(amount)
if (config.runsInWidget) {
    // create and show widget
    Script.setWidget(widget)
    Script.complete()
}
else {
    widget.presentSmall()
}

function createWidget(amount) {
    let w = new ListWidget()
    w.setPadding(8, 8, 8, 8)
    w.backgroundColor = new Color("#FFFFFF")

    const upperStack = w.addStack()
    upperStack.layoutVertically()
    
    let currentStack = upperStack.addStack();
    currentStack.addSpacer();
    let tex = currentStack.addText("Current")
    tex.font = Font.boldSystemFont(10)
    tex.textColor = new Color ("38761d") //Color.yellow()
    currentStack.addSpacer();

    let logoStack = upperStack.addStack();
    logoStack.addSpacer();
    let logo = logoStack.addText("Exchange Rate")
    logo.font = Font.boldSystemFont(16)
    logo.textColor = new Color ("38761d") //Color.yellow()
    logoStack.addSpacer();

    upperStack.addSpacer(6)
    
    let multiplyStack = upperStack.addStack();
    multiplyStack.layoutHorizontally()
    multiplyStack.addSpacer(20)
    let secondCurrency = multiplyStack.addText('⋅' + austoeur.toFixed(3))
    secondCurrency.font = Font.systemFont(12); 
    secondCurrency.textColor = new Color("#717171");

    let baseStack = upperStack.addStack();
    baseStack.layoutHorizontally()

    let amountText = baseStack.addText(amount + ' €') 
    
     baseStack.addSpacer(4)
     
     let image = baseStack.addImage(img3)
     image.imageSize = new Size(20, 20)
    
    //baseStack.addSpacer(4)
    
    // Create a mapping of currency codes to their corresponding flag emojis
// Create a mapping of currency codes to their corresponding flag emojis and symbols
const currencyInfo = {
    "AUD": { symbol: "$", flag: "\u{1F1E6}\u{1F1FA}" }, // Australia
    "BGN": { symbol: "лв", flag: "\u{1F1E7}\u{1F1EC}" }, // Bulgaria
    "BRL": { symbol: "R$", flag: "\u{1F1E7}\u{1F1F7}" }, // Brazil
    "CAD": { symbol: "$", flag: "\u{1F1E8}\u{1F1E6}" }, // Canada
    "CHF": { symbol: "CHF", flag: "\u{1F1E8}\u{1F1ED}" }, // Switzerland
    "CNY": { symbol: "¥", flag: "\u{1F1E8}\u{1F1F3}" }, // China
    "CZK": { symbol: "Kč", flag: "\u{1F1E8}\u{1F1FF}" }, // Czech Republic
    "DKK": { symbol: "kr", flag: "\u{1F1E9}\u{1F1F0}" }, // Denmark
    "GBP": { symbol: "£", flag: "\u{1F1EC}\u{1F1E7}" }, // United Kingdom
    "HKD": { symbol: "$", flag: "\u{1F1ED}\u{1F1F0}" }, // Hong Kong
    "HUF": { symbol: "Ft", flag: "\u{1F1ED}\u{1F1FA}" }, // Hungary
    "IDR": { symbol: "Rp", flag: "\u{1F1EE}\u{1F1E9}" }, // Indonesia
    "ILS": { symbol: "₪", flag: "\u{1F1EE}\u{1F1F1}" }, // Israel
    "INR": { symbol: "₹", flag: "\u{1F1EE}\u{1F1F3}" }, // India
    "ISK": { symbol: "kr", flag: "\u{1F1EE}\u{1F1F8}" }, // Iceland
    "JPY": { symbol: "¥", flag: "\u{1F1EF}\u{1F1F5}" }, // Japan
    "KRW": { symbol: "₩", flag: "\u{1F1F0}\u{1F1F7}" }, // South Korea
    "MXN": { symbol: "$", flag: "\u{1F1F2}\u{1F1E8}" }, // Mexico
    "MYR": { symbol: "RM", flag: "\u{1F1F2}\u{1F1F0}" }, // Malaysia
    "NOK": { symbol: "kr", flag: "\u{1F1F3}\u{1F1F4}" }, // Norway
    "NZD": { symbol: "$", flag: "\u{1F1F3}\u{1F1FF}" }, // New Zealand
    "PHP": { symbol: "₱", flag: "\u{1F1F5}\u{1F1ED}" }, // Philippines
    "PLN": { symbol: "zł", flag: "\u{1F1F5}\u{1F1F1}" }, // Poland
    "RON": { symbol: "lei", flag: "\u{1F1F7}\u{1F1F4}" }, // Romania
    "SEK": { symbol: "kr", flag: "\u{1F1F8}\u{1F1EA}" }, // Sweden
    "SGD": { symbol: "$", flag: "\u{1F1F8}\u{1F1EC}" }, // Singapore
    "THB": { symbol: "฿", flag: "\u{1F1F9}\u{1F1ED}" }, // Thailand
    "TRY": { symbol: "₺", flag: "\u{1F1F9}\u{1F1F7}" }, // Turkey
    "USD": { symbol: "$", flag: "\u{1F1FA}\u{1F1F8}" }, // United States
    "ZAR": { symbol: "R", flag: "\u{1F1FF}\u{1F1E6}" }  // South Africa
};


    let currencyData = currencyInfo[currency]; // Get the corresponding currency data
    let symbol = currencyData ? currencyData.symbol : ''; // Get the currency symbol
    let flagEmoji = currencyData ? currencyData.flag : ''; // Get the corresponding flag emoji

    let ratesText = baseStack.addText(rates.toFixed(3) + ' ' + symbol + ' ' + flagEmoji);
    //let ratesText = baseStack.addText(rates.toFixed(3) + ' $ \u{1F1E6}\u{1F1FA}')
    
    
    
    
    // Add graph to the widget
    let imageStack = upperStack.addStack();
    imageStack.addImage(graphImage).centerAlignImage();
    
    upperStack.addSpacer(4)
    
    let dateStack = upperStack.addStack();
    dateStack.layoutHorizontally()
    
    dateStack.addSpacer(23);
    let dateText = dateStack.addText(start_date + ' - ' + date);
    dateText.font = Font.systemFont(9); 
    dateText.textColor = Color.yellow();
    //dateStack.addSpacer();

    
    
    return w
}