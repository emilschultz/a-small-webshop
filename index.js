// PRODUCTS SECTION
const alleProdukter = document.querySelector('#products');

// ARRAY MED HVERT PRODUKT SOM OBJEKT
const products = [
    {
        name: 'Wrenches',
        image: './images/wrench.jpg',
        alt: 'An adjustable wrench next to a railroad wrench',
        description: 'Some beautiful wrenches.',
        price: 100,
        inCart: 0,
        id: "produkt01"
    },
    {
        name: 'Tape Measure',
        image: './images/tape-measure.jpg',
        alt: 'Old tape measure in a round case',
        description: 'Measure all you want. Up to 2m.',
        price: 80,
        inCart: 0,
        id: "produkt02"
    },
    {
        name: 'Drills',
        image: './images/drills.jpg',
        alt: 'Three masonry drill bits in different sizes',
        description: 'This IS a drill.',
        price: 35,
        inCart: 0,
        id: "produkt03"
    },
    {
        name: 'Double Head Wrenches',
        image: './images/double-head-wrench.jpg',
        alt: 'Two double head wrenches in different sizes',
        description: 'These are double head wrenches.',
        price: 20,
        inCart: 0,
        id: "produkt04"
    },
    {
        name: 'Bits',
        image: './images/bits.jpg',
        alt: 'Six different types of bits, with different heads and in different sizes',
        description: 'Really great bits.',
        price: 40,
        inCart: 0,
        id: "produkt05"
    },
    {
        name: 'Hammer',
        image: './images/hammer.jpg',
        alt: 'Old and worn hammer with a large flat head and a smaller rounded head',
        description: 'Nails it every time.',
        price: 125,
        inCart: 0,
        id: "produkt06"
    }
];

// OPRETTER PRODUKT FOR HVERT ENKELT OBJEKT
products.forEach(item => {
    alleProdukter.innerHTML += `
        <section class="product-container">
            <img class="product-img" src='${item.image}' alt="${item.alt}">
            <button id="${item.id}" class="add-button">Add to cart </button>
        </section>    
                
        <section class="product-text">
            <h2 class="product-name" >${item.name}</h2>
            <p class="product-description">${item.description}</p>
            <p class="product-price">${item.price} kr</p>
        </section>    
    `
});

// CART 
const CART = [];

// QUERY
const cartSection = document.querySelector('#cart-section');
const itemAdded = document.querySelector('.cart-item-added')
const itemInCart = document.querySelector('.cart-item');
const imageInCart = document.querySelector('.in-cart-image');
const titleInCart = document.querySelector('.cart-item-title');
const priceInCart = document.querySelector('.cart-price');
const qtyInCart = document.querySelector('.cart-qty-count');
const totalInCart = document.querySelector('.cart-total');
const cartSum = document.querySelector('.cart-sum');
const cartTotalSum = document.querySelector('.cart-total-sum');
const addToCartButton = document.querySelectorAll('.add-button');
const removeBtn = document.querySelectorAll('.btn-remove');


// ADD PRODUCT TO CART
function addItem(event) {
    // Bruger .find() til at finde frem til id'et på det objekt jeg klikker på og pusher dette til CART
    const productFound = products.find(product => product.id === event.target.id)
    let image = productFound.image
    let name = productFound.name
    let price = productFound.price
    let id = productFound.id

    for (let i = 0; i < CART.length; i++ ) {
        if(CART[i].name === name) { // hvis jeg tilføjer et item der allerede er i cart, vil quantity + 1
            CART[i].qty += 1
            showItems();
            return 
        }
    }

    let item = {
        image,
        name,
        price,
        qty: 1,
        id 
    }
    CART.push(item);
    showItems();
}

// ADD TO CART BUTTON 
for (let i = 0; i < addToCartButton.length; i++) {
     let button = addToCartButton[i];
     button.addEventListener('click', addItem)
}

// SHOW NEW ITEM IN CART
function showItems() {

    let showItem = '';
    
    for(let i = 0; i < CART.length; i++) {
        showItem += `
            <section class="new-item-in-cart">
                <div  class="cart-item cart-divider"> 
                    <img class="in-cart-image" src='${CART[i].image}'>

                    <div class="cart-item-title">
                        <h2 class="each-row-title">${CART[i].name}</h2>
                    </div>
                </div>

                <div class="cart-price cart-divider">
                    <h2 class="each-row-title">${CART[i].price}kr</h2>
                </div>

                <div class="cart-quantity cart-divider">
                    <h2 class="cart-qty-count each-row-title">${CART[i].qty}</h2>
                    <button id="remove${[i]}" class="btn-remove" type="button">Remove</button>
                </div>

                <div class="cart-total cart-divider">
                    <h2 class="cart-total each-row-title">${CART[i].price * CART[i].qty} kr</h2>
                </div>
            </section>   
        `
    }
    itemAdded.innerHTML = showItem

    // REMOVE BUTTON
    const removeBtn = document.querySelectorAll('.btn-remove');

    for (let i= 0; i < removeBtn.length; i++) {
        let rmvBtn = removeBtn[i];
        rmvBtn.addEventListener('click', removeItem)
    }
}

// ANTAL AF HVER VARE I KURVEN
function getQty() {
    let qty = 0;
    for(let i = 0; i < CART.length; i++) {
        qty += CART[i].qty
    }
    return qty // Funktionen getQty returnerer qty hver gang jeg skal have qty i min CART
}

// TOTAL
function getTotal() {
    let total = 0;
    for(let i = 0; i < CART.length; i++) {
        total += CART[i].price * CART[i].qty
    }
    return total
}

//SHOW CART TOTAL ITEMS IN HEADER
const cartSpan = document.querySelector('.cart-counter');

function cartCounter () {
    const count = getQty();

        let showCount = '';
            showCount += 
            `<span>${count}</span>`
    cartSpan.innerHTML = showCount

    for (let i = 0; i < addToCartButton.length; i++) {
        let button = addToCartButton[i];
        button.addEventListener('click', cartCounter)
   }

   const removeBtn = document.querySelectorAll('.btn-remove');
   
   for (let i= 0; i < removeBtn.length; i++) {
        let rmvBtn = removeBtn[i];
        rmvBtn.addEventListener('click', cartCounter)
    }
}
cartCounter()

// TOTAL VALUE SUM
function showTotalSum() {
    const total = getTotal();
    
        let showSum = '';
            showSum += 
                `<h1>${total} kr</h1>`
            
    cartTotalSum.innerHTML = showSum

    for (let i = 0; i < addToCartButton.length; i++) {
        let button = addToCartButton[i];
        button.addEventListener('click', showTotalSum)
   }

   const removeBtn = document.querySelectorAll('.btn-remove');
   
   for (let i= 0; i < removeBtn.length; i++) {
    let rmvBtn = removeBtn[i];
    rmvBtn.addEventListener('click', showTotalSum)
    }
}
showTotalSum()

// FJERN FRA CART
function removeItem(event) {
// Variabelen index tager event.target sin id som er remove og så et index alt efter hvilken knap der er tale // om. Herefter deler vi den specifikke id'en op og fjerner 'remove'. Nu har vi kun indeks tilbage, men som 
// en string. Derfor bruger vi 'Number' til at starte med, for at lave den om til et tal.
// Så bruger vi .splice() til at fjerne det andet ([1]) element som er index sit number og fjerner én.
let index = Number(event.target.id.split("remove")[1])
CART.splice(index, 1) // .splice starter på index i og fjerner ét produkt (hvis man har valgt to af et produkt fjerner den begge. Den fjerner hele elementet.
showItems()
}