export default function getTimeMinSec (time) {
  let min = time / 1000 / 60;
  let r = min % 1;
  let sec = Math.floor(r * 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  min = Math.floor(min);
  return `${min}:${sec}`;
}
