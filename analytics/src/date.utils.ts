export function getLastNCompleteMonthRanges(numberOfMonth : number) {
  const dateRanges = [];
  const currentDate = new Date();

  // Start from the previous month
  for (let i = 1; i <= numberOfMonth; i++) {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 2);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);

    dateRanges.push({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }

  return dateRanges;
}



