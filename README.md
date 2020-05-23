## Code Institute Interactive Front End Development with Javascript

# My Spending Insights Dashboard  

## Project Objectives  

As a working individual in Singapore, I am concerned about my living expenses and national expenditure averages. Inflation happens annually worldwide and it will always be a constant worry for citizens of this world. Am I overspending on a specific categories of goods and services? Are my expenses stable? Am I able to predict a stable sum of how much I would spend on food or transportation for the following month?

The aim of the project is to present a summarized view of national (Singapore) and personal expenditure of users of this website. This is to enable individuals to compare their spending levels against national average and to allow them make informed feedbacks regarding their expenses level for different categories of goods and services.

## UX  

### Overview and Colour
The website has to be clean and pleasing, to achieve its objective of presenting data visually to the user.
The color green (#68ab77) was chosen as this dashboard's primary colour because historically green is the colour of money. Green is used to show national average income levels (bar chart) as well as national average expenditure by goods and services (horizontal bar chart).  

Red (#d8485c) was chosen as a secondary colour. Red is used to show national expenditure levels (in the bar chart) and user entered data because red catches the attention easily. 

To add attractiveness to the statistics, a dash of blue and orange are used sparingly (including green and red) in icons and numbers. The lines in the series chart also uses multi colour (to show differences among spending categories).

### User Stories
1. The targetted audience for this website are the general public in Singapore and any individual in Singapore who wishes to know the national average household expenditures by income quintile and to view it visually in the charts.
2. The user is able to see from the website (in table and chart provided) which income quintile his/her household belongs to.
3. By entering their household expenditure, the user is able to compare his/her household's expenditure to the national average of the same income quintile.
4. The user has past expenditure data which he/she would like to see visually on the dashboard chart.
5. The user will also be able to see which category of goods and services his/her household spent the most on.

### Wireframes  
Prior to starting this website, a layout was roughly drawn to visualize the arrangements of the charts and information. After which, a wireframe was drawn using AdobeXD. The wireframe can be viewed [here].(https://github.com/Oraclebun/ci-interactive-project2/tree/master/wireframe/dashboard-wireframe.pdf).

### UI and Features
+ The layout is chosen to have a main image at the top along with 4 cards to show top expenditure categories. 
+ A left sidebar is included in the layout for easier navigation and the users will be given an option to minimize the sidebar to enhance their view of the website.
+ The charts and tables are presented on bootstrap cards layout with cards heading. 
+ On mobile, the main image is hidden to enhance the user experience with using the website on small screen devices. 
+ Users are able to hover over the bar chart of household income vs household expenditure, and see the bars change colour to bright yellow. + On hover, they are able to see a tooltip information stating the value of the bars and what they represent (income or expenditure).
+ Above the doughnut/ring chart, there is a blue button that links to the household expenditure form where users are able to enter their household expenditure by categories of goods and services and upon submit, they should see the doughnut chart update to show 2 portions. 
+ The red portion represents the total user expenditure while the green portion represents the national expenditure based on the user's category.
+ The horizontal bar chart on its left show the bars listing from highest to lowest expenditure by goods and services category.
+ After the user submits the form, the horizontal chart should show a gradient of blue to green colour to represent a total of both user and national data for each category.
+ The doughnut chart when clicked, will filter the data for the horizontal bar chart. If the user clicks the user portion of the doughnut chart, the horizontal bar chart will show the user's average expenditures by goods and services category. The same goes for the national portion.
+ If the user selects the user portion of the doughnut chart (in red), the horizontal bar chart will change colour to red to show colour harmony with the doughnut chart. The same goes for national portion of the doughnut chart (in green). The horizontal bars will change to green for national data. 
+ Below the doughnut and the horizontal bar chart the user should be able to see a group of "Key Findings" cards. The cards aim to summarize the key findings from the Singapore Household Income Survey 2017/18.
+ On loading the webpage, the users should be able to see the series chart (line chart) rendered with already available data. This data is actually randomly generated to show users how the series chart would look like. 
+ Below these cards, users should find a button that links to another form. This form is a table that needs user's past 6 months of expenditure data for 6 different goods and services categories.
+ Upon saving the data, users should be able to see the series chart update accordingly with users' data. 
+ On hover, the chart is able to show the points which corresponds to the data which the user entered. But because the dates are treated as date object, the past 6 month's data actually corresponds to the date which the user enters the data. For example, if the user enters the data on the 7th of this month, the past month data will be shown on the 7th and similarly for the month before that, even though the x-axis value is in MMM-YY format.

### Features to be Implemented 
1. One feature that would be great to have in future would be an hourly/daily input for all goods and services expenditure. This input will be totalled by the end of the month to make the data easily available. However, the down side would be to have the users keep keying in this data. As this would be bad for user experience, one way to solve it is to have the user link his bank account to the app but this is only feasible if user's transaction are all cashless transactions.
2. Another possible feature good to have is to allow users to upload a csv file for the expenditure tracking portion so that they do not need to fill up the expenditure tracking form.

## Technologies Used
The technologies and libraries used in this project are:
+ [HTML5](https://html.spec.whatwg.org/multipage/). HTML5 is the markup language that stores the structure of the webpage document.
+ [CSS3](https://www.w3.org/Style/CSS/). CSS3 is the style sheet language that supports the presentation of document written in markup language. It is used to customize colour and styling on this website.
+ [Bootstrap 4](https://getbootstrap.com/) is a used as a framework for making this project website responsive and mobile-ready.
+ [Javascript](https://developer.oracle.com/sg/javascript/). Javascript is the language used to build the functionality of this website.
+ [jQuery](https://jquery.com/) is used to makes HTML document traversal and manipulation, event handling, animation, and Ajax simpler for this project. It is a javascript library used to simplify javascript.
+ [Moment.js](https://momentjs.com/) is used to parse dates for chart handling and also ease display of dates in string format.
+ [D3.js](https://d3js.org/) is used to display data based documents visually.
+ [DC.js](https://dc-js.github.io/dc.js/) is used to leverage d3.js to render charts in CSS-friendly SVG format. 
+ [Crossfilter](https://square.github.io/crossfilter/) is a used to ease handling of data before prior to plotting.
+ [Google fonts](https://fonts.google.com/) is a used to add a custom touch to the fonts in this project.
+ [Font Awesome](https://fontawesome.com/) is a used to add a touch of fun and playfulness to the website.
+ [restdb.io](https://restdb.io/) is used to host the data for this project and the data is retrieved through api calls to this website.

## Testing
The method of test used for this project is purely manual testing:
1. The html file is validated using [W3C Markup Validation Service](https://validator.w3.org/).
2. The css file is checked using [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
3. Validating functionality:
+ HTML on load will make 2 API calls to retrieve data and store it into the local storage or session storage depending on the availability.
+ Random data will also be generated for the series chart.
+ Sidebar Toggle Button, when clicked will toggle the sidebar as expected.
    * When toggled the sidebar will hide for mobile devices and will show a minimum width bar with icons for tablet and larger devices. 
    * The Dashboard with its icon links back to homepage.
    * The Forms icons will open up its respective form.
    * The table icons direct users to the dashboard table.
    * The charts icons direct users to the dashboard series chart.
    * Similar behaviour is observed for the top navbar.
    * Data Source in the top navbar will link users to the Singstat website where users can explore more about Singapore Household data.
+ For the grouped bar chart, when hovered, the bars will change to a bright yellow colour and a blue tooltip will appear. It shows the corresponding value of the bar chart.
+ The doughnut chart has a blue button with the text "My Household Expenditure Form". When data is keyed in and form is submitted, the doughnut chart will show 2 portions. 1 red and 1 green. The horizontal bar chart on its left will show bars in shades of blue to blue-green.
    * The green portion on the doughnut represents national data. When clicked on the green portion, the horizontal bars will change colour to green. The bars length will change accordingly to its data value.
    * The red portion on the doughnut represents user data. When clicked on the red portion, the horizontal bars will change colour to red. The bars length will change accordingly to its data value.
    * When either portions are selected, a blue text with the word "reset" will appear below the "My Household Expenditure Form" button.
    * When reset is clicked, the doughnut chart and the horizontal bar chart are re-rendered.
+ The horizontal bar chart when hovered will turn to bright yellow colour. The text showing the categories will change from white to black colour and a tooltip will appear to show the bar's value.
    * When any bar is clicked, the doughnut chart will change to show the portions of the national average versus user's average expenditure for the selected goods and services. Users are then able to compare which portion of the doughnut is bigger. The bigger portion indicates higher expenditure.
    * If any bar is clicked, a blue text with the word "reset" will appear above the horizontal bar chart.
    * When the reset link is clicked, both the doughnut and horizontal bar chart are re-rendered.
+ Below the 4 Key Findings cards, there is a blue "Expenditure Tracking Form" button. 
    * When there is valid data, clicking the save button will trigger the series chart to plot the corresponding data.
+ Functionality for the series chart:  
    * When hover at specific points on the any line in the series chart, a dot will appear along with 2 dotted lines that projects onto the y and x axis. A tooltip will appear to show the date, time and value of the specific point.
    * When the mouse hovers over a specific item in the legend, the line that corresponds to the selected item will show while the other lines will fade.
4. The project is tested on 2 different browser types mainly (Chrome 81 and Firefox 75). It is also tested on the Iphone X using Safari 13. From the internal browser developer interface, toggle device toolbar is selected for different screen sizes to manually view and test the mobile responsiveness. The list of toggle devices screen tested using the browser developer interface are :
    * Pixel 2 and 2XL
    * IPhone 5
    * IPhone 6/7/8 and 6/7/8 Plus
    * Ipad and Ipad Pro
    * Nexus 6 and Nexus 7
    * Laptop with HiDPI Screen (Width 1440)    
+ Crossbrowser testing is also performed using [Browserling](https://www.browserling.com/). Below are the other browsers tested on using this site :
    * Opera 62
+ As d3.js and dc.js are charting libraries that are only supported on modern browsers, this website will not be correctly displayed on Internet Explorer.

### Forms
+ Household Expenditure Form Behaviour:
    * Clicking on the household expenditure form link either in the sidebar or above the doughnut chart will open up this form in the modal window.
    * When any of the input fields are empty, if the submit button is pressed, no data will be submitted and doughnut chart and horizontal bar chart will not be triggered for a redrawn.
    * A simple form validation is in place for the inputs that only allow users to key in numbers without e, +ve and -ve sign. 
    * The html input tag number type is used to assist in preventing users from keying in non-digit characters.
+ Expenditure Tracking Form Behaviour:
    * When clicked, a modal with a form-table will pop up. Clicking on the blue "Edit" button allows form editting. 
    * When the "Edit" button is clicked again, the table-form is now made non-editable until the edit button is clicked again.
    * Clicking on the red save button with empty input by the user will clear the data in the series chart. All lines will be plotted at 0.
    * Clicking on the red save button will also return the form to non-editable state.
    * A simple form validation is in place to prevent users entering non-digits symbols and space.

### Bugs
+ During the testing stage, there seems to be a bug when changing from large screen to small screen sizes. The website doesn't seem to refresh during resizing and in order to view correctly everytime the screen sizes are change, a refresh is done.
+ For the Expenditure Tracking form, although users are still only allowed to key in digits, they are still able to cut and paste other "illegal" characters into the forms. This could be fixed by using a more advance client side form validator or writing one. However, due to the limited time available while working on this project, this could be done as a future improvement.

## Deployment.
Currently this interactive website is deployed via GitHub pages. 
The code version control is maintained through git and repository is hosted on github pages.

---
<https://oraclebun.github.io/ci-interactive-project2/>

---
This project can also be cloned and run locally from: 

---
https://github.com/Oraclebun/ci-interactive-project2

---

To clone the project, type in the command 'git clone https://github.com/Oraclebun/ci-interactive-project2' in the command prompt/ terminal window. 

## Credits and Acknowledgement
### Contents and Media
1. The data for the Monthly Average Household Income and Expenditures, and Average Household Expenditure by Goods and Services is taken from the Singapore Household Expenditure Survey 2017/18. The survey data is available in excel format from [Singapore Department of Statistics](https://www.singstat.gov.sg/). 
+ The average monthly household income by income quintile is taken from table 27a of the excel file. 
+ The average monthly household expenditure by income quintile is taken from table 2 of the excel file. 
+ The average monthly household expenditure by type of goods and services data is taken from table 16a of the excel file.
2. The main image of this project (the green image of family paper silhouette) is taken from [Freepik](https://www.freepik.com/)
3. The svg icon of the man & woman in green in the top navbar as well as the utensils in orange icon is taken from [FlatIcon](https://www.flaticon.com/)
4. The layout of the html framework is inspired by free open source bootstrap 4 admin theme[SB Admin 2](https://startbootstrap.com/themes/sb-admin-2/).
5. The API calls and many of the jQuery snippets are learnt and taken from jQuery website.
6. The storage availability snippet is taken from MDN [Using the Web Storage section](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
7. The d3.js charts and table in this project is credited to the Chart Examples on [D3.js](https://www.d3-graph-gallery.com/index.html)
8. DC.js charts in this project are greatly credited to the Chart Examples on [DC.js](https://dc-js.github.io/dc.js/)

## Disclaimer
Any content and images used on this website is only for personal development and educational purpose. They are not meant for profit or for income purposes.