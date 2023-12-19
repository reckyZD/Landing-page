document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        items: [
            { id: 1, name: 'cetak foto', img: '1.jpg', price: '15000'},
            { id: 2, name: 'stiker', img: '2.jpg', price: '15000'},
            { id: 3, name: 'ppob', img: '3.jpg', price: '15000'},
            { id: 4, name: 'printing', img: '4.jpg', price: '30000'},
        ],
    }));
    Alpine.store('cart', {
        items: [],
        total:0,
        quantity:0,
        add(newItem) {
           this.items.push(newItem);
           this.quantity++;
           this.total += newItem.price;
           console.log(this.total); 
        }
    });
});


// konversi nilai rupiah
const rupiah = (Number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number);
};