const inventario = [
  { nombre: "Camisa Blanca", precio: 18.50, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7O2iHpUynXy7Eh7i2-0clxlHeiTjUZ-OyVw&s" },
  { nombre: "Pantalón Denim", precio: 34.99, imagen: "https://rolandecuador.vtexassets.com/arquivos/ids/173477-800-auto?v=638509532888700000&width=800&height=auto&aspect=true" },
  { nombre: "Gorra Verde", precio: 12.00, imagen: "https://innstintus.com/cdn/shop/products/89260_190_uniformhat_angle_700x700.jpg?v=1634844693" }
];

const productosDiv = document.getElementById('productos');
const resumenUL = document.getElementById('resumen');
const totalSpan = document.getElementById('total');
const pagarBtn = document.getElementById('pagar-btn');
const mensajeDiv = document.getElementById('mensaje-estado');

let carrito = [];

inventario.forEach(item => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}">
    <h3>${item.nombre}</h3>
    <p>$${item.precio.toFixed(2)}</p>
    <button>Agregar</button>
  `;
  div.querySelector('button').addEventListener('click', () => {
    carrito.push(item);
    actualizarResumen();
  });
  productosDiv.appendChild(div);
});

function actualizarResumen() {
  resumenUL.innerHTML = '';
  let total = 0;
  carrito.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
    resumenUL.appendChild(li);
    total += p.precio;
  });
  totalSpan.textContent = total.toFixed(2);

  if (carrito.length > 0) {
    pagarBtn.style.display = 'inline-block';
  } else {
    pagarBtn.style.display = 'none';
  }
}

pagarBtn.addEventListener('click', () => {
  if (carrito.length === 0) return;
  const transId = `ORD_${Date.now()}`;
  localStorage.setItem('transaccionCliente', transId);
  localStorage.setItem('montoFinal', totalSpan.textContent);
  window.location.href = `gracias.html?estado=exitoso&idTrans=${transId}`;
});
