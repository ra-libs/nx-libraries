export const minYear =
  (year: number, message = 'validation.minYear') =>
  (value: Date) => {
    const date = typeof value === 'string' ? new Date(value) : value
    return date?.getFullYear() >= year ? undefined : { message, args: { year } }
  }

export const maxYear =
  (year: number, message = 'validation.maxYear') =>
  (value: Date | string) => {
    const date = typeof value === 'string' ? new Date(value) : value
    return date.getFullYear() <= year ? undefined : { message, args: { year } }
  }
