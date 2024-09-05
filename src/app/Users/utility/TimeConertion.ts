 convertTimeTo12HourFormat( time: string): string {
  const [hour, minute] = time.split(':');
  let period = 'AM';
  let adjustedHour = parseInt(hour, 10);

  if (adjustedHour >= 12) {
    period = 'PM';
    if (adjustedHour > 12) {
      adjustedHour -= 12;
    }
  } else if (adjustedHour === 0) {
    adjustedHour = 12;
  }

  return `${this.pad(adjustedHour)}:${minute} ${period}`;
}

pad(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }
