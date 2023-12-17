document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        items: [
            { id: 1, name: 'cetak foto', img: 'kolase love.png', price:'15000'},
            { id: 2, name: 'stiker', img: 'stiker.png', price:'15000'},
            { id: 3, name: 'ppob', img: 'sb.png', price:'15000'},
            { id: 4, name: 'printing', img: 'renata.png', price:'30000'},
        ],
    }));
});