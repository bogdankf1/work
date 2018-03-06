//Application class
class Application {
    //Run application
    run(countries, cities) {
        this.countries = countries
        this.cities = cities
        this.loadCountries()
        setTimeout(() => {
            this.countries.render(this.countries.data)
            this.init()
        })
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
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (res) => {
            if (xhr.readyState === 4 && xhr.status === 200) {   
                this.countries.data = JSON.parse(res.currentTarget.response)
            }
        }
        xhr.open("GET", "http://127.0.0.1:3000/api/country/list", true)
        xhr.send()
    }

    //Load cities to selected country from a server
    loadCities(countryName) {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (res) => {
            if (xhr.readyState === 4 && xhr.status === 200) {   
                this.cities.data = JSON.parse(res.currentTarget.response)
            }
        }
        xhr.open("GET", `http://127.0.0.1:3000/api/city/list/${countryName}`, true)
        xhr.send()
    }

    postCountry() {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (res) => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                console.log(res.currentTarget.response)
            }
        }
        xhr.open("POST", "http://127.0.0.1:3000/api/country", true)
        xhr.send()
    }

    postCity() {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (res) => {
            if(xhr.readyState === 4 && xhr.status === 200) {
 
            }
        }
        xhr.open("POST", "http://127.0.0.1:3000/api/city", true)
        xhr.send()
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
            e.target.tagName === "LI" && this.onClickShowCities(e.target.getAttribute("index"))
        })
    }

    //Handler on showmore click
    onClickShowCities(index) { 
        // setTimeout(() => {
        //     this.postCountry() 
        // }, 1000);   
        const receivedCountries = this.searchItem() || this.countries.data
        this.loadCities(receivedCountries[index].name)
        setTimeout(() => {
            this.cities.render(this.cities.data)
        }, 100)
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
    searchItem() {
        const request = document.getElementById("search-input").value.toLowerCase()
        const renderItems = []
        for(const key in this.countries.data) {
            if(~this.countries.data[key].name.toLowerCase().indexOf(request)) {
                renderItems.push(this.countries.data[key])
            }
        }
        this.countries.render(renderItems)
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
