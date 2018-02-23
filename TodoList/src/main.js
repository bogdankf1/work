class CountryList {
    
    //Constructor
    constructor(domNode, options) {
        this.counter = 0;
        this.domNode = domNode;
        Object.assign(this, options);
        this.data = [{title:"Wakanda", cities: ["City1", "City2", "City3"]} ,
                     {title:"Sakaar", cities: ["Town1", "Town2", "Town3"]}, 
                     {title:"USA", cities: ["One", "Two", "Three", "Four", "Five"]}];
        this.render();
        this.init();
    }

    //Render full list
    render(data){
        this.listRoot= document.createElement('ul');
        this.data.forEach(this.addItem.bind(this));
        this.domNode.appendChild(this.listRoot);
    }

    //Initialize all event handlers
    init() {
        document.getElementById('add-form').addEventListener("submit", (e) => {
            e.preventDefault();
            if(this.validateForm("add-input")) {
                this.receiveInputCountry();
                this.cleanForm("add-input");
            }
        });

        document.getElementById('all').addEventListener('click', () => {
            const allItems = document.querySelector("#list-container > ul").children;
            for(let i = 0; i < allItems.length; i++) {
                allItems[i].classList.remove("hide");
            }
        });
        
        document.getElementById('search').addEventListener('click', () => {
            this.toggleSearchForm();
        });

        document.getElementById("search-form").addEventListener("submit", (e) => {
            e.preventDefault();
            if(this.validateForm("search-input")) {
                this.searchItem();
                this.cleanForm("search-input");
                this.toggleSearchForm();
            }
        });
    }

    //Get data from add form
    receiveInputCountry() {
        const receivedItem = {};
        receivedItem.title = document.getElementById('add-input').value;
        receivedItem.cities = [];
        this.data.push(receivedItem);
        this.addItem(receivedItem);
    }

    //Bind on click handler to delete button
    bindShowMoreBtnHandler(showMoreButton, index) {
        const i = index;
        showMoreButton.addEventListener("click", (e) => {
            this.onClickShowMoreBtn(e, i);
        });
    }

    //Handler on delete button click
    onClickShowMoreBtn(e, index) {
        console.log("Cities in ", this.data[index].title, "are", this.data[index].cities);
        document.getElementById("cities-list-container").classList.toggle("hide");
        this.renderCitiesList(index);
    }

    //Add city to the cities list
    addCity(city) {
        const citiesListItem = document.createElement("li");
        citiesListItem.innerHTML = city;
        this.citiesListRoot.appendChild(citiesListItem);
    }

    //Render form to add cities 
    renderAddCityForm() {
        const addCityForm = document.createElement('form');
        const addCityInput = document.createElement('input');
        addCityInput.placeholder = "Add city to the country";
        addCityInput.id = "city-input";
        const addCitySubmit = document.createElement('input');
        addCitySubmit.type = "submit";
        addCitySubmit.style = "position: absolute; left: -9999px";
        addCityForm.appendChild(addCityInput);
        addCityForm.appendChild(addCitySubmit);
        document.getElementById("cities-list-container").appendChild(addCityForm);
    }

    //Bind submit handler to add city form
    bindAddCityHandler(index) {
        const i = index;
        document.getElementById("cities-list-container").addEventListener("submit", (e) => {
            e.preventDefault();
            if(this.validateForm("city-input")) {
                this.receiveInputCity(i);
                this.cleanForm("city-input");
            }
        });
    }

    //Receive input city from form
    receiveInputCity(index) {
        const receivedCity = document.getElementById("city-input").value;
        this.data[index].cities.push(receivedCity);
        console.log(this.data[index].title, " cities:", this.data[index].cities);
        this.addCity(receivedCity);
    }

    //Render cities list
    renderCitiesList(index) {
        document.getElementById("cities-list-container").innerHTML = "";

        this.renderAddCityForm();
        this.bindAddCityHandler(index);

        this.citiesListRoot = document.createElement("ul");
        this.data[index].cities.forEach(this.addCity.bind(this));
        document.getElementById("cities-list-container").appendChild(this.citiesListRoot);
    }

    //Add single item
    addItem(todoItem) {
        const listItem = document.createElement("div"),
              showMoreBtn = document.createElement("a"),
              showMoreBtnValue = document.createTextNode("+"), 
              itemTitle = document.createElement('li');

        itemTitle.innerHTML = todoItem.title;

        listItem.className = "item";
        showMoreBtn.className = "showmore-btn";

        showMoreBtn.appendChild(showMoreBtnValue);

        this.bindShowMoreBtnHandler(showMoreBtn, this.counter);

        listItem.appendChild(itemTitle);
        listItem.appendChild(showMoreBtn);

        this.listRoot.appendChild(listItem);
        this.showNumberOfItems();
        this.counter++;
    }

    //Validate add form to enter correct values
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

    //Clean add form
    cleanForm(id) {
        document.getElementById(id).value = "";
    }

    //Show number of items in ToDoList
    showNumberOfItems() {
        const message = document.createTextNode("Countries:" + this.data.length),
              numOfItems = document.getElementById("number-of-items");
        numOfItems.innerHTML = "";
        numOfItems.appendChild(message);
    }

    //Search country by the name
    searchItem(countryName) {
        const request = {};
        const dataItems = document.querySelector("#list-container > ul").children;
        request.title = document.getElementById("search-input").value;
        for(let i = 0; i < this.data.length; i++) {
            for(let j = 0; j < request.title.length; j++) {
                dataItems[i].classList.remove("hide");
                if(request.title[j] == this.data[i].title[j]) {
                    
                } else {
                    dataItems[i].classList.add("hide");
                }
            }
        }
    }

    //Show form for the search
    toggleSearchForm() {
        document.getElementById("search-container").classList.toggle("hide");
    }
}

const destination = document.getElementById('list-container');
const List = new CountryList(destination, {});
