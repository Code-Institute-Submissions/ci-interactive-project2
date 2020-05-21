## Code Institute Interactive Front End Development with Javascript

# My Spending Insights Dashboard  

## Project Objectives  

As a working individual in Singapore, I am concerned about my living expenses and national expenditure averages. Inflation happens annually worldwide and it will always be a constant worry for citizens of this world. Am I overspending on a specific categories of goods and services? Are my expenses stable? Am I able to predict a stable sum of how much I would spend on food or transportation for the following month?

The aim of the project is to present a summarized view of national and personal expenditure individuals who uses the website. This website serves to inform any individual living and working in Singapore of the national averages in income and expenditures and categories of goods and services most spent on. This is to enable individuals to compare their spending levels against national average and to allow them make informed feedbacks regarding their expenses level.

The data for this website is taken from the Singapore Household Expenditure Survey 2017/18.

## UX  

### Overview and Colour
The website has to be clean and pleasing, to achieve its objective of presenting data visually to the user.
The color green (#68ab77) was chosen as this dashboard's primary colour because historically green is the colour of money. Green is used to show national average income levels (bar chart) as well as national average expenditure by goods and services (horizontal bar chart).  

Red (#d8485c) was chosen as a secondary colour. Red is used to show national expenditure levels (in the bar chart) and user entered data because red catches the attention easily. 

Too add attractiveness to the statistics, a dash of other colours are used sparingly in icons and numbers and to colour the lines in the series line chart (to show difference among spending categories).

### User Stories
1. The user is a general public in Singapore who wishes to know the national average household expenditures by income quintile and to view it visually in the charts.
2. The user wishes to quickly be able to see which income quintile his/her household belongs to.
3. By entering their household expenditure, the user is able to compare his/her household's expenditure to the national average of the same income quintile.
4. The user has past expenditure data which he/she would like to see visually on the dashboard chart.
5. The user will also be able to see which category of goods and services his/her household spent the most on.

### Wireframes  
Prior to starting this website, a layout was roughly drawn to visualize the arrangements of the charts and information. After which, a wireframe was drawn using AdobeXD. The wireframe can be viewed [here].(https://github.com/Oraclebun/ci-interactive-project2/tree/master/wireframe/dashboard-wireframe.pdf).

### UI and Features
+ The layout is chosen to have a main image at the top along with 4 cards to show top expenditure categories. 
+ A left sidebar will be included in the layout for easier navigation and the users will be given an option to minimize the sidebar to enhance their view of the website.
+ The charts and tables are presented in bootstrap cards layout with cards heading. 
+ On mobile, the main image is hidden to enhance user experience of getting users straight to the dashboard information. 
+ Users are able to hover over the bar chart of household income vs household expenditure, and see the bars change colour to bright yellow. + On hover, they are able to see a tooltip information stating the value of the bars and what they represent (income or expenditure).
+ Above the doughnut/ring chart, there is a blue button that links to the household expenditure form where users are able to enter their household expenditure by categories of goods and services and upon submit, they should see the doughnut chart update to show 2 portions. 
+ The red portion represents the total user expenditure while the green portion represents the national expenditure based on the user's category.
+ The horizontal bar chart on its left shows the bars listing from highest to lowest expenditure by goods and services category.
+ After the user submits the form, the horizontal chart should show a gradient of blue to green colour to represent both user and national dataq in total for each category.
+ The doughnut chart when clicked, will filter the data for the horizontal bar chart. If the user clicks the user portion of the doughnut chart, the horizontal bar chart will show the user's average expenditures by goods and services category. The same goes for the national portion.
+ If the user selects the user portion of the doughnut chart (in red), the horizontal bar chart will change colour to red to show colour harmony with the doughnut chart. The same goes for national portion of the doughnut chart (in green). The horizontal bars will change to green for national data. 
+ Below the doughnut and the horizontal bar chart the user should be able to see a group of "Key Findings" cards. The cards aim to summarize the key findings from the Singapore Household Income Survey 2017/18.
+ On loading the webpage, the users should be able to see the series chart (line chart) rendered with already available data. This data is actually randomly generated to show users how the series chart would look like. 
+ Below these cards, users should find a button that links to another form. This form is a table that needs user's past 6 months of expenditure data for 6 different goods and services categories.
+ Upon saving the data, users should be able to see the series chart update accordingly to plot out the users' data. 
+ On hover, the chart is able to show the points which corresponds to the data which the user entered. But because the dates are treated as date object, the past 6 month's data actually corresponds to the date which the user enters the data. For example, if the user enters the data on the 7th of this month, the past month data will be shown on the 7th and similarly for the month before that, even though the x-axis value is in MMM-YY format.

### Features to be Implemented 
1. One feature that would be great to have in future would be an hourly/daily input for all goods and services expenditure. This input will be totalled by the end of the month to make the data easily available. However, the down side would be to have the users keep keying in this data. As this would be bad for user experience, one way to solve it is to have the user link his bank account to the app but this is only feasible if user's transaction are all cashless transactions.
2. Another possible feature good to have is to allow users to upload a csv file for the expenditure tracking portion so that they do not need to fill up the expenditure tracking form.

## Technologies Used
The technologies and libraries used in this project are:
+ [HTML5](https://html.spec.whatwg.org/multipage/). HTML5 is the markup language that stores the structure of the webpage document.
+ [CSS3](CSS3 (https://www.w3.org/Style/CSS/). CSS3 is the style sheet language that supports the presentation of document written in markup language. It is used to customize colour and styling on this website.
+ [Bootstrap 4](https://getbootstrap.com/) is a used as a framework for making this project website responsive and mobile-ready.
+ [jQuery](https://jquery.com/) is used to makes HTML document traversal and manipulation, event handling, animation, and Ajax simpler for this project.
+ [Moment.js](https://momentjs.com/) is used to parse dates for chart handling and also ease display of dates in string format.
+ [D3.js](https://d3js.org/) is used to display data based documents visually.
+ [DC.js](https://dc-js.github.io/dc.js/) is used to leverages d3.js to render charts in CSS-friendly SVG format. 
+ [Crossfilter](https://square.github.io/crossfilter/) is a used to ease handling of data in this project. 
+ [Google fonts](https://fonts.google.com/) is a used to add a custom touch to the fonts in this project.
+ [Font Awesome](https://fontawesome.com/) is a used to add a touch of fun and playfulness to the website.

## Testing
The method of test used for this project is purely manual testing:
1. The html file is validated using [W3C Markup Validation Service](https://validator.w3.org/).
