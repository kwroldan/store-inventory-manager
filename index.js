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

function nextDayQuality () {
    itemDisplayArray.forEach(object => {
        if (object.itemCategory == "aged") {
            let calculatedQuality = object.itemQuality + 1
            object.itemQuality++
            object.itemQuality = checkQualityNumber(calculatedQuality)
        } else if (object.itemCategory == "backstage") {
            if (object.itemSellIn > 10) {
                let calculatedQuality = object.itemQuality + 1;
                object.itemQuality++
                return calculatedQuality
            } else if (object.itemSellIn <= 10 && object.itemSellIn > 5) {
                let calculatedQuality = object.itemQuality + 2;
                object.itemQuality++
                object.itemQuality++
                return calculatedQuality
            } else if (object.itemSellIn <= 5 && object.itemSellIn > 0) {
                let calculatedQuality = object.itemQuality + 3;
                object.itemQuality++
                object.itemQuality++
                object.itemQuality++
                return calculatedQuality;
            } else if (object.itemSellIn <= 0) {
                return object.itemQuality = 0
            }
        } else if (object.itemCategory == "conjured") {
            if (object.itemSellIn > 0) {
                let calculatedQuality = object.itemQuality - 2
                object.itemQuality--
                object.itemQuality--
                object.itemQuality = checkQualityNumber(calculatedQuality)
                return calculatedQuality
            } else {
                let calculatedQuality = object.itemQuality - 4
                object.itemQuality--
                object.itemQuality--
                object.itemQuality--
                object.itemQuality--
                object.itemQuality = checkQualityNumber(calculatedQuality)
                return calculatedQuality
            }
        } else if (object.itemCategory == "sulfuras") {
            return object.itemQuality;
        } else {
            if (object.itemSellIn > 0) {
                let calculatedQuality = object.itemQuality - 1
                object.itemQuality--
                object.itemQuality = checkQualityNumber(calculatedQuality)
            } else {
                let calculatedQuality = object.itemQuality - 2
                object.itemQuality--
                object.itemQuality--
                object.itemQuality = checkQualityNumber(calculatedQuality)
            }
        }
    })
}

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

function checkQualityNumber(calculatedQualityNumber) {
    if (calculatedQualityNumber > 50) {
        return 50
    } else if (calculatedQualityNumber < 0) {
        return 0
    } else {
        return calculatedQualityNumber
    }
}

previousButton.addEventListener("click", () => {
    previousDayQuality();
    addValues();
})

function previousDayQuality() {
    itemDisplayArray.forEach(object => {
        if (object.itemCategory == "aged") {
                let calculatedQuality = object.itemQuality - 1
                object.itemQuality--
                object.itemQuality = checkQualityNumber(calculatedQuality)
        } else if (object.itemCategory == "backstage") {
            if (object.itemSellIn > 10) {
                let calculatedQuality = object.itemQuality - 1;
                object.itemQuality--
                return calculatedQuality
            } else if (object.itemSellIn <= 10 && object.itemSellIn > 5) {
                let calculatedQuality = object.itemQuality - 2;
                object.itemQuality--
                object.itemQuality--
                return calculatedQuality
            } else if (object.itemSellIn <= 5 && object.itemSellIn > 0) {
                let calculatedQuality = object.itemQuality - 3;
                object.itemQuality--
                object.itemQuality--
                object.itemQuality--
                return calculatedQuality;
            } else if (object.itemSellIn <= 0) {
                return object.itemQuality = 0
            }
        } else if (object.itemCategory == "conjured") {
            if (object.itemSellIn >= 0) {
                let calculatedQuality = object.itemQuality + 2
                object.itemQuality++
                object.itemQuality++
                object.itemQuality = checkQualityNumber(calculatedQuality)
                return calculatedQuality
            } else {
                let calculatedQuality = object.itemQuality + 4
                object.itemQuality++
                object.itemQuality++
                object.itemQuality++
                object.itemQuality++
                object.itemQuality = checkQualityNumber(calculatedQuality)
                return calculatedQuality
            }
        } else if (object.itemCategory == "sulfuras") {
            return object.itemQuality;
        } else {
            if (object.itemSellIn > 0) {
                let calculatedQuality = object.itemQuality + 1
                object.itemQuality++
                object.itemQuality = checkQualityNumber(calculatedQuality)
            } else {
                let calculatedQuality = object.itemQuality + 2
                object.itemQuality++
                object.itemQuality++
                object.itemQuality = checkQualityNumber(calculatedQuality)
            }
        }
    })
}

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
