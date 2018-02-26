window.ee = new EventEmitter();

class List {
    //Constructor
    constructor() {

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

    //Clean form from any values
    cleanForm(id) {
        document.getElementById(id).value = "";
    }

    //Remove hide class from list items
    removeHideClass() {
        const dataItems = document.querySelector("#list-container > ul").children;
        for(let i = 0; i < dataItems.length; i++) {
            dataItems[i].classList.remove("hide");
        }
    }

    //Add item to the list
    addItem(item) {
        const item = document.createElement("li");
        item.innerHTML = item;
    }
}

class CountryList extends List{
    //Constructor
    constructor(domNode, options) {
        super();
        this.counter = 0;
        this.domNode = domNode;
        Object.assign(this, options);
        this.data = [{title:"Ukraine"},
                    {title:"Spain"}, 
                    {title:"USA"},
                    {title:"Italy"},
                    {title:"France"}];
        this.render();
        this.init();
    }

    //Render full list
    render(data){
        this.listRoot= document.createElement('ul');
        this.data.forEach(this.addItem.bind(this));
        this.domNode.appendChild(this.listRoot);
        this.showNumberOfItems();
    }

    //Initialize all event handlers
    init() {
        document.getElementById('all').addEventListener('click', () => {
            window.ee.emit("hide-cities-list");

            this.showAllItems();
            this.showNumberOfItems();
        });

        document.getElementById("search-form").addEventListener("submit", (e) => {
            e.preventDefault();
            if(this.validateForm("search-input")) {
                this.searchItem();
            }
        });
    }

    //Show all list items
    showAllItems() {
        const allItems = document.querySelector("#list-container > ul").children;
        for(let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove("hide");
        }
    }

    //Bind on click handler to show cities
    bindShowCitiesHandler(listItem, index) {
        listItem.addEventListener("click", (e) => {
            window.ee.emit("show-cities-list", index, this.data[index].title);
        });
    }

    //Add single item
    addItem(todoItem) {
        const listItem = document.createElement("li");
        listItem.innerHTML = todoItem.title;

        this.bindShowCitiesHandler(listItem, this.counter);

        this.listRoot.appendChild(listItem);
        this.counter++;
    }

    //Show number of items
    showNumberOfItems() {
        let itemsCounter = 0;
        const dataItems = document.querySelector("#list-container > ul").children;
        for(let i = 0; i < this.data.length; i++) {
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
    searchItem(countryName) {
        this.removeHideClass();
        const request = {};
        const dataItems = document.querySelector("#list-container > ul").children;
        request.title = document.getElementById("search-input").value.toLowerCase();
        for(let i = 0; i < this.data.length; i++) {
            const country = this.data[i].title.toLowerCase();
            for(let j = 0; j < request.title.length; j++) {
                if(request.title[j] == country[j]) {

                } else {
                    dataItems[i].classList.add("hide");
                }
            }
            this.showNumberOfItems();
        }
    }    
}

class CityList extends List{

    //Constructor
    constructor(domNode, options) {
        super();
        this.domNode = domNode;
        Object.assign(this, options);
        this.citiesData = [["Dnipro", "Kharkiv", "Kyjiw"],
                        ["Madrid", "Barcelona", "Seville"],
                        ["Atlanta", "New York", "Washington", "Los Angeles"],
                        ["Rome", "Milan", "Florence", "Venice", "Turin"],
                        ["Paris", "Nice", "Marseille", "Lyon", "Nantes", "Lille"]];
        this.init();
    }

    //Initialize all event handlers
    init() {
        window.ee.addListener("show-cities-list", (i, countryTitle) => {
            this.onClickShowCities(i, countryTitle);
        });

        window.ee.addListener("hide-cities-list", () => {
            this.hideCitiesList();
        });
    }

    //Render cities list
    render(index, country) {
        this.domNode.innerHTML = "";
        const citiesHeader = document.createElement("h4");
        citiesHeader.innerHTML = `${country} cities:`;

        this.citiesListRoot = document.createElement("ul");
        this.citiesData[index].forEach(this.addCity.bind(this));
        this.domNode.appendChild(citiesHeader);
        this.domNode.appendChild(this.citiesListRoot);
    }

    //Hide cities list
    hideCitiesList() {
        document.getElementById("cities-list-container").classList.add("hide");
    }

    //Handler on delete button click
    onClickShowCities(index, countryTitle) {
        document.getElementById("cities-list-container").classList.remove("hide");
        this.render(index, countryTitle);        
    }

    //Add city to the cities list
    addCity(city) {
        const citiesListItem = document.createElement("li");
        citiesListItem.innerHTML = city;
        this.citiesListRoot.appendChild(citiesListItem);
    }
}

const cityListDestination = document.getElementById('cities-list-container');
const Cities = new CityList(cityListDestination, {});

const countryListDestination = document.getElementById('list-container');
const Countries = new CountryList(countryListDestination, {});
