export default function getItem(item, keyword) {
  for (let key in item) {
    for (let innerKey in item[key]) return item[key][keyword];
  }
}
