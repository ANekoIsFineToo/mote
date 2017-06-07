export function generateRandomColor() {
  const colors = [
    '#fff',
    '#000',
    '#d9534f',
    '#f0ad4e',
    '#ffd500',
    '#5cb85c',
    '#0275d8',
    '#5bc0de',
    '#ff5b77',
    '#613d7c',
    '#292b2c',
    '#464a4c',
    '#636c72',
    '#eceeef',
    '#f7f7f9',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}
