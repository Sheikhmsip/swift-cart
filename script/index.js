// Loading Spinner
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  status ? spinner.classList.remove("hidden") : spinner.classList.add("hidden");
};

// gloval variables to store products and categories
let allProducts = [];
let trendingProducts = [];
let categories = [];

// load all products
const loadProducts = () => {

  manageSpinner(true);

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      // load only 3 products
      trendingProducts = data.slice(0, 3);
      // loadProductsPage(products);
      // console.log(products);
      // console.log(trendingproducts)
      displayTrendingProducts(trendingProducts);
      manageSpinner(false);
    })
    
};

// load single product details
const loadProductDetails = (id) => {

  manageSpinner(true);

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      displayProductDetails(product);
      manageSpinner(false);
    });
};

// load categories
const loadCategories = () => {

  manageSpinner(true);

  fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(data => {
      categories = data;
      displayCategories(categories);
      manageSpinner(false);
    });
};



//  dynamically page navigation
const navigate = (page) => {
  activeNav(page);
  manageSpinner(true);
  if (page === "home") homePage();
  if (page === "products") productsPage();
};


//  load home page
const homePage = () => {
  const container = document.getElementById("dynamicPage");
  container.innerHTML = "";
  container.innerHTML = `
        <!-- Banner section -->
    <section class="relative w-full overflow-hidden">
        <img src="./Assets/banner-image.png" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/70 to-transparent"></div>
        <div class="relative md:max-w-10/12 mx-auto px-6 md:px-8">
            <div class="flex items-center min-h-[520px] md:min-h-[600px]">
                <div class="max-w-xl text-white">
                    <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-5">
                        Best Collection For You
                    </h1>
                    <p class="text-gray-200 text-base md:text-lg mb-8">
                        Discover the latest trends in fashion, electronics, and more.
                        Shop with confidence and style at SwiftCart.
                    </p>
                    <button onclick="navigate('products')" class="cursor-pointer px-7 py-3 rounded-lg font-medium text-white
                       bg-blue-600 hover:scale-105 transition duration-300 shadow-lg">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose us section -->
    <section class="py-16 w-full md:w-10/12 mx-auto">
        <div class="max-w-6xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
                    Why Choose Us
                </h2>
                <p class="text-gray-500 mt-4 max-w-2xl mx-auto">
                    We provide the best shopping experience with top-notch services.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10 ">
                <div class="relative bg-gray-50 rounded-2xl p-4 pt-12 shadow-sm">
                    <div class="absolute -top-8 left-6 bg-indigo-50 p-4 rounded-xl shadow-md border-white border-4">
                        <i class="fa-solid fa-truck text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        Fast Delivery
                    </h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Get your orders delivered to your doorstep quickly and efficiently.
                    </p>
                </div>
                <div class="relative bg-gray-50 rounded-2xl p-4 pt-12 shadow-sm">
                    <div class="absolute -top-8 left-6 bg-indigo-50 p-4 rounded-xl shadow-md border-white border-4">
                        <i class="fa-solid fa-headphones text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        24/7 Support
                    </h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Our support team is available around the clock to assist you.
                    </p>
                </div>
                <div class="relative bg-gray-50 rounded-2xl p-4 pt-12 shadow-sm">
                    <div class="absolute -top-8 left-6 bg-indigo-50 p-4 rounded-xl shadow-md border-white border-4">
                        <i class="fa-solid fa-shield-halved text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        Secure Payment
                    </h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Experience safe and secure transactions with our encrypted payment systems.
                    </p>
                </div>
                <div class="relative bg-gray-50 rounded-2xl p-4 pt-12 shadow-sm">
                    <div class="absolute -top-8 left-6 bg-indigo-50 p-4 rounded-xl shadow-md border-white border-4">
                        <i class="fa-solid fa-rotate text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        Easy Returns
                    </h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Not satisfied? Return your products easily within 30 days.
                    </p>
                </div>
            </div>
        </div>
    </section>
  <!-- Trending Section products dynamicaly -->

    <section>
        <div class="md:w-10/12 max-w-7xl mx-auto py-12 px-6">
            <h2 class="text-3xl font-bold mb-8">Trending Now</h2>
            <div id="product-container" class="grid md:grid-cols-3 gap-6">
            </div>
        </div>

        <!-- Details Modal -->
        <dialog id="product_modal" class="modal">
            <div class="modal-box max-w-lg">
                <div id="details-container"></div>

                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </section>
  `;
  displayTrendingProducts(trendingProducts);
};

//  load products page
const productsPage = () => {
  const container = document.getElementById("dynamicPage");
  container.innerHTML = "";

  container.innerHTML = `
    <section>
        <div class="w-full md:w-10/12 max-w-7xl mx-auto py-12 px-4 sm:px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">Our Products</h2>
            <div id="category-container" class="flex flex-wrap gap-3 justify-center mb-8"></div>
            <div id="product-container" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            </div>
        </div>

        <!-- Details Modal -->
        <dialog id="product_modal" class="modal">
            <div class="modal-box w-11/12 max-w-lg">
                <div id="details-container"></div>

                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </section>
  `;
  manageSpinner(true);
  loadProductsPage(allProducts);
  loadCategories();
 

};

//  load products page with all products
const loadProductsPage = (products) => {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
      <div class="card bg-base-100 shadow-md">
        <figure class="bg-gray-100 p-6 h-64 sm:h-72 flex items-center justify-center">
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
      </div>
    `;
  });
  manageSpinner(false);
};

// Display treding product cards
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
  manageSpinner(false);
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

// Display category buttons
const displayCategories = () => {
  const container = document.getElementById("category-container");

  let buttons = `
    <button data-cat="all"
      onclick="filterCategory('all')"
      class="cat-btn px-4 py-2 rounded-full bg-blue-600 text-white">
      All
    </button>
  `;

  categories.forEach(cat => {
    buttons += `
      <button data-cat="${cat}"
        onclick="filterCategory('${cat}')"
        class="cat-btn px-4 py-2 border rounded-full hover:bg-blue-600 hover:text-white transition">
        ${cat}
      </button>
    `;
  });
manageSpinner(false);
  container.innerHTML = buttons;
};

// Active category button
const activeCategory = (category) => {
  const buttons = document.querySelectorAll(".cat-btn");

  buttons.forEach(btn => {
    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("border", "border-gray-300");

    if (btn.innerText.toLowerCase() === category.toLowerCase() ||
        (category === "all" && btn.innerText === "All")) {
      btn.classList.add("bg-blue-600", "text-white");
      btn.classList.remove("border", "border-gray-300");
    }
  });
};

// Filter products by category
const filterCategory = (category) => {
 activeCategory(category);
manageSpinner(true);
  if (category === "all") {
    loadProductsPage(allProducts);
    return;
  }
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(data => {
      loadProductsPage(data);
      manageSpinner(false);
    });
};

// active navbar link

const activeNav = (page) => {
  document.querySelectorAll(".active").forEach(link => {
    link.classList.remove("text-blue-600", "font-semibold");
    if (link.dataset.page === page) {
      link.classList.add("text-blue-600", "font-semibold");
    }
  });
};



// defult active page 
navigate("home");
homePage();
loadProducts();
