// 1 - пофиксить баг с неправильным соответствием страны - городов
// 2 - showNumberOfItems - убрать манипуляции с DOM
// 3 - при поиске - найденная страна при клике открывает не те города,
// что ей принадлежат(открывает из this.cities.data, которые не меняются)
// 4 - по возможности - все манипуляции с данными объединить в функции filter

class Application {
    //Run application
    run(countries, cities) {
        this.countries = countries
        this.cities = cities
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
            const renderItems = []
            for(let key in this.countries.data) {
                renderItems.push(this.countries.data[key])
            }
            this.countries.render(renderItems)
            this.init()
            this.showNumberOfItems()
        })
    }

    //Bind on click handler to show cities
    bindShowCitiesHandler() {
        for(let i = 0; i < document.querySelector("#list-container > ul").children.length; i++) {
            document.querySelector("#list-container > ul").children[i].addEventListener("click", () => {
                this.onClickShowCities(i)
            })
        }
    }

    //Handler on showmore click
    onClickShowCities(index) {
        const renderItems = []
        for(const key in this.cities.data) {
            if(this.countries.data[index].name === this.cities.data[key].country) {
                console.log("Cities", this.cities.data[key])
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
        if(!document.getElementById(id).value) {
            return false
        }
        return true
    }
    
    //Show number of items
    showNumberOfItems() {
        let itemsCounter = 0
        const dataItems = document.querySelector("#list-container > ul").children
        for(let i = 0; i < dataItems.length; i++) {
            !dataItems[i].classList.contains("hide") && itemsCounter++
        }
        const message = document.createTextNode("Countries:" + itemsCounter),
              numOfItems = document.getElementById("number-of-items")
        numOfItems.innerHTML = ""
        numOfItems.appendChild(message)
    }

    //Search country by the name
    searchItem() {
        const request =  document.getElementById("search-input").value.toLowerCase()
        const renderItems = []
        for(let key in this.countries.data) {
            const country = this.countries.data[key].name.toLowerCase()
            ~country.indexOf(request) && renderItems.push(this.countries.data[key])
        }
        this.countries.render(renderItems)
        this.init()
    }
}

class List {
    //Constructor
    constructor(domNode, options) {
        this.domNode = domNode
        this.data = Object.assign({}, options)
        this.render(this.data)
    }

    //Render full list
    render(data) {
        this.domNode.innerHTML = ""
        this.listRoot = document.createElement('ul')
        for(const key in data) {
            this.addItem(data[key])
        }
        this.domNode.appendChild(this.listRoot)
    }

    //Add item to the list
    addItem(item) {
        const listItem = document.createElement("li")
        listItem.innerHTML = item.name
        this.listRoot.appendChild(listItem)
    } 
    
    //Filter list items 
    filter(func) {
        //args:className, action, domItem
        // action === "remove" ? 
        // domItem.classList.remove(className) :
        // domItem.classList.add(className)


    }
}

//DATA
const countries = [{name:"Ukraine"}, {name:"Spain"}, {name:"USA"}, {name:"Italy"}, {name:"France"}, {name:"China"}]

const cities = [{name:"Dnipro", country: "Ukraine"}, {name:"Kharkiv", country: "Ukraine"}, {name:"Kyjiw", country: "Ukraine"},
                {name:"Madrid", country: "Spain"}, {name:"Barcelona", country: "Spain"}, {name:"Seville", country: "Spain"},
                {name:"Atlanta", country: "USA"}, {name:"New York", country: "USA"}, {name:"Washington", country: "USA"}, {name:"Los Angeles", country: "USA"},
                {name:"Rome", country: "Italy"}, {name:"Milan", country: "Italy"}, {name:"Florence", country: "Italy"}, {name:"Venice", country: "Italy"}, {name:"Turin", country: "Italy"},
                {name:"Paris", country: "France"}, {name:"Nice", country: "France"}, {name:"Marseille", country: "France"}, {name:"Lyon", country: "France"}, {name:"Nantes", country: "France"}, {name:"Lille", country: "France"},
                {name:"Guangzhou", country: "China"}, {name:"Shenzhen", country: "China"}, {name:"Tianjin", country: "China"}, {name:"Shanghai", country: "China"}]

const citiesListDestination = document.getElementById('cities-list-container')
const countriesListDestination = document.getElementById('list-container')

const CitiesList = new List(citiesListDestination, cities)
const CountriesList = new List(countriesListDestination, countries)
const App = new Application()

// CitiesList.render(cities.filter(city => city.country.match()))

App.run(CountriesList, CitiesList)