window.ee = new EventEmitter();

class List {
    //Constructor
    constructor(domNode, options) {
        this.domNode = domNode;
        Object.assign(this, options);
    }

    //Render full list
    render() {
        this.listRoot= document.createElement('ul');
        this.data.forEach(this.addItem.bind(this));
        this.domNode.appendChild(this.listRoot);
    }

    //Add item to the list
    addItem(itemTitle) {
        const item = document.createElement("li");
        item.innerHTML = itemTitle;
        this.listRoot.appendChild(item);
        return item;
    }

    //***************** To class component ************

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
    hideAllItems(selector) {
        const dataItems = document.querySelector(selector).children;
        for(let i = 0; i < dataItems.length; i++) {
            dataItems[i].classList.remove("hide");
        }
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
}

class CountryList extends List{
    //Constructor
    constructor(domNode) {
        super();
        this.counter = 0;
        this.domNode = domNode;
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
        super.render();
        this.showNumberOfItems();
    }

    //Initialize all event handlers
    init() {
        document.getElementById('all').addEventListener('click', () => {
            window.ee.emit("hide-cities-list");
            this.showAllItems("#list-container > ul");
            this.showNumberOfItems();
        });

        document.getElementById("search-form").addEventListener("submit", (e) => {
            e.preventDefault();
            if(this.validateForm("search-input")) {
                this.searchItem();
            }
        });
    }

    //Add single item
    addItem(todoItem) {
        const listItem = super.addItem(todoItem.title);
        this.bindShowCitiesHandler(listItem, this.counter);
        this.counter++;
    }

    //Bind on click handler to show cities
    bindShowCitiesHandler(listItem, index) {
        listItem.addEventListener("click", (e) => {
            window.ee.emit("show-cities-list", index, this.data[index].title);
        });
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
        this.hideAllItems("#list-container > ul");
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
    constructor(domNode) {
        super();
        this.domNode = domNode;
        this.citiesData = [["Dnipro", "Kharkiv", "Kyjiw"],
                        ["Madrid", "Barcelona", "Seville"],
                        ["Atlanta", "New York", "Washington", "Los Angeles"],
                        ["Rome", "Milan", "Florence", "Venice", "Turin"],
                        ["Paris", "Nice", "Marseille", "Lyon", "Nantes", "Lille"]];
        this.init();
    }

    //Render cities list
    render(index, country) {
        this.domNode.innerHTML = "";
        const citiesHeader = document.createElement("h4");
        citiesHeader.innerHTML = `${country} cities:`;

        this.listRoot = document.createElement("ul");
        this.citiesData[index].forEach(this.addItem.bind(this));
        this.domNode.appendChild(citiesHeader);
        this.domNode.appendChild(this.listRoot);
    }

    //Initialize all event handlers
    init() {
        window.ee.addListener("show-cities-list", (i, countryTitle) => {
            this.onClickShowCities(i, countryTitle);
        });

        window.ee.addListener("hide-cities-list", () => {
            this.hideCitiesList("cities-list-container");
        });
    }

    //Handler on delete button click
    onClickShowCities(index, countryTitle) {
        this.showCitiesList("cities-list-container");
        this.render(index, countryTitle);        
    }
}

const cityListDestination = document.getElementById('cities-list-container');
const Cities = new CityList(cityListDestination, {});

const countryListDestination = document.getElementById('list-container');
const Countries = new CountryList(countryListDestination, {});
