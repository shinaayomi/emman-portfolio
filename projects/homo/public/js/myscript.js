getNumberOfCartItems();

document.body.addEventListener('click', quickView);

let productName,
    productImage,
    productPrice,
    productOldPrice;

function quickView(e) {

  if (e.target.parentElement.classList.contains('btn-product-qview')) {
    productName = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[0].firstElementChild.firstElementChild.textContent;

    productImage = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].firstElementChild.firstElementChild.getAttribute("src");

    productPrice = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[1].firstElementChild.textContent;

    productOldPrice = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[1].lastElementChild.textContent;

  } else if (e.target.classList.contains('btn-product-qview')) {
    productName = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[0].firstElementChild.firstElementChild.textContent;

    productImage = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].firstElementChild.firstElementChild.getAttribute("src");

    productPrice = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[1].firstElementChild.textContent;

    productOldPrice = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].children[1].lastElementChild.textContent;
  }

  document.querySelector('.product-info h1').textContent = productName;
  document.querySelector('.new-price').textContent = productPrice;
  document.querySelector('.old-price').textContent = productOldPrice;
  document.querySelector('.modal-img').firstElementChild.firstElementChild.setAttribute("src", productImage);
}

// Cart Functionalities
class Product {
  constructor(id, name, image) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}

class UI {
  static displayCartItems() {
    //let cart = getCartFromLS();
    let items,
      htmlStr = ``,
      cartTable = document.querySelector('.content');
    if (localStorage.getItem('cart') === null) {
      cartTable.innerHTML = '<h3>No Items In Your Cart</h3>'
    } else {
      items = JSON.parse(localStorage.getItem('cart'));
    }
    items.forEach(function (item) {
      htmlStr += `<tr class="tr2">
                    <td class="td6">
                      <h6>${item.id}</h6>
                    </td>
                    <td class="td1">
                      <a href="single-product.html"><img src="${item.image}" alt="domino" /></a>
                    </td>
                    <td class="td2">
                        <h5>${item.name}</h5>
                    </td>
                    <td class="td5 item-qty">
                        <div class="cart-plus-minus">
                          <div class="decrease qtybutton">-</div>
                            <input type="text" name="plus" value="1" class="cart-plus-minus-box" />
                          <div class="increase qtybutton">+</div>
                        </div>
                    </td>
                    <td class="td6"><i class="fa fa-trash-o"></i>
                    </td>
                  </tr>`
    });

    cartTable.innerHTML = htmlStr;
  }
}

class Store {
  static addItemToLS(product) {
    let cart = getCartFromLS(); 
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static removeItemFromLS(product) {
    localStorage.removeItem(product);
  }
}

//ADD TO CART

document.querySelector('.single_add_to_cart_button').addEventListener('click', function (e) {
  //Get Cart
  let cart = getCartFromLS();
  //Create Product Object
  const product = new Product(cart.length + 1, productName, `/${productImage}`);
  //Push to Local Storage
  Store.addItemToLS(product);
  //Update Number of Cart Items
  getNumberOfCartItems();

  alert('Item Added')
  e.preventDefault();
});

function getNumberOfCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null || cart.length === 0) {
    document.querySelector('.cart-item').innerText = `0 Items`;
  } else {
    document.querySelector('.cart-item').innerText = `${cart.length} Items`;
  }
}

function getCartFromLS() {
  let cart;

  if (localStorage.getItem('cart') === null) {
    cart = [];
  } else {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  return cart;
}