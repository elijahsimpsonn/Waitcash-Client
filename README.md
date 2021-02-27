<h1 align="middle">WaitCash</h3>

<h2 align="middle">A Web Application for keeping track of wages during server shifts.</h2>

---

<p align="middle">
  <img src="src\images\waitcash.gif" width="40%"/>
</p>

---

<h2 align="middle">This is the Client for WaitCash. The Server can be found <a href="https://github.com/elijahsimpsonn/waitcashv2-server">here.</a></h2>
<p align="middle">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react router&logoColor=white">
</p>

---

### About:

WaitCash is an application for anyone who works in a position that earns them tips. Users of the application can create an account and enter tips which will be saved into their account. They can then see multiple breakdowns of their earnings in different formats. The GIF above shows the application in action, and I have provided a demo account for anyone who might want to see how the app works without creating an account. 

Below you will find information about the application, including the packages used, the client endpoints, and a change-log that outlines future editions I plan on adding. If you would like to see more of my projects, feel free to browse my GitHub profile, or check out my portfolio <a href="http://www.elijahsimpson.com/">here</a>. 

---
### Included Packages:

* **jest-dom** (custom jest matchers to test the state of the DOM)
* **user-event** (companion library for testing library)
* **dotenv** (zero-dependency module that loads environment variables from a .env file)
* **history** (easily manage session history anywhere JavaScript runs.)
* **jsonwebtoken** (creates data with encryption whose payload holds JSON)
* **react** (a JavaScript library for building user interfaces)
* **reactdom** (DOM-specific methods that can be used at the top level of the app)
* **react-fade-in** (dead-simple and opinionated component to fade in an element's children)
* **react-router-dom** (DOM bindings for React Router)
* **react-scripts** (scripts and configuration used by Create React App)
* **victory** (React.js components for modular charting and data visualization)
* **web-vitals** (library for measuring all the Web Vitals metrics on real users)
* **week-utils** (a collection of week util written with TypeScript, inspired by moment.js)
---

### Client Endpoints:

* **Landing Page** - First page the user sees. Explains the purpose of the application, allows users to check out a demo account, or takes them to either the Login or Registration page.
* **Login** - Allows users to login. Will also take them back to the Landing Page if requested, or to the Registration page in they need to create an account.
* **Registration** - Allows users to create an account. Passwords must be at least 8 characters long, must contain 1 upercase letter, and 1 symbol. Will also take them back to the Landing Page if requested, or to the Login page in they need to log in.
* **Dashboard** - Once logged in, users will be directed to the Dashboard. Here they can see their earnings at a glance, broken down into date ranges and a pit chart. From here they can go to the Tips page or log out. 
* **Tips** - Allows users to enter tips for the current date. Shows how many tips they have earned, total of all tips of that date, and the average earning. From here users can head back to the Dashboard when they are done adding tips.
---

### ChangeLog / Future Updates:
Coming soon!

---

### Setup Documentation:
* First follow the setup documentaion in the <a href="https://github.com/elijahsimpsonn/waitcashv2-server">server repo</a>.
* Clone this repo.
* Run `npm install` to install all of the dependencies.
* In the `config.js` file in the `src` folder, change the `API_ENDPOINT` to `http://localhost:8000/api`.
* Run `npm start` in the terminal, and everything should be up an running.

##### Please reach out to me if this does not work for you for whatever reason, and I will do my best to help you resolve any issues. 