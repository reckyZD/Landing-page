document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        items: [
            { id: 1, name: 'cetak foto', img: '1.jpg', price: '15000'},
            { id: 2, name: 'stiker', img: '2.jpg', price: '15000'},
            { id: 3, name: 'ppob', img: '3.jpg', price: '15000'},
            { id: 4, name: 'printing', img: '4.jpg', price: '30000'},
        ],
    }));
    Alpine.data('menu', () => ({
        items: [
            { id: 1, name: 'cetak foto', img: '1.jpg', price: '15000'},
            { id: 2, name: 'stiker', img: '2.jpg', price: '15000'},
            { id: 3, name: 'ppob', img: '3.jpg', price: '15000'},
            { id: 4, name: 'printing', img: '4.jpg', price: '30000'},
        ],
    }));
    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // jika apakah ada barang yg sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada / cart masih kosong
            if (!cartItem) {
                this.items.push({...newItem, quantity: 1, total: parseFloat(newItem.price) });
                this.quantity++;
                this.total += parseFloat(newItem.price);
            } else {
                // jika barangnya sudah ada di cart, cek apakah barang beda atau sama dengan yg ada di cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada, tambah quantity dan subtotalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += parseFloat(newItem.price);
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // ambil item yg mau di remove berdasarkan id
            const cartItemIndex = this.items.findIndex((item) => item.id === id);
            const cartItem = this.items[cartItemIndex];
        
            // jika item lebih dari satu
            if (cartItem.quantity > 1) {
                // telusuri 1 per 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yg di klik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= parseFloat(cartItem.price); // Menggunakan cartItem.price daripada newItem.price
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // jika barangnya sisa 1
                this.items.splice(cartItemIndex, 1);
                this.quantity--;
                this.total -= parseFloat(cartItem.price); // Menggunakan cartItem.price daripada newItem.price
            }
        }
    });
});

// form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');
// ambil form atau form belum terisi semua
form.addEventListener('keyup', function () {
   for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
// jika sudah terisi semua form
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombol checkout di klik
checkoutButton.addEventListener('click', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);  // konversi string menjadi objek
    const message  = formatMessage(objData);
    
    window.open("http://wa.me/628151866855?text=" + encodeURIComponent (message));  // format pesan whatapps
});

// format pesan whatsapps
    const formatMessage = (obj) => {
        return `Data customer
        Nama: ${obj.name}
        Email: ${obj.email}
        No HP: ${obj.phone}
Data Pesanan:
        ${JSON.parse(obj.items).map((item) => `${item.name} ${item.quantity} x ${rupiah(item.price)} = ${rupiah(item.total)} \n`)}
Total: ${rupiah(obj.total)} 
    Terima kasih.`;
    };


// konversi nilai rupiah
const rupiah = (Number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number);
};