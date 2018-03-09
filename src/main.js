//get familiar with middleware and it's usage in node js
//middleware - array of async callbacks

//Application class
class Application {
    //Run application
    run(countries, cities) {
        this.countries = countries
        this.cities = cities
        this.loadCountries()
    }

    //Initialize all handlers
    init() {
        this.bindSearchFormHandler()
        this.bindAllItemsHandler()
        this.bindShowCitiesHandler()
        this.showNumberOfItems()
    }

    //Load countries from a server
    loadCountries() {
        this.showPreloader()
        fetch("http://127.0.0.1:3000/api/country/list")
            .then(response => response.json())
            .then(jsonData => this.countries.data = jsonData)
            .then(() => {
                this.countries.render(this.countries.data)
                this.init()
                this.hidePreloader()
            })
    }

    //Load cities to selected country from a server
    loadCities(countryName) {
        this.showPreloader()
        fetch(`http://127.0.0.1:3000/api/city/list/${countryName}`)
            .then(response => response.json())
            .then(jsonData => this.cities.data = jsonData)
            .then(() => {
                this.cities.render(this.cities.data)
                this.hidePreloader()
            })
    }

    //Post country to a server
    postCountry() {
        fetch("http://127.0.0.1:3000/api/country", {
            body: JSON.stringify({"postCountry":111}),
            method: "POST"
            })
            .then(response => response.json())
            .then(jsonData => console.log(jsonData))
    }

    //Post city to a server
    postCity() {
        fetch("http://127.0.0.1:3000/api/city", {
            body: JSON.stringify({"postCity":222}),
            method: "POST"
            })
            .then(response => response.json())
            .then(jsonData => console.log(jsonData))
    }

    //show preloader
    showPreloader() {
        document.getElementById("preloader").classList.remove("hide")
    }

    //hide preloader
    hidePreloader() {
        document.getElementById("preloader").classList.add("hide")
    }

    //Bind onsubmit handler to search form 
    bindSearchFormHandler() {  
        document.getElementById("search-form").addEventListener("submit", (e) => {
            e.preventDefault()
            this.validateForm("search-input") && this.searchItem()
        });
    }

    //Bind onclick handler to 'show all items' button
    bindAllItemsHandler() {
        document.getElementById('all').addEventListener('click', () => {
            this.cleanForm("search-input")
            this.countries.render(this.countries.filter(true))
            this.cities.render()
            this.showNumberOfItems()
        })
    }

    //Bind on click handler to show cities
    bindShowCitiesHandler() {
        document.getElementById("list-container").addEventListener("click", (e) => {
            e.target.tagName === "LI" && this.onClickShowCities(e.target.getAttribute("index"), e)
        })
    }

    //Handler on showmore click
    onClickShowCities(index) {
        const receivedCountries = this.searchItem()
        receivedCountries.forEach((item) => item.selected = false)
        receivedCountries[index].selected = true
        this.countries.render(receivedCountries)
        this.loadCities(receivedCountries[index].name)
    }

    //Validate form to enter correct values
    validateForm(id) {
        document.getElementById(id).onkeyup = function () {
            if (this.value.match(/^[ ]+$/)) {
                this.value = ''
            }
        }
        return !document.getElementById(id).value ? false : true 
    }
    
    //Clean form
    cleanForm(id) {
        document.getElementById(id).value = ""
    }

    //Show number of items
    showNumberOfItems(renderedItems) {
        const itemsCounter = renderedItems ? renderedItems.length : Object.keys(this.countries.data).length
        const message = document.createTextNode("Countries:" + itemsCounter),
              numOfItems = document.getElementById("number-of-items")
        numOfItems.innerHTML = ""
        numOfItems.appendChild(message)
    }

    //Search country by the name
    searchItem(e) {
        const request = document.getElementById("search-input").value.toLowerCase()
        const renderItems = []
        for(const key in this.countries.data) {
            if(~this.countries.data[key].name.toLowerCase().indexOf(request)) {
                renderItems.push(this.countries.data[key])
            }
        }
        request === "" ? "" : this.countries.render(renderItems)
        this.showNumberOfItems(renderItems)
        return renderItems
    }
}

//List class
class List {
    //Constructor
    constructor(domNode, options) {
        this.domNode = domNode
        this.data = Object.assign({}, options)
    }

    //Render full list
    render(data) {
        this.domNode.innerHTML = ""
        this.listRoot = document.createElement('ul')
        for(const key in data) {
            this.addItem(data[key], key)
        }
        this.domNode.appendChild(this.listRoot)
    }

    //Add item to the list
    addItem(item, index) {
        const listItem = document.createElement("li")
        listItem.innerHTML = item.name
        item.hasOwnProperty("selected") && item.selected === true ? listItem.classList.add("selected") : ""
        listItem.setAttribute("index", index)
        this.listRoot.appendChild(listItem)
    } 
    
    //Filter list items 
    filter(func) {
        const filteredData = []
        for(let key in this.data) {
            if(func) {
                filteredData.push(this.data[key])
            }
        }
        return filteredData
    }
}

//DATA
let cities = []
let countries = []

//Destination points
const citiesListDestination = document.getElementById('cities-list-container')
const countriesListDestination = document.getElementById('list-container')

//Create examples of classes 
const CitiesList = new List(citiesListDestination, cities)
const CountriesList = new List(countriesListDestination, countries)
const App = new Application()

//Run application
App.run(CountriesList, CitiesList)