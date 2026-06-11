import json
import random

random.seed(42)

stocks = [
    ("AAPL","Apple Inc.",192.30,"Technology"),
    ("MSFT","Microsoft Corp.",425.50,"Technology"),
    ("GOOGL","Alphabet Inc.",175.20,"Technology"),
    ("AMZN","Amazon.com Inc.",186.40,"Consumer"),
    ("NVDA","NVIDIA Corp.",135.70,"Technology"),
    ("META","Meta Platforms Inc.",498.60,"Technology"),
    ("TSLA","Tesla Inc.",245.80,"Consumer"),
    ("BRK.B","Berkshire Hathaway",420.15,"Finance"),
    ("JPM","JPMorgan Chase & Co.",198.50,"Finance"),
    ("V","Visa Inc.",282.30,"Finance"),
    ("UNH","UnitedHealth Group",520.40,"Healthcare"),
    ("JNJ","Johnson & Johnson",155.20,"Healthcare"),
    ("WMT","Walmart Inc.",92.10,"Consumer"),
    ("PG","Procter & Gamble",168.40,"Consumer"),
    ("MA","Mastercard Inc.",462.70,"Finance"),
    ("HD","Home Depot Inc.",378.90,"Consumer"),
    ("DIS","Walt Disney Co.",112.50,"Communications"),
    ("BAC","Bank of America",40.85,"Finance"),
    ("XOM","Exxon Mobil Corp.",108.60,"Energy"),
    ("NFLX","Netflix Inc.",685.30,"Communications"),
    ("ADBE","Adobe Inc.",478.20,"Technology"),
    ("CRM","Salesforce Inc.",272.40,"Technology"),
    ("AMD","Advanced Micro Devices",162.80,"Technology"),
    ("INTC","Intel Corp.",22.50,"Technology"),
    ("PYPL","PayPal Holdings",72.30,"Finance"),
    ("COST","Costco Wholesale",872.50,"Consumer"),
    ("PEP","PepsiCo Inc.",178.40,"Consumer"),
    ("KO","Coca-Cola Co.",62.15,"Consumer"),
    ("NKE","Nike Inc.",78.30,"Consumer"),
    ("MRK","Merck & Co.",128.70,"Healthcare"),
    ("PFE","Pfizer Inc.",28.40,"Healthcare"),
    ("ABBV","AbbVie Inc.",178.90,"Healthcare"),
    ("LLY","Eli Lilly & Co.",820.50,"Healthcare"),
    ("ORCL","Oracle Corp.",172.60,"Technology"),
    ("CSCO","Cisco Systems",58.30,"Technology"),
    ("T","AT&T Inc.",22.45,"Communications"),
    ("VZ","Verizon Communications",42.10,"Communications"),
    ("BA","Boeing Co.",185.60,"Industrial"),
    ("GS","Goldman Sachs",468.20,"Finance"),
    ("SPY","SPDR S&P 500 ETF",542.30,"Finance"),
    ("QQQ","Invesco QQQ Trust",478.90,"Finance"),
    ("UBER","Uber Technologies",78.40,"Technology"),
    ("SHOP","Shopify Inc.",72.50,"Technology"),
    ("SQ","Block Inc.",68.30,"Finance"),
    ("PLTR","Palantir Technologies",24.80,"Technology"),
    ("SOFI","SoFi Technologies",10.25,"Finance"),
    ("COIN","Coinbase Global",228.40,"Finance"),
    ("RIVN","Rivian Automotive",14.60,"Consumer"),
    ("LCID","Lucid Group",3.85,"Consumer"),
    ("MU","Micron Technology",128.50,"Technology"),
    ("DELL","Dell Technologies",132.40,"Technology"),
    ("GE","GE Aerospace",168.20,"Industrial"),
    ("F","Ford Motor Co.",12.35,"Consumer"),
    ("GM","General Motors",48.60,"Consumer"),
    ("NCLH","Norwegian Cruise Line",22.10,"Consumer"),
    ("CCL","Carnival Corp.",24.80,"Consumer"),
    ("DAL","Delta Air Lines",52.30,"Industrial"),
    ("UAL","United Airlines",58.70,"Industrial"),
    ("LUV","Southwest Airlines",30.40,"Industrial"),
    ("AAL","American Airlines",12.80,"Industrial"),
    ("PINS","Pinterest Inc.",34.20,"Communications"),
    ("SNAP","Snap Inc.",14.50,"Communications"),
    ("ROKU","Roku Inc.",82.60,"Communications"),
    ("ZM","Zoom Video",72.40,"Technology"),
    ("SPOT","Spotify Technology",328.50,"Communications"),
    ("TWLO","Twilio Inc.",68.30,"Technology"),
    ("ABNB","Airbnb Inc.",148.70,"Consumer"),
    ("DASH","DoorDash Inc.",118.40,"Consumer"),
    ("U","Unity Software",22.60,"Technology"),
    ("RBLX","Roblox Corp.",48.30,"Technology"),
    ("DKNG","DraftKings Inc.",38.50,"Consumer"),
    ("PENN","Penn Entertainment",18.70,"Consumer"),
    ("W","Wayfair Inc.",58.40,"Consumer"),
    ("CHWY","Chewy Inc.",28.30,"Consumer"),
    ("LMND","Lemonade Inc.",28.40,"Finance"),
    ("MARA","Marathon Digital",22.50,"Finance"),
    ("RIOT","Riot Platforms",12.30,"Finance"),
    ("HOOD","Robinhood Markets",22.80,"Finance"),
    ("AFRM","Affirm Holdings",38.60,"Finance"),
    ("UPST","Upstart Holdings",32.40,"Finance"),
    ("BILL","Bill Holdings",68.50,"Finance"),
    ("TTD","The Trade Desk",98.40,"Technology"),
    ("PANW","Palo Alto Networks",328.60,"Technology"),
    ("CRWD","CrowdStrike Holdings",358.20,"Technology"),
    ("NET","Cloudflare Inc.",92.40,"Technology"),
    ("DDOG","Datadog Inc.",138.50,"Technology"),
    ("SNOW","Snowflake Inc.",168.30,"Technology"),
    ("MDB","MongoDB Inc.",282.40,"Technology"),
    ("ZS","Zscaler Inc.",218.60,"Technology"),
    ("OKTA","Okta Inc.",108.30,"Technology"),
    ("TEAM","Atlassian Corp.",198.50,"Technology"),
    ("WDAY","Workday Inc.",248.70,"Technology"),
    ("VEEV","Veeva Systems",218.40,"Technology"),
    ("HUBS","HubSpot Inc.",628.40,"Technology"),
    ("SE","Sea Limited",88.40,"Technology"),
    ("CPNG","Coupang Inc.",22.60,"Consumer"),
    ("MELI","MercadoLibre",1782.30,"Consumer"),
    ("TSM","Taiwan Semiconductor",168.50,"Technology"),
    ("ASML","ASML Holding",882.40,"Technology"),
    ("QCOM","Qualcomm Inc.",198.30,"Technology"),
    ("AVGO","Broadcom Inc.",168.50,"Technology"),
    ("TXN","Texas Instruments",188.40,"Technology"),
    ("MRVL","Marvell Technology",72.60,"Technology"),
    ("NXPI","NXP Semiconductors",248.30,"Technology"),
    ("AMAT","Applied Materials",198.60,"Technology"),
    ("ON","ON Semiconductor",68.30,"Technology"),
    ("ENPH","Enphase Energy",128.50,"Energy"),
    ("FSLR","First Solar",228.60,"Energy"),
    ("NEE","NextEra Energy",78.50,"Energy"),
    ("CVX","Chevron Corp.",158.40,"Energy"),
    ("COP","ConocoPhillips",118.60,"Energy"),
    ("SLB","Schlumberger",48.30,"Energy"),
    ("EOG","EOG Resources",128.50,"Energy"),
    ("MPC","Marathon Petroleum",178.50,"Energy"),
    ("VLO","Valero Energy",152.60,"Energy"),
    ("HAL","Halliburton Co.",38.40,"Energy"),
    ("FANG","Diamondback Energy",198.30,"Energy"),
    ("DVN","Devon Energy",48.60,"Energy"),
    ("CEG","Constellation Energy",268.30,"Energy"),
    ("VST","Vistra Corp.",128.60,"Energy"),
    ("SO","Southern Co.",88.60,"Energy"),
    ("DUK","Duke Energy",108.30,"Energy"),
    ("AMT","American Tower",218.50,"Real Estate"),
    ("PLD","Prologis Inc.",128.40,"Real Estate"),
    ("CCI","Crown Castle",108.60,"Real Estate"),
    ("EQIX","Equinix Inc.",828.30,"Real Estate"),
    ("SPG","Simon Property Group",152.40,"Real Estate"),
    ("O","Realty Income",58.30,"Real Estate"),
    ("WELL","Welltower Inc.",108.50,"Real Estate"),
    ("DLR","Digital Realty",148.60,"Real Estate"),
    ("PSA","Public Storage",288.40,"Real Estate"),
    ("TGT","Target Corp.",158.40,"Consumer"),
    ("LOW","Lowe's Companies",228.50,"Consumer"),
    ("TJX","TJX Companies",108.30,"Consumer"),
    ("ROST","Ross Stores",148.60,"Consumer"),
    ("BBY","Best Buy Co.",82.40,"Consumer"),
    ("DG","Dollar General",138.50,"Consumer"),
    ("SBUX","Starbucks Corp.",98.50,"Consumer"),
    ("MCD","McDonald's Corp.",288.30,"Consumer"),
    ("YUM","Yum! Brands",138.40,"Consumer"),
    ("DPZ","Domino's Pizza",428.50,"Consumer"),
    ("CMG","Chipotle Mexican Grill",58.40,"Consumer"),
    ("LULU","Lululemon Athletica",328.40,"Consumer"),
    ("CAT","Caterpillar Inc.",328.30,"Industrial"),
    ("DE","Deere & Company",388.40,"Industrial"),
    ("HON","Honeywell International",208.30,"Industrial"),
    ("ETN","Eaton Corp",318.40,"Industrial"),
    ("LMT","Lockheed Martin",468.40,"Industrial"),
    ("RTX","RTX Corp.",108.30,"Industrial"),
    ("NOC","Northrop Grumman",478.40,"Industrial"),
    ("GD","General Dynamics",278.30,"Industrial"),
    ("MMM","3M Company",102.40,"Industrial"),
    ("EMR","Emerson Electric",108.40,"Industrial"),
    ("ITW","Illinois Tool Works",248.30,"Industrial"),
    ("PH","Parker Hannifin",518.30,"Industrial"),
    ("ROK","Rockwell Automation",278.30,"Industrial"),
    ("AXON","Axon Enterprise",328.40,"Industrial"),
    ("TDG","TransDigm Group",1288.40,"Industrial"),
    ("IP","International Paper",48.40,"Industrial"),
    ("SWK","Stanley Black & Decker",82.40,"Industrial"),
    ("GD2","General Dynamics Corp",148.40,"Industrial"),
    ("BDX","Becton Dickinson",238.30,"Healthcare"),
    ("ISRG","Intuitive Surgical",398.50,"Healthcare"),
    ("SYK","Stryker Corp.",348.40,"Healthcare"),
    ("MDT","Medtronic PLC",82.30,"Healthcare"),
    ("BSX","Boston Scientific",78.50,"Healthcare"),
    ("ZTS","Zoetis Inc.",178.40,"Healthcare"),
    ("REGN","Regeneron Pharmaceuticals",888.30,"Healthcare"),
    ("VRTX","Vertex Pharmaceuticals",428.50,"Healthcare"),
    ("GILD","Gilead Sciences",82.40,"Healthcare"),
    ("BIIB","Biogen Inc.",218.30,"Healthcare"),
    ("AMGN","Amgen Inc.",288.40,"Healthcare"),
    ("BMY","Bristol-Myers Squibb",52.30,"Healthcare"),
    ("LLY2","Eli Lilly Intl",148.40,"Healthcare"),
    ("MCK","McKesson Corp.",498.30,"Healthcare"),
    ("CI","Cigna Group",338.40,"Healthcare"),
    ("HUM","Humana Inc.",358.30,"Healthcare"),
    ("ELV","Elevance Health",448.40,"Healthcare"),
    ("AET","Aetna Inc.",188.30,"Healthcare"),
    ("CVS","CVS Health Corp.",68.40,"Healthcare"),
    ("WBA","Walgreens Boots",12.30,"Healthcare"),
    ("CAH","Cardinal Health",108.40,"Healthcare"),
    ("ABC","AmerisourceBergen",188.30,"Healthcare"),
    ("HSIC","Henry Schein",72.40,"Healthcare"),
]

# Deduplicate by ticker
seen = set()
unique_stocks = []
for s in stocks:
    if s[0] not in seen:
        seen.add(s[0])
        unique_stocks.append(s)

# Take first 200
stocks = unique_stocks[:200]
print(f"Total unique stocks: {len(stocks)}")

# Direction distribution
n = len(stocks)
n_bullish = int(n * 0.55)
n_bearish = int(n * 0.35)
n_neutral = n - n_bullish - n_bearish
directions = ["bullish"] * n_bullish + ["bearish"] * n_bearish + ["neutral"] * n_neutral
random.shuffle(directions)

timeframes = ["3d", "7d", "14d", "30d"]

bullish_reasons = [
    "Momentum indicators on {t} are trending up over the last 14 sessions.",
    "Recent supply chain analysis suggests strong Q2 demand for {c}.",
    "Volume breakout detected with above-average buying pressure on {t}.",
    "RSI showing bullish divergence on the daily chart for {t}.",
    "Institutional inflows have increased 12% over the past week for {t}.",
    "Moving average crossover signals continued upward momentum for {t}.",
    "Earnings revision estimates trending higher ahead of next quarter for {c}.",
    "Positive sentiment shift detected across social media mentions for {t}.",
    "Strong support level holding at current price with low downside risk for {t}.",
    "Sector rotation favoring {s} stocks with {t} as a top beneficiary.",
    "Analyst upgrades outnumber downgrades 3-to-1 in the last month for {c}.",
    "On-balance volume trending higher confirming price advance for {t}.",
    "MACD histogram turning positive with increasing momentum for {t}.",
    "Relative strength versus S&P 500 at multi-week highs for {t}.",
    "Short interest declining 8% suggesting improving sentiment on {t}.",
    "Bollinger Band squeeze indicating an imminent breakout to the upside for {t}.",
    "Fibonacci retracement support holding at the 61.8% level for {t}.",
    "Money flow index indicates sustained accumulation in {t}.",
]

