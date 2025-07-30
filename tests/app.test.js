/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

// Tu test comienza aquí
describe('Carrito de compras (sin PayPhone)', () => {
  let document;
  let carrito = [];
  let resumenUL;
  let totalSpan;
  let pagarBtn;

  const productoMock = { nombre: "Test Producto", precio: 10.00 };

  beforeEach(() => {
    const dom = new JSDOM(`
      <body>
        <ul id="resumen"></ul>
        <span id="total">0.00</span>
        <button id="pagar-btn" style="display:none;"></button>
      </body>
    `);
    document = dom.window.document;
    resumenUL = document.getElementById('resumen');
    totalSpan = document.getElementById('total');
    pagarBtn = document.getElementById('pagar-btn');
    carrito = [];
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

    pagarBtn.style.display = carrito.length > 0 ? 'inline-block' : 'none';
  }

  test('debe agregar producto al carrito y actualizar resumen', () => {
    carrito.push(productoMock);
    actualizarResumen();

    expect(resumenUL.children.length).toBe(1);
    expect(resumenUL.textContent).toContain("Test Producto");
    expect(totalSpan.textContent).toBe("10.00");
    expect(pagarBtn.style.display).toBe("inline-block");
  });

  test('carrito vacío debe tener total en 0.00 y ocultar botón', () => {
    actualizarResumen();

    expect(resumenUL.children.length).toBe(0);
    expect(totalSpan.textContent).toBe("0.00");
    expect(pagarBtn.style.display).toBe("none");
  });
});
