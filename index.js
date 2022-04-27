const inventoryDisplayTable = document.querySelector("tbody");
const submitButton = document.querySelector("#submit");
const newItemForm = document.querySelector("form");

newItemForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    
    const itemInformation = {
        itemName: formData.get("item-name"),
        itemSellIn: formData.get("item-sell-in"),
        itemQuality: formData.get("item-quality")
    }

    const newInventoryItem = document.createElement("tr");
    newInventoryItem.innerHTML = `
        <td class="item-category">${itemInformation.itemName}</td>
        <td>${itemInformation.itemSellIn}</td>
        <td>${itemInformation.itemQuality}</td>
    `
    inventoryDisplayTable.append(newInventoryItem);
})

function checkItemQuality(itemObject){
    
}