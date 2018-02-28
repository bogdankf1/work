class Application {
    //Run application
    run(countries, cities) {
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
            this.validateForm("search-input") && this.searchItem();
        });
    }

    //Bind onclick handler to 'show all items' button
    bindAllItemsHandler() {
        document.getElementById('all').addEventListener('click', () => {
            // this.cities.filter("show");
            this.cities.filter("hide", "add", document.querySelector("#cities-list-container"));
            // this.countries.filter("show");
            for(let i = 0; i < document.querySelector("#list-container > ul").children.length; i++) {
                this.countries.filter("hide", "remove", document.querySelector("#list-container > ul").children[i]);
            }
            this.showNumberOfItems();
        });
    }

    //Bind on click handler to show cities
    bindShowCitiesHandler() {
        for(let i = 0; i < document.querySelector("#list-container > ul").children.length; i++) {
            document.querySelector("#list-container > ul").children[i].addEventListener("click", () => {
                this.onClickShowCities(i);
            });
        }
    }

    //Handler on showmore click
    onClickShowCities(index) {
        // this.cities.filter("show");
        this.cities.filter("hide", "remove", document.querySelector("#cities-list-container"));

        for(let key in this.countries.data) {
            if(this.countries.data[index].title == this.cities.data[key].country) {
                this.cities.render(this.cities.data[key].cities);
            }
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

    //Show number of items
    showNumberOfItems() {
        let itemsCounter = 0;
        const dataItems = document.querySelector("#list-container > ul").children;
        for(let i = 0; i < dataItems.length; i++) {
            !dataItems[i].classList.contains("hide") && itemsCounter++;
        }
        const message = document.createTextNode("Countries:" + itemsCounter),
              numOfItems = document.getElementById("number-of-items");
        numOfItems.innerHTML = "";
        numOfItems.appendChild(message);
    }

    //Search country by the name
    searchItem() {
        const request = {};
        request.title = document.getElementById("search-input").value.toLowerCase();
        // this.countries.filter("show");
        for(let key in this.countries.data) {
            this.countries.filter("hide", "remove", document.querySelector("#list-container > ul").children[key]);

            const country = this.countries.data[key].title.toLowerCase();
            for(let j = 0; j < request.title.length; j++) {
                if(!(request.title[j] == country[j])) {
                    // this.countries.filter("show", this.countries.data[key]);
                    this.countries.filter("hide", "add", document.querySelector("#list-container > ul").children[key]);
                }
            }
            this.showNumberOfItems();
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
            if(data[key].hasOwnProperty("visibility")) {
               data[key].visibility === true && this.addItem(data[key]);
            } else {
                this.addItem(data[key]);
            }
        }
        this.domNode.appendChild(this.listRoot);
    }

    //Add item to the list
    addItem(item) {
        const listItem = document.createElement("li");
        listItem.innerHTML = item.hasOwnProperty("title") ? item.title : item;
        this.listRoot.appendChild(listItem);
    } 
    
    //Filter list items 
    filter(className, action, domItem) {
        action === "remove" ? 
        domItem.classList.remove(className) :
        domItem.classList.add(className);
    }
}

//DATA
const countriesData = [{title:"Ukraine"},
                    {title:"Spain"}, 
                    {title:"USA"},
                    {title:"Italy"},
                    {title:"France"},
                    {title:"China"}];

const citiesData = [{country:"Ukraine", cities:["Dnipro", "Kharkiv", "Kyjiw"]},
                    {country:"Spain", cities:["Madrid", "Barcelona", "Seville"]},
                    {country:"USA", cities:["Atlanta", "New York", "Washington", "Los Angeles"]},
                    {country:"Italy", cities:["Rome", "Milan", "Florence", "Venice", "Turin"]},
                    {country:"France", cities:["Paris", "Nice", "Marseille", "Lyon", "Nantes", "Lille"]},
                    {country:"China", cities:["Guangzhou", "Shenzhen", "Tianjin", "Shanghai"]}];



const cityListDestination = document.getElementById('cities-list-container');
const countryListDestination = document.getElementById('list-container');

const Cities = new List(cityListDestination, citiesData);
const Countries = new List(countryListDestination, countriesData);
const App = new Application();

App.run(Countries, Cities);