export const isSameDate = (date1?: string, date2?: string) => {
  if (date1 === undefined || date2 === undefined) {
    return false
  }
  const formatDate1 = new Date(date1).toISOString().substring(0, 10);
  const formatDate2 = new Date(date2).toISOString().substring(0, 10);
  return formatDate1 === formatDate2;
}
