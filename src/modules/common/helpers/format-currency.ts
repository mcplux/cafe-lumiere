export const formatCurrency = (price: number): string => {
  const formattedCurrency = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

  return formattedCurrency
}
