import { useEffect, useState } from "react";

export function useFavourite() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem("favourite") || null;
    const dataStorage = storage ? JSON.parse(storage) : [];

    setData(dataStorage);
  }, []);

  const setFavourite = (item) => {
    console.log("🚀 ~ setFavourite ~ item:", item)
    const payload = {
      id: item.id,
      title: item.title,
      poster: item.poster_path,
    };

    // check if already added
    const listId = data.map((item) => item.id);
    let formData = [];

    if (listId.includes(payload.id)) {
      const indexItem = listId.indexOf(payload.id);
      formData = data.filter((item, index) => index !== indexItem);
    } else {
      formData = [...data, payload];
    }

    localStorage.setItem("favourite", JSON.stringify(formData));
    setData(formData);
  };

  const checkFavourite = (id) => {
    const listId = data.map((item) => item.id);
    console.log("🚀 ~ checkFavourite ~ listId:", listId)

    console.log(id)

    return listId.includes(Number(id));
  };

  return { setFavourite, data, checkFavourite };
}
