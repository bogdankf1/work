class ToDoList {
    
    //Constructor
    constructor(domNode, options) {
        this.counter = 0;
        this.domNode = domNode;
        Object.assign(this, options);
    this.data = [{title:"test1"/*, status: "active"*/}];
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
            if(this.validateForm()) {
                this.receiveInputData();
                this.cleanForm();
            }
        });

        document.getElementById('all').addEventListener('click', () => {
            const allItems = document.querySelector("#list-container > ul").children;
            for(let i = 0; i < allItems.length; i++) {
                allItems[i].classList.remove("hide");
            }
        });

        document.getElementById('completed').addEventListener('click', () => {
            const completedItems = document.querySelector("#list-container > ul").children;
            for(let i = 0; i < completedItems.length; i++) {
                completedItems[i].classList.remove("hide");
                if(!completedItems[i].hasAttribute("completed")) {
                    completedItems[i].classList.add("hide");
                }
            }
        });

        document.getElementById('active').addEventListener('click', () => {
            const activeItems = document.querySelector("#list-container > ul").children;
            for(let i = 0; i < activeItems.length; i++) {
                activeItems[i].classList.remove("hide");
                if(activeItems[i].hasAttribute("completed")) {
                    activeItems[i].classList.add("hide");
                }
            }
        }); 
    }

    //Get data from add form
    receiveInputData() {
        const receivedItem = {};
        receivedItem.title = document.getElementById('input-item').value;
        // receivedItem.status = "active";
        this.data.push(receivedItem);
        this.addItem(receivedItem);
    }

    //Handler on check button click
    onClickCheckBtn(e) {
        const item = e.target.parentNode;
        if(item.hasAttribute("completed")) {
            this.cancelItem(item);
        } else {
            this.selectItem(item);
        }
    }

    //Cancel selected item
    cancelItem(item) {
        item.firstChild.innerHTML = "☐";
        item.children[1].style = "text-decoration:none";
        item.removeAttribute('completed');
    }

    //Select clicked item
    selectItem(item) {
        item.firstChild.innerHTML = "☑";
        item.children[1].style = "text-decoration:line-through";
        item.setAttribute('completed', true);
    }

    //Bind on click handler to check button
    bindCheckBtnHandler(checkButton) {
        checkButton.addEventListener("click", (e) => {
            this.onClickCheckBtn(e);
        });
    }

    //Bind on click handler to delete button
    bindDeleteBtnHandler(deleteButton, deleteIndex) {
        const index = deleteIndex;
        deleteButton.addEventListener("click", (e) => {
            this.onClickDeleteBtn(e, index);
        });
    }

    //Handler on delete button click
    onClickDeleteBtn(e, index) {
        this.deleteItem(e, arguments[1]);
        this.showNumberOfItems();
    }

    //Delete selected item
    deleteItem(e, index) {
        console.log("Deleted data item:", this.data.splice(index, 1));
        this.listRoot.removeChild(e.target.parentNode);
    }

    //Add single item
    addItem(todoItem) {
        const listItem = document.createElement("div"),
              checkBtn = document.createElement("a"),
              deleteBtn = document.createElement("a"),
              checkBtnValue = document.createTextNode("☐"),
              deleteBtnValue = document.createTextNode("X"), 
              itemTitle = document.createElement('li');

        itemTitle.innerHTML = todoItem.title;

        listItem.className = "item";
        deleteBtn.className = "delete-btn";
        checkBtn.className = "check-btn";

        deleteBtn.appendChild(deleteBtnValue);
        checkBtn.appendChild(checkBtnValue);
        
        const deleteIndex = this.counter;

        this.bindCheckBtnHandler(checkBtn);
        this.bindDeleteBtnHandler(deleteBtn, deleteIndex);

        listItem.appendChild(checkBtn);
        listItem.appendChild(itemTitle);
        listItem.appendChild(deleteBtn);

        this.listRoot.appendChild(listItem);
        this.showNumberOfItems();
        this.counter++;
    }

    //Validate add form to enter correct values
    validateForm() {
        document.getElementById('input-item').onkeyup = function () {
            if (this.value.match(/^[ ]+$/)) {
                this.value = '';
            }
        }
        if(!document.getElementById('input-item').value) {
            return false;
        }
        return true;
    }

    //Clean add form
    cleanForm() {
        document.getElementById("input-item").value = "";
    }

    //Show number of items in ToDoList
    showNumberOfItems() {
        const message = document.createTextNode("Items:" + this.data.length),
              numOfItems = document.getElementById("number-of-items");
        numOfItems.innerHTML = "";
        numOfItems.appendChild(message);
    }
}

const destination = document.getElementById('list-container');
const List = new ToDoList(destination, {});