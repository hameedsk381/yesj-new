export function formatINR(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount
  if (isNaN(value)) return "₹0"
  return `₹${value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 !== 0 ? 2 : 0,
  })}`
}