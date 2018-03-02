class Application {
    //Run application
    run(countries, cities) {
        this.countries = countries
        this.cities = cities
        this.countries.render(this.countries.data)
        this.init()
    }

    //Initialize all handlers
    init() {
        this.bindSearchFormHandler()
        this.bindAllItemsHandler()
        this.bindShowCitiesHandler()
        this.showNumberOfItems()
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
        const receivedCountries = this.searchItem() || this.countries.data
        const renderItems = []
        for(const key in this.cities.data) {
            if(receivedCountries[index].name === this.cities.data[key].country) {
                renderItems.push(this.cities.data[key])
            }
        }
        this.cities.render(renderItems)
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
const cities = [{name:"Dnipro", country: "Ukraine"}, {name:"Kharkiv", country: "Ukraine"}, {name:"Kyjiw", country: "Ukraine"},
                {name:"Madrid", country: "Spain"}, {name:"Barcelona", country: "Spain"}, {name:"Seville", country: "Spain"},
                {name:"Atlanta", country: "USA"}, {name:"New York", country: "USA"}, {name:"Washington", country: "USA"}, {name:"Los Angeles", country: "USA"},
                {name:"Rome", country: "Italy"}, {name:"Milan", country: "Italy"}, {name:"Florence", country: "Italy"}, {name:"Venice", country: "Italy"}, {name:"Turin", country: "Italy"},
                {name:"Paris", country: "France"}, {name:"Nice", country: "France"}, {name:"Marseille", country: "France"}, {name:"Lyon", country: "France"}, {name:"Nantes", country: "France"}, {name:"Lille", country: "France"},
                {name:"Guangzhou", country: "China"}, {name:"Shenzhen", country: "China"}, {name:"Tianjin", country: "China"}, {name:"Shanghai", country: "China"}]

const countries = [{name:"Ukraine"}, {name:"Spain"}, {name:"USA"}, {name:"Italy"}, {name:"France"}, {name:"China"}]

const citiesListDestination = document.getElementById('cities-list-container')
const countriesListDestination = document.getElementById('list-container')

const CitiesList = new List(citiesListDestination, cities)
const CountriesList = new List(countriesListDestination, countries)
const App = new Application()

App.run(CountriesList, CitiesList)