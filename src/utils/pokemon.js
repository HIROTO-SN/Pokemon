export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((reason) => console.error("アクセス拒否：", reason))
        .finally(() => console.log("最終実行"));
    }, 1000);
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
				console.log(data);
				resolve(data)
			})
      .catch((reason) => console.error("アクセス拒否：", reason))
      .finally(() => console.log("最終実行"));
  });
};
