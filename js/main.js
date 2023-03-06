const content = document.getElementById('content')
window.onload = function ()
{
/***  store data in local storage and display it ***/
let allProducts = [];
    localStorage.products != null ? allProducts = JSON.parse(localStorage.products) : allProducts = []
function storeDate()
{
    for (let i = 0; i < Products.length; i++)
    {
        content.innerHTML +=  `  
                                <div class="product-card" >
                                    <div class="card-image" >
                                        <img src="${Products[i].productImage}" alt=" product image " >
                                    </div>
                                    <div class="product-details" >
                                        <p class="product-name" > ${Products[i].productName}  </p>
                                        <p class="product-price" > ${Products[i].productPrice} </p>
                                        <button class="addToCart" >Add to Cart </button>
                                    </div>
                                </div>
                            `  
        localStorage.setItem('products', JSON.stringify(Products));
    }
}

storeDate()
/*** start display quick view model  ***/
/*** end display quick view model  ***/
/*** start store products at cart  ***/
const addToCartBtn = document.getElementsByClassName('addToCart');

let items = [];
for (let i = 0; i < addToCartBtn.length; i++)
{
        addToCartBtn[i].addEventListener("click", function (e)
        {
				let item = {
						id:i,
                        name: e.target.parentElement.children[0].textContent,
                        price:e.target.parentElement.children[1].textContent,
						no:1
					};
                if (JSON.parse(localStorage.getItem('items')) === null)
                {
					items.push(item);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
                }
                else
                {
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data=>{
						if(item.id == data.id){
							item.no = data.no + 1;
						}else{
							items.push(data);
						}
					});
					items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
					window.location.reload();
            }
        });
}
/*** end store products at cart ***/ 
/*** start adding data to shopping cart  ***/ 
	const iconAddCart = document.querySelector('.add-cart p');
	let no = 0;
	JSON.parse(localStorage.getItem('items')).map(data=>{
        no = no + data.no;
    });
	iconAddCart.innerHTML = no;

/*** end adding data to shopping cart ***/
/*** start view model cart  ***/
const iconShopping = document.querySelector('.add-cart');
const cartCloseBtn = document.querySelector('.fa-close');
const cartBox = document.querySelector('.cartBox');
iconShopping.addEventListener("click", function () {
    cartBox.classList.add('active');
});
cartCloseBtn.addEventListener("click", function () {
    cartBox.classList.remove('active');
});
/*** end view model cart ***/
//adding cartbox data in table
const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="5">No items found</td></tr>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			tableData += '<tr><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
		});
	}
	cardBoxTable.innerHTML = tableData;

}