function parseDateToPostgresFormat(dateStr: string): Date {
  // Return Date for Prisma
  const [day, month, year] = dateStr.split("-");

  // Create Date object in UTC to match Prisma's DateTime
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
}
