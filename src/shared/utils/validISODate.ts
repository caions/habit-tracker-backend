export const validISODate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString() === dateString;
};
