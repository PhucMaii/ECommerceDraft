function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "nav-list") {
      x.className += " responsive";
    } else {
      x.className = "nav-list";
    }
  }

let bool = false;
function showProducts() {
  const productTypeContainer = document.getElementById('product-type-container');
  if(bool) {
    productTypeContainer.classList.add('displayNone')
    bool = false;
  } else{
    productTypeContainer.classList.remove('displayNone')

    bool = true;

  }
}