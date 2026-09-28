let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    updateCustomizer();
});

function updateCustomizer() {
    const garmentSelect = document.getElementById('garment-type');
    const selectedOption = garmentSelect.options[garmentSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const garmentType = garmentSelect.value;

    document.getElementById('dynamic-price').innerText = price + ' MDL';

    const icon = document.getElementById('garment-icon');
    if (garmentType === 'maiou') {
        icon.className = 'fas fa-vest fa-4x';
    } else if (garmentType === 'tricou') {
        icon.className = 'fas fa-tshirt fa-4x';
    } else if (garmentType === 'hanorac') {
        icon.className = 'fas fa-vest-patches fa-4x';
    } else if (garmentType === 'chipiu') {
        icon.className = 'fas fa-hat-cowboy fa-4x';
    }

    const position = document.getElementById('design-position').value;
    document.getElementById('pos-badge').innerText = position;
}

function updateCustomizerColor() {
    const color = document.getElementById('garment-color').value;
    document.getElementById('mockup-box').style.backgroundColor = color;
    document.getElementById('color-hex-label').innerText = 'Culoare personalizată (' + color + ')';
}

function updateCustomizerText() {
    const text = document.getElementById('design-text').value;
    const display = document.getElementById('preview-text-display');
    display.innerText = text.trim() === '' ? 'Designul tău aici' : text;
}

function handleCustomOrder(event) {
    event.preventDefault();
    const garmentType = document.getElementById('garment-type').value;
    const size = document.getElementById('garment-size').value;
    const position = document.getElementById('design-position').value;
    const designText = document.getElementById('design-text').value || 'Standard Design';
    const price = parseInt(document.getElementById('dynamic-price').innerText);

    const itemName = `Personalizat: ${garmentType.toUpperCase()} (${size}), ${position}: "${designText}"`;

    cart.push({ name: itemName, price: price });
    updateCartUI();
    toggleCart();
    alert('Produsul personalizat a fost adăugat în coș cu succes!');
}

function addToCatalogCart(name, price) {
    cart.push({ name: name, price: price });
    updateCartUI();
    alert(`"${name}" a fost adăugat în coș!`);
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function updateCartUI() {
    const countSpan = document.getElementById('cart-count');
    countSpan.innerText = cart.length;

    const listContainer = document.getElementById('cart-items-list');
    const totalPriceEl = document.getElementById('cart-total-price');

    if (cart.length === 0) {
        listContainer.innerHTML = '<p>Coșul este gol momentan.</p>';
        totalPriceEl.innerText = '0';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item-row">
                <span>${item.name}</span>
                <span><strong>${item.price} MDL</strong> <i class="fas fa-trash" style="cursor:pointer; color:#ef4444; margin-left:10px;" onclick="removeFromCart(${index})"></i></span>
            </div>
        `;
    });

    listContainer.innerHTML = html;
    totalPriceEl.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkoutOrder() {
    if (cart.length === 0) {
        alert('Coșul este gol!');
        return;
    }
    alert('Comanda dumneavoastră a fost plasată cu succes! Vă mulțumim că ați ales FE „TintaSuTela” SRL.');
    cart = [];
    updateCartUI();
    toggleCart();
}

function submitReview(event) {
    event.preventDefault();
    const name = document.getElementById('reviewer-name').value;
    const rating = document.getElementById('review-rating').value;
    const comment = document.getElementById('reviewer-comment').value;

    const stars = '⭐'.repeat(parseInt(rating));
    const reviewsList = document.getElementById('reviews-list');

    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
        <strong>${name}</strong> <span>${stars}</span>
        <p>${comment}</p>
    `;

    reviewsList.prepend(newReview);
    document.getElementById('review-form').reset();
    alert('Vă mulțumim pentru recenzie!');
}