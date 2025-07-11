document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = encodeURIComponent(document.getElementById('name').value.trim());
  const address = encodeURIComponent(document.getElementById('address').value.trim());
  const apartment = encodeURIComponent(document.getElementById('apartment').value.trim());
  const order = encodeURIComponent(document.getElementById('order').value.trim());
  const paymentRadio = document.querySelector('input[name="payment"]:checked');
  const payment = paymentRadio ? encodeURIComponent(paymentRadio.value) : '';

  const message = `שלום, אני ${name}%0Aרוצה להזמין: ${order}%0Aכתובת: ${address} דירה: ${apartment}%0Aתשלום: ${payment}`;

  const phone = '972523224223';
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappUrl, '_blank');
});
