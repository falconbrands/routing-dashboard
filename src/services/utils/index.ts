export const getLetterWithIndex = (index: number): string => {
  return 'abcdefghijklmnopqrstuvwxyz'.charAt(index).toUpperCase()
}

export const stripHTML = (value: string): string => {
  return value.replace(/(<([^>]+)>)/ig, '');
}