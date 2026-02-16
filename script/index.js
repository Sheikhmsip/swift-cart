// Load all products
const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
        const products = data;
        // load only 3 products
        const trendingProducts = data.slice(0, 3);
        // console.log(products);
        // console.log(trendingproducts)
        displayTrendingProducts(trendingProducts);
    });
};

// Display product cards
const displayTrendingProducts = (products) => {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-md";
    card.innerHTML = `
      <figure class="bg-gray-100 p-8 h-72">
        <img src="${product.image}" 
          class="h-52 object-contain">
      </figure>
      <div class="card-body">
        <div class="flex justify-between items-center">
          <span class="badge badge-primary badge-outline text-xs">
            ${product.category}
          </span>
          <div class="flex items-center text-sm text-gray-500">
            <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
            ${product.rating.rate}
            <span class="ml-1">(${product.rating.count})</span>
          </div>
        </div>
        <h2 class="card-title text-base truncate">
          ${product.title}
        </h2>
        <p class="font-bold text-lg">$${product.price}</p>
        <div class="flex gap-4 justify-between mt-4">
          <button onclick="loadProductDetails(${product.id})"
            class="btn btn-outline btn-sm w-1/2">
            <i class="fa-regular fa-eye mr-2"></i> Details
          </button>
          <button class="btn btn-primary btn-sm w-1/2">
            <i class="fa-solid fa-cart-plus mr-2"></i> Add
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
};

// Load single product details
const loadProductDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      displayProductDetails(product);
    });
};

// Display details modal
const displayProductDetails = (product) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
      <div class="text-center">
        <img src="${product.image}" 
          class="h-44 mx-auto object-contain mb-4">
        <h2 class="font-bold text-xl mb-2">
          ${product.title}
        </h2>
        <p class="text-sm text-gray-600 mb-4">
          ${product.description}
        </p>
        <div class="flex justify-between text-sm font-semibold">
          <span>$${product.price}</span>
          <span>
            <i class="fa-solid fa-star text-yellow-400"></i>
            ${product.rating.rate}
          </span>
        </div>
      </div>
  `;
  document.getElementById("product_modal").showModal();
};

loadProducts();
