export default function getTimeMin (time) {
    let min = time / 1000 / 60;
    let r = min % 1;
    let sec = Math.floor(r * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    min = Math.floor(min);
    if (min <= 60) return `${min} min`;
    else {
      let hours = Math.trunc(min / 60);
      let minutes = min % 60;
      return `${hours} h ${minutes} min`;
    }
  }