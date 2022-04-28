const inventoryDisplayTable = document.querySelector("tbody");
const submitButton = document.querySelector("#submit");
const newItemForm = document.querySelector("form");
const nextButton = document.querySelector("#next");
const previousButton = document.querySelector("#previous");
const itemNameInput = document.querySelector("#item-name");
const itemQualityInput = document.querySelector("#item-quality");

itemNameInput.addEventListener("input", event => {
	if (itemNameInput.value.toLowerCase().includes("sulfuras")) {
		itemQualityInput.value = 80;
		itemQualityInput.max = 80;
		itemQualityInput.min = 80;
	} else {
		itemQualityInput.max = 50;
		itemQualityInput.min = 0;
	}
})

let itemInformation = {};
let itemDisplayArray = [];
newItemForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    
    itemInformation = {
        itemName: formData.get("item-name"),
        itemSellIn: +formData.get("item-sell-in"),
        itemQuality: +formData.get("item-quality"),
        itemCategory: getCategory(formData.get("item-name"))
    }
    itemDisplayArray.push(itemInformation);

    const newInventoryItem = document.createElement("tr");
    newInventoryItem.innerHTML = `
        <td class="item-name">${itemInformation.itemName}</td>
        <td class="item-sell-in">${itemInformation.itemSellIn}</td>
        <td>${itemInformation.itemQuality}</td>
    `
    newInventoryItem.classList.add("custom-inventory-item");
    inventoryDisplayTable.append(newInventoryItem);
})

function getCategory(itemName) {
    if (itemName.includes("Aged Brie")) {
        return "aged"
    } else if (itemName.includes("Backstage")) {
        return "backstage"
    } else if (itemName.includes("Sulfuras")) {
        return "sulfuras"
    } else if (itemName.includes("Conjured")) {
        return "conjured"
    } else 
        return "none"
}

nextButton.addEventListener("click", () => {
    nextDayQuality();
    subtractValues(); 
})

function subtractValues() {
    itemDisplayArray.forEach(object => {
        const newInventoryItem = document.querySelector(".custom-inventory-item");
        newInventoryItem.innerHTML = `
        <td class="item-name">${object.itemName}</td>
        <td class="item-sell-in">${(object.itemSellIn - 1)}</td>
        <td>${object.itemQuality}</td>
        `
        object.itemSellIn--;
        inventoryDisplayTable.append(newInventoryItem);
    })
}

function nextDayQuality () {
    itemDisplayArray.forEach(object => {
        if (object.itemCategory == "none") {
            let calculatedQuality = object.itemQuality - 1
            object.itemQuality--
            return calculatedQuality
        }
        if (object.itemCategory == "aged") {
            let calculatedQuality = object.itemQuality + 1
            object.itemQuality++
            return calculatedQuality
        } 
        if (object.itemCategory == "backstage") {
            return "What the fuck"
        }
        if (object.itemCategory == "conjured") {
            let calculatedQuality = object.itemQuality - 2
            object.itemQuality--
            object.itemQuality--
            return calculatedQuality
        }
        if (object.itemCategory == "sulfuras") {
            return object.itemQuality = 80;
        }
    })
}

previousButton.addEventListener("click", () => {
    addValues();
})

function addValues() {
    itemDisplayArray.forEach(object => {
        const newInventoryItem = document.querySelector(".custom-inventory-item");
        newInventoryItem.innerHTML = `
        <td class="item-name">${object.itemName}</td>
        <td class="item-sell-in">${(object.itemSellIn + 1)}</td>
        <td>${object.itemQuality}</td>
        `
        object.itemSellIn++;
        inventoryDisplayTable.append(newInventoryItem);
    })
}
