/* 
  Take in a title, search through lines and return it
  ex: an array with "url: blah.com" -> findLine('url', lines) -> blah.com
*/
export default (title, lines) => {
  let line = lines.find((line, index) => line.match(`${title}:`))
  if(!line) return null

  return line
    .replace(/ /g, '')
    .replace(`${title}:`, '')
}