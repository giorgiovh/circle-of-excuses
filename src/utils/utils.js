// formats the excuse name with a hashtag, hyphens, and 'tho' so that it can be used as the card title in ImgMediaCard.js
export const addHashtagAndTho = (str) => {
  let arr = str.split(' ');
  let newStr = arr.map((word, idx) => {
    if (idx === 0) {
      return `#${word}`;
    } else {
      return `-${word}`;
    }
  }).join('');
  return newStr + '-tho';
}

// checks if the excuse is a user created excuse or a preset excuse. Returns true if it's a user created excuse and false if it's a preset excuse
export const checkIfUserExcuse = (excuse) => {
  return excuse.hasOwnProperty("uid")
}

// checks if logged in user is the admin
export const checkIfUserIsAdmin = (user) => {
  if (user) {
    return user.uid === process.env.REACT_APP_ADMIN_UID
  }
}