// Load tasks on page load
document.addEventListener('DOMContentLoaded', fetchItems);
var totalBill  = document.getElementById("totalBill");
var billBtn = document.getElementById('billBtn');
var itemList = document.getElementById('item-list');
var t=0;

function fetchItems(){
 fetch('./items.json')
      .then(response => response.json())
      .then(data => {
        // Accessing values from the JSON
        const items = data.items;
 
        items.forEach(item => {
         
          console.log('Item ID:', item.id);
          createList(item.id,item.name,item.img,item.description,item.price);
        
        });
      })
    }

function createList(id,name,img,description,price){
   var itemBlock=`
      <li id="'l'+${id}" class="singleItem">
        <div class="">
          <img class="image" src="${img}" alt="">
          <div class="about">
            <p class="name">${name}</p>
            <p class="descr">${description}</p>
          </div>
        </div>
        <div class="price">
          <p class="price">Rs ${price}</p>
          <p class="buttons"> <button onclick="subItem('${id}','${price}')">-</button><input type="text" id="${id}" value="0" size="1" readonly> <button onclick="addItem('${id}','${price}')">+</button></p>
        </div>
     </li>`

     itemList.innerHTML+=itemBlock;
    }

   
var itemCounts = {};

function addItem(itemId,itemPrice) {
  if (!itemCounts[itemId]) {
    itemCounts[itemId] = 0;
  }
  itemCounts[itemId]++;
  t += Number(itemPrice); // Increment 
  console.log(itemPrice);
  updateCount(itemId,itemPrice);
  
  
}

function subItem(itemId,itemPrice) {
  if (itemCounts[itemId] && itemCounts[itemId] > 0) {
    t -= Number(itemPrice); // Increment
    itemCounts[itemId]--;
    updateCount(itemId,itemPrice);
   
  }
}

function updateCount(itemId,itemPrice) {
    document.getElementById('item' + itemId.charAt(itemId.length-1)).value = itemCounts[itemId];
  }

  billBtn.addEventListener('click',()=>{
  tHtml=`<p> Bill toh Rs ${t} hua he, dega kon ye btao`;
   totalBill.innerHTML=tHtml;

  })