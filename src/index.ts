/**
 * Date Calculator
 * Calculate differences between dates
 *
 * Online tool: https://devtools.at/tools/date-calculator
 *
 * @packageDocumentation
 */

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDayName = (date: Date, locale: Locale): string => {
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

const addBusinessDays = (startDate: Date, days: number): Date => {
  const result = new Date(startDate);
  let addedDays = 0;
  const direction = days > 0 ? 1 : -1;
  const daysToAdd = Math.abs(days);

  while (addedDays < daysToAdd) {
    result.setDate(result.getDate() + direction);
    if (!isWeekend(result)) {
      addedDays++;
    }
  }

  return result;
};

const calculateBusinessDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);
  const end = new Date(endDate);
  const direction = current <= end ? 1 : -1;

  while ((direction === 1 && current <= end) || (direction === -1 && current >= end)) {
    if (!isWeekend(current)) {
      count++;
    }
    current.setDate(current.getDate() + direction);
  }

  return direction === 1 ? count - 1 : -(count - 1);
};

const calculateAge = (birthDate: Date, currentDate: Date) => {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

// Export for convenience
export default { encode, decode };
