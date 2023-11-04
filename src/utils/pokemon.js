export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((reason) => console.error("アクセス拒否：", reason))
    }, 1000);
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((reason) => console.error("アクセス拒否：", reason))
  });
};
