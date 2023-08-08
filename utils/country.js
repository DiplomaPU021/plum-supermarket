export async function getCountryData() {
  let data = {
    name: "Україна",
    flag: { emojitwo: "https://cdn.ipregistry.co/flags/emojitwo/ua.svg" },
    code: "UA",
  };
  /* Увага!!! замість обєкту можна використати сервіс ipregistry з наступним методом
      await axios
      .get('https://api.ipregistry.co/?key=aq50e9f94war7j9p')
      .then((res) => {      
        return res.data.location.country;
      })
      .catch((err)=> {
        console.log(err);      
      });*/

  return { name: data.name, flag: data.flag.emojitwo, code: data.code };
}
