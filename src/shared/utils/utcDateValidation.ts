export const validUtcDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString() === dateString;
};