bearish_reasons = [
    "Momentum indicators on {t} are trending down over the last 14 sessions.",
    "Weakening demand signals from recent channel checks for {c}.",
    "Distribution pattern detected with above-average selling pressure on {t}.",
    "RSI showing bearish divergence on the daily chart for {t}.",
    "Institutional outflows have increased 15% over the past week for {t}.",
    "Death cross pattern forming on the weekly chart for {t}.",
    "Earnings revision estimates trending lower ahead of next quarter for {c}.",
    "Negative sentiment shift detected across analyst reports for {t}.",
    "Key resistance level rejecting price advances for {t}.",
    "Sector headwinds impacting {s} stocks with {t} facing elevated risk.",
    "Analyst downgrades outnumber upgrades 2-to-1 in the last month for {c}.",
    "On-balance volume trending lower confirming price decline for {t}.",
    "MACD histogram turning negative with increasing selling momentum for {t}.",
    "Relative strength versus S&P 500 at multi-week lows for {t}.",
    "Short interest increasing 10% suggesting growing bearish sentiment on {t}.",
    "Head and shoulders pattern forming on the daily chart for {t}.",
    "Breaking below the 200-day moving average with heavy volume for {t}.",
    "Money flow index indicates sustained distribution in {t}.",
]

neutral_reasons = [
    "Consolidation pattern forming with low volatility in {t}.",
    "Trading range bound between key support and resistance levels for {t}.",
    "Mixed signals from technical indicators suggest a wait-and-see approach on {t}.",
    "Balanced institutional flows with no clear directional bias for {t}.",
    "Awaiting upcoming catalyst event before committing to a direction on {t}.",
    "Volume declining at current levels suggesting indecision in {t}.",
    "RSI hovering near the midpoint with no clear momentum for {t}.",
    "Sector-neutral positioning recommended until clearer signals emerge for {t}.",
]

