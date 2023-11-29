getNumberOfCartItems();

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
    if (localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0) {
      document.querySelector('.table-responsive').innerHTML = '<h3>No Items In Your Cart</h3>'
    } else {
      items = JSON.parse(localStorage.getItem('cart'));

      items.forEach(function (item) {
        htmlStr += `<tr class="tr2">
                    <td class="td6">
                      <h6>${item.id}</h6>
                    </td>
                    <td class="td1">
                      <a href="single-product.html"><img src="/public${item.image}" alt="domino" /></a>
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

      document.querySelector('#billing-info').innerHTML = `<div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <div class="row">
                        <form id="contact-form" class="contact-form" action="http://d29u17ylf1ylz9.cloudfront.net/domino/mail.php" method="post">
                            <div class="address-wrapper">
                                <div class="col-md-6 col-sm-12">
                                    <div class="address-fname">
                                        <input required class="user-info" type="text" name="name" placeholder="Name*" />
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="address-email">
                                        <input required class="user-info" type="email" name="email" placeholder="Email*" />
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="address-textarea">
                                        <textarea name="message" placeholder="Extra Notes Or Instructions*"></textarea>
                                    </div>
                                </div>
                            </div>
                            <p class="form-messege"></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
    }
  }
}

class Store {
  static addItemToLS(product) {
    let cart = getCartFromLS();
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static removeItemFromLS(id) {
    const cart = getCartFromLS();

    cart.forEach(function (item, index) {
      if (item.id === id) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

//Remove From Cart
function remove(e) {
  if (e.target.classList.contains('fa-trash-o')) {
    console.log(e.target.parentElement.parentElement.firstElementChild.textContent)
    e.target.parentElement.parentElement.remove();
  }

  Store.removeItemFromLS(Number(e.target.parentElement.parentElement.firstElementChild.textContent));
  getNumberOfCartItems();

}

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