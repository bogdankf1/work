class Application {
    //Constructor
    constructor(countries, cities) {
        this.countries = countries;
        this.cities = cities;
        this.init();
    }

    //Initialize all handlers
    init() {
        this.bindSearchFormHandler();
        this.bindAllItemsHandler();
        this.bindShowCitiesHandler();
        this.showNumberOfItems();
    }

    //Bind onsubmit handler to search form 
    bindSearchFormHandler() {  
        document.getElementById("search-form").addEventListener("submit", (e) => {
            e.preventDefault();
            if(this.validateForm("search-input")) {
                this.searchItem();
            }
        });
    }

    //Bind onclick handler to 'show all items' button
    bindAllItemsHandler() {
        document.getElementById('all').addEventListener('click', () => {
            this.hideCitiesList("cities-list-container");
            this.showAllItems("#list-container > ul");
            this.showNumberOfItems();
        });
    }

    //Bind on click handler to show cities
    bindShowCitiesHandler() {
        const allItems = document.querySelector("#list-container > ul").children;
        for(let i = 0; i < allItems.length; i++) {
            allItems[i].addEventListener("click", () => {
                this.onClickShowCities(i);
            });
        }
    }

    //Validate form to enter correct values
    validateForm(id) {
        document.getElementById(id).onkeyup = function () {
            if (this.value.match(/^[ ]+$/)) {
                this.value = '';
            }
        }
        if(!document.getElementById(id).value) {
            return false;
        }
        return true;
    }

    //Show all list items
    showAllItems(selector) {
        const allItems = document.querySelector(selector).children;
        for(let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove("hide");
        }
    }

    //Hide cities list
    hideCitiesList(id) {
        document.getElementById(id).classList.add("hide");
    }

    //Show cities list
    showCitiesList(id) {
        document.getElementById(id).classList.remove("hide");
    }

    //Show number of items
    showNumberOfItems() {
        let itemsCounter = 0;
        const dataItems = document.querySelector("#list-container > ul").children;
        for(let i = 0; i < dataItems.length; i++) {
            if(!dataItems[i].classList.contains("hide")) {
                itemsCounter++;
            }
        }
        const message = document.createTextNode("Countries:" + itemsCounter),
              numOfItems = document.getElementById("number-of-items");
        numOfItems.innerHTML = "";
        numOfItems.appendChild(message);
    }

    //Search country by the name
    searchItem() {
        this.showAllItems("#list-container > ul");
        const request = {};
        const dataItems = document.querySelector("#list-container > ul").children;
        request.title = document.getElementById("search-input").value.toLowerCase();
        for(let key in this.countries.data) {
            const country = this.countries.data[key].title.toLowerCase();
            for(let j = 0; j < request.title.length; j++) {
                if(request.title[j] == country[j]) {

                } else {
                    dataItems[key].classList.add("hide");
                }
            }
            this.showNumberOfItems();
        }
    }

    //Handler on showmore click
    onClickShowCities(index) {
        this.showCitiesList("cities-list-container");
        for(let key in this.countries.data) {
            if(this.countries.data[index].title == this.cities.data[key].country) {
                this.cities.render(this.cities.data[key].cities);
            }
        }        
    }
}


class List {
    //Constructor
    constructor(domNode, options) {
        this.domNode = domNode;
        this.data = Object.assign({}, options);
        this.render(this.data);
    }

    //Render full list
    render(data) {
        this.domNode.innerHTML = "";
        this.listRoot = document.createElement('ul');
        for(let key in data) {
            this.addItem(data[key]);
        }
        this.domNode.appendChild(this.listRoot);
    }

    //Add item to the list
    addItem(item) {
        const listItem = document.createElement("li");
        listItem.innerHTML = item.hasOwnProperty("title") ? item.title : item;
        this.listRoot.appendChild(listItem);
    }  
}

const countriesData = [{title:"Ukraine"},
                    {title:"Spain"}, 
                    {title:"USA"},
                    {title:"Italy"},
                    {title:"France"}];

const citiesData = [{country:"Ukraine", cities:["Dnipro", "Kharkiv", "Kyjiw"]},
                    {country:"Spain", cities:["Madrid", "Barcelona", "Seville"]},
                    {country:"USA", cities:["Atlanta", "New York", "Washington", "Los Angeles"]},
                    {country:"Italy", cities:["Rome", "Milan", "Florence", "Venice", "Turin"]},
                    {country:"France", cities:["Paris", "Nice", "Marseille", "Lyon", "Nantes", "Lille"]}];



const cityListDestination = document.getElementById('cities-list-container');
const countryListDestination = document.getElementById('list-container');

const Cities = new List(cityListDestination, citiesData);
const Countries = new List(countryListDestination, countriesData);
const App = new Application(Countries, Cities);