export function currencyFormat(currency: number) {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return formatter.format(currency);
}
