
# Currency Exchange Rate (Euro) iOS Scriptable Widget

A **Scriptable** widget for iOS that displays current exchange rate data with a trendline graph right on your iPhone home screen. This widget allows you to track the exchange rate between the Euro (EUR) and another currency of your choice.

## Features

- **Real-time Exchange Rate**: Retrieves up-to-date exchange rate data via the [Frankfurter API](https://github.com/lineofflight/frankfurter).
- **Historical Graph**: Draws a trendline graph showing how the exchange rate has changed from a specified start date to today.
- **Multi-currency Support**: Choose from a range of currencies including AUD, USD, GBP, and more.
- **Easy Customization**: Set the start date and target currency directly through the widget parameter.

## Preview

![Widget Example](https://github.com/marius-giesa/euro-exchange-widget/blob/main/Exchange_Widget_Example.png) 
*Example of how the widget looks on the home screen.*

## Installation & Setup

1. **Copy the Code**: Copy the entire script code from the **The Script** section below.
2. **Create a New Script in Scriptable**:  
   - Open the [Scriptable](https://scriptable.app/) app on your iPhone.
   - Tap the `+` icon to create a new script.
   - Paste the copied code into the new script.
   - Save the script.
3. **Add the Widget to Your Home Screen**:
   - **Long-press** any empty space on your home screen until the icons start to wiggle.
   - Tap "Edit" in the top-left corner to add a widget.
   - Search for **Scriptable** and select it.
   - Choose the **2×2** widget size and tap **Add Widget**.
4. **Configure the Widget**:
   - Long-press the Scriptable widget once it's on your home screen.
   - Tap to **Edit Widget**.
   - Under **Script**, select the newly created script.
   - Under **When Interacting**, choose **Run Script**.
   - Under **Parameter**, enter the parameters in the format:  
     
     ```
     YYYY-MM-DD;CUR
     ```
     
     For example:
     
     ```
     2025-01-01;AUD
     ```
     
     This sets the start date to January 1, 2025, and uses AUD as the target currency.

## Supported Currencies

This widget supports the following currencies:

- **AUD** - Australia
- **BGN** - Bulgaria
- **BRL** - Brazil
- **CAD** - Canada
- **CHF** - Switzerland
- **CNY** - China
- **CZK** - Czech Republic
- **DKK** - Denmark
- **GBP** - United Kingdom
- **HKD** - Hong Kong
- **HUF** - Hungary
- **IDR** - Indonesia
- **ILS** - Israel
- **INR** - India
- **ISK** - Iceland
- **JPY** - Japan
- **KRW** - South Korea
- **MXN** - Mexico
- **MYR** - Malaysia
- **NOK** - Norway
- **NZD** - New Zealand
- **PHP** - Philippines
- **PLN** - Poland
- **RON** - Romania
- **SEK** - Sweden
- **SGD** - Singapore
- **THB** - Thailand
- **TRY** - Turkey
- **USD** - United States
- **ZAR** - South Africa


## License

Feel free to use, modify, and share this code under your preferred license. Attribution is appreciated but not mandatory.

---

If you have any issues, suggestions, or want to contribute improvements, please open an issue or submit a pull request. Happy coding!
