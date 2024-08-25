document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const filterBtn = document.getElementById('filterBtn');
    const productDisplay = document.querySelector('.product-display');
    const minPriceLabel = document.getElementById('minPriceLabel');
    const maxPriceLabel = document.getElementById('maxPriceLabel');

    // Update the price labels when sliders are moved
    function updatePriceLabels() {
        minPriceLabel.textContent = `$${minPriceInput.value}`;
        maxPriceLabel.textContent = `$${maxPriceInput.value}`;
    }

    // Filter products based on user selection
    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedBrand = brandFilter.value;
        const minPrice = minPriceInput.value;
        const maxPrice = maxPriceInput.value;

        const queryParams = new URLSearchParams();

        if (selectedCategory) {
            queryParams.append('category', selectedCategory);
        }

        if (selectedBrand) {
            queryParams.append('brand', selectedBrand);
        }

        queryParams.append('minPrice', minPrice);
        queryParams.append('maxPrice', maxPrice);

        fetch(`/products?${queryParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                displayProductsByCategory(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Display products by category in separate columns
    function displayProductsByCategory(products) {
        productDisplay.innerHTML = '';

        if (products.length === 0) {
            productDisplay.innerHTML = '<p>No products found.</p>';
            return;
        }

        // Group products by category
        const productsByCategory = products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});

        // Display each category in its own column
        Object.keys(productsByCategory).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'product-category';
            categoryDiv.innerHTML = `<h2>${category}</h2>`;

            productsByCategory[category].forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <h3>${product.brand}</h3>
                    <p>Price: $${product.price}</p>
                `;
                categoryDiv.appendChild(productDiv);
            });

            productDisplay.appendChild(categoryDiv);
        });
    }

    filterBtn.addEventListener('click', filterProducts);
    minPriceInput.addEventListener('input', updatePriceLabels);
    maxPriceInput.addEventListener('input', updatePriceLabels);
});
