export const formatCurrency = (amount: number, currency: string = 'KES'): string => {
  return `${currency} ${amount.toLocaleString()}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateProfitMargin = (costPrice: number, sellingPrice: number): number => {
  return Math.round(((sellingPrice - costPrice) / sellingPrice) * 100);
};

export const getMonthName = (monthNumber: number): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthNumber];
};
