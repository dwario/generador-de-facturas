document.addEventListener("DOMContentLoaded", () => {
  fetchData()
})

const fetchData = async () => {
  try{
    const res = await fetch('products.json');
    const data = await res.json();
    //console.log(data);
    showProducts(data);
    button(data);
  } catch(error){
    console.log(error);
  }
};


const productContainer = document.querySelector('#cards-container')

const showProducts = (data) => {

  const template = document.querySelector('#template-products').content;
  const fragment = document.createDocumentFragment()
  
  data.forEach(product => {
    template.querySelector('img').setAttribute('src', product.img);
    template.querySelector('#name').textContent = product.name;
    template.querySelector('#price').textContent = product.price;
    template.querySelector('#id').textContent = product.id;
    template.querySelector('button').dataset.id = product.id;
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })
  productContainer.appendChild(fragment)  
};

let cart = {}


const button = (data) => {
  const buttons = document.querySelectorAll('.product-card button');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log(btn.dataset.id);
      const product = data.find(item => item.id === parseInt(btn.dataset.id));
      product.number = 1;

      if(cart.hasOwnProperty(product.id)){
        product.number ++
      }
      cart[product.id] = {...product}
      console.log(product)
    })
  })
}; 
