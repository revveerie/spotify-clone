export default function getInfo (item, keyword) {
  for (let key in item) {
    if (key == keyword) 
      return item[key];
  }
}
