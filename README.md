# euro-exchange-widget
Exchange Rate iOS Scriptable Widget

A simple yet powerful Scriptable widget for iOS that displays current exchange rates between Euro (EUR) and another currency of your choice, plus a graph showing the exchange rate trend from a selected start date to today.

Features

Real-time Exchange Rate: Fetches the latest exchange rate data using the Frankfurter API.
Historical Graph: Displays a trendline graph of how the chosen currency rate has changed over a custom date range.
Multiple Currencies: Supports a variety of currencies (e.g., AUD, USD, GBP, etc.).
Configurable: You can customize the widget parameter to:
Choose the start date in YYYY-MM-DD format.
Specify the target currency (e.g., AUD).
Preview

Below is an example screenshot of how the widget might look on your iPhone's home screen:

(Replace example_screenshot.png above with the actual screenshot file name or a link to the image in your repository.)

How to Install

Copy the Code: Copy the entire script from the code section below.
Create a New Script in Scriptable:
Open the Scriptable app on your iPhone.
Tap the + icon to create a new script.
Paste the copied code into the new script.
Press Done.
Add the Widget to Your Home Screen:
Long-press any empty space on your home screen until icons start to wiggle.
Tap the + button (or "Edit" in the top-left corner) to add a widget.
Search for Scriptable and select it.
Choose the 2×2 widget size and tap Add Widget.
Configure the Widget:
While still in jiggle mode, tap the newly added Scriptable widget.
Under Script, select the new script you just created.
Under When Interacting, choose Run Script.
Under Parameter, type your desired parameters in the format YYYY-MM-DD;CUR, for example:
2025-01-01;AUD
This will show the Euro-to-Australian Dollar exchange rate from January 1, 2025, to the current date.
Usage

Widget Parameter: You must set the start date and the target currency via the widget parameter.
Example: 2025-01-01;AUD
Once added, the widget will automatically fetch the latest data each time it refreshes.
Supported Currencies

AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, 
GBP, HKD, HUF, IDR, ILS, INR, ISK, JPY, 
KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, 
SEK, SGD, THB, TRY, USD, ZAR