predictions = []
for i, (ticker, company, price, sector) in enumerate(stocks):
    direction = directions[i]
    confidence = round(random.uniform(0.45, 0.95), 2)
    # Skew confidence toward 0.60-0.85
    if confidence < 0.60:
        confidence = round(random.uniform(0.45, 0.62), 2)
    elif confidence > 0.85:
        confidence = round(random.uniform(0.83, 0.95), 2)

    if direction == "bullish":
        target = round(price * random.uniform(1.02, 1.15), 2)
        reasons_pool = bullish_reasons
    elif direction == "bearish":
        target = round(price * random.uniform(0.85, 0.98), 2)
        reasons_pool = bearish_reasons
    else:
        target = round(price * random.uniform(0.97, 1.03), 2)
        reasons_pool = neutral_reasons

    n_reasons = random.choice([2, 3])
    chosen = random.sample(reasons_pool, n_reasons)
    reasoning = [r.format(t=ticker, c=company, s=sector) for r in chosen]

    predictions.append({
        "ticker": ticker,
        "company": company,
        "price": price,
        "direction": direction,
        "confidence": confidence,
        "target": target,
        "timeframe": random.choice(timeframes),
        "reasoning": reasoning,
        "updatedAt": "2026-06-11",
        "sector": sector,
    })

bullish_count = sum(1 for p in predictions if p["direction"] == "bullish")
bearish_count = sum(1 for p in predictions if p["direction"] == "bearish")
neutral_count = sum(1 for p in predictions if p["direction"] == "neutral")
print(f"Direction: bullish={bullish_count}, bearish={bearish_count}, neutral={neutral_count}")
print(f"Unique tickers: {len(set(p['ticker'] for p in predictions))}")

with open("/data/astra-workspaces/4f040349397c49c19b0cc6e9b4ba75b6/goon-8664c3/data/predictions.json", "w") as f:
    json.dump(predictions, f, indent=2)

print("Done! File written.")
