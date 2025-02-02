export function formatDateRev(dateString: string) {
  // Split the date and rearrange it to YYYY-MM-DD format
  const [day, month, year] = dateString.split("-");
  const formattedDate = new Date(`${year}-${month}-${day}`);

  return formattedDate;
}
