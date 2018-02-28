function getDataFromAddForm() {
    return document.getElementById('input-item').value;
}

function createListItem(item) {
    const itemBlock = document.createElement("div"), 
          listItem = document.createElement("li"),
          itemValue = document.createTextNode(item),
          checkBtn = document.createElement("a"),
          checkBtnValue = document.createTextNode("☐")
          deleteBtn = document.createElement("a"),
          deleteBtnValue = document.createTextNode("X");
    itemBlock.className = "item";
    deleteBtn.className = "delete-btn";
    deleteBtn.appendChild(deleteBtnValue);
    checkBtn.className = "check-btn";
    checkBtn.appendChild(checkBtnValue);
    listItem.appendChild(itemValue);
    itemBlock.appendChild(checkBtn);
    itemBlock.appendChild(listItem);
    itemBlock.appendChild(deleteBtn);
    return itemBlock;
}

function selectItem() {

}

function onClickCheckBtn(e) {
    const item = e.target.parentNode;
    if(item.hasAttribute("completed")) {
        item.firstChild.innerHTML = "☐";
        item.children[1].style = "text-decoration:none";
        item.removeAttribute('completed');
        item.setAttribute('active', true);
    } else {
        item.firstChild.innerHTML = "☑";
        item.children[1].style = "text-decoration:line-through";
        item.setAttribute('completed', true);
        item.removeAttribute('active');
    }
}

function onClickDeleteBtn(e) {
    e.target.parentNode.remove();
    
    showNumberOfItems();
}

function addItemToList(listItem) {
    listItem.firstChild.addEventListener("click", function(e) {
        onClickCheckBtn(e);
    });
    listItem.lastChild.addEventListener("click", function(e) {
        onClickDeleteBtn(e);
    });
    listItem.setAttribute('active', true);
    document.getElementById('list').appendChild(listItem);

    showNumberOfItems();
}

function cleanFormAfterAdding() {
    document.getElementById("input-item").value = "";
}

function validateAddForm() {
    document.getElementById('input-item').onkeyup = function () {
        if (this.value.match(/^[ ]+$/)) {
            this.value = ''
        }
    }
    if(!document.getElementById('input-item').value) {
        return false;
    }
    return true;
}

function showNumberOfItems() {
    const listLength = document.getElementById("list").children.length,
          message = document.createTextNode("Items:" + listLength),
          numOfItems = document.getElementById("number-of-items");
    numOfItems.innerHTML = "";
    numOfItems.appendChild(message);
}

document.getElementById('add-form').addEventListener("submit", function(e) {
    e.preventDefault();
    if(validateAddForm()) {
        addItemToList(createListItem(getDataFromAddForm()));
        cleanFormAfterAdding();
    }
});



const allItems = document.getElementById('list').children;

document.getElementById('all').addEventListener('click', function() {
    for(let i = 0; i < allItems.length; i++) {
        allItems[i].style = "display:inline";
    }
});

document.getElementById('completed').addEventListener('click', function() {
    for(let i = 0; i < allItems.length; i++) {
        if(!allItems[i].hasAttribute('completed')) {
            allItems[i].style = "display:none";
        }
    }
});

document.getElementById('active').addEventListener('click', function() {
    for(let i = 0; i < allItems.length; i++) {
        allItems[i].style = "display:inline";
        if(!allItems[i].hasAttribute('active')) {
            allItems[i].style = "display:none";
        }
    }
});


///////////
//filter(action, listItem) {
    //     if(!listItem) {
    //         // console.log("listItem:", listItem);
    //         for(let key in this.data){
    //             this.data[key].visibility = action === "show" ? true : false; 
    //         }
    //         this.render(this.data);
    //     } else {
    //         console.log("listItem:", listItem);
    //         listItem.visibility = action === "show" ? true : false;
    //         console.log("listItem:", listItem);
    //         this.render(listItem);
    //     }
    // }