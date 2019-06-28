import {shoppingCart, orderHistory} from "../../app.js";

//neet to add click listeners for updating qty or deleting items from cart

class Order {
    constructor(total) {
        this.orderDate = new Date();
        this.orderNumber = Math.floor(Math.random() * (99999 - 10000) + 10000);
        this.total = total;
        this.status = "Processing";
    }
    formatDate() {
        var dd = String(this.orderDate.getDate()).padStart(2, '0');
        var mm = String(this.orderDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.orderDate.getFullYear();

        date = mm + '/' + dd + '/' + yyyy;
        return date;
    }

}

var total;

let Checkout = {

    render: async () => {
        total = 0;
        //hide cart initially
        let slider = document.querySelector(".cartSlider")
        slider.classList.remove('showCart');
        let overlayBG = document.querySelector('.bg');
        overlayBG.classList.remove('overlay');

        let view = `
        <section class="checkout">
            
            <div class="checkoutDetails">
                <h1>Checkout</h1>
                <div class="shippingInfo">
                    <h2>Shipping Info</h2>
                    <div class="form">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="name" class="checkoutInput" placeholder="Luke Skywalker">

                        <label for="coordinates">Coordinates</label>
                        <input type="text" id="coordinates" name="coordinates" class="checkoutInput" placeholder="0,0,0">

                        <label for="sector">Sector</label>
                        <input type="text" id="sector" name="sector" class="checkoutInput" placeholder="Core">

                        <label for="shipMethod">Shipping Method</label>
                        <select id="shipMethod" class="checkoutInput">
                            <option value="lightspeed">Lightspeed</option>
                            <option value="overnight">Overnight</option>
                            <option value="standard">Standard</option>
                        </select>
                    </div>
                </div>
                <div class="paymentInfo">
                    <h2>Payment</h2>
                    <div class="form">
                        <label for="account">Imperial Credit Account Number</label>
                        <input type="text" id="account" name="account" class="checkoutInput">
                        
                        <label for="code">Security Code</label>
                        <input type="text" id="code" name="code" class="checkoutInput">
                        
                        <label for="expDate">Expiration Date</label>
                        <input type="date" id="expDate" name=expDate" class="checkoutInput">
                    </div>
                </div>
                <button class="orderButt">PLACE ORDER</button>
            </div>
            <div class="checkoutCart">
                <h1>Shopping Cart</h1>
            `
            shoppingCart.forEach((value, key) => {
                // html
                total += value.price * value.qty;
                view += `
                <div class="cartItem">
                    <div class="cartQtyTitle">
                        <input type="number" class="cartQty" name="qty" id="${key}" min="1" max="10" size="0" value="${value.qty}">
                        <h3> x ${value.title}</h3>
                    </div>
                    <div class="cartPrice">
                        <div class="gridPrice">
                            <img src="../../img/wSymbol.svg" class="symbol">
                            <h4>${commas(value.price * value.qty)}</h4>
                        </div>
                        <img src="img/delete.svg" class="delete" id="${key}">
                    </div>
                </div>`
            });
            view += `
            <div class="cartTotal">
                    <h3>Total: </h3>
                    <div class="totalPrice">
                        <img src="../../img/wSymbol.svg" class="symbol">
                        <h3>${commas(total)}</h3>
                    </div>
                </div>
            </div>
            
        </section>`

        return view;
    }
    , after_render: async () => {

        var orderButt = document.querySelector('.orderButt');
        orderButt.addEventListener('click', placeOrder, false);

    }
}

var placeOrder = () => {
    let order = new Order(total);
    orderHistory.push(order);
    location.href="/#/history";
}

var commas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Checkout;