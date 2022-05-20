import axios from "axios";

//Ajouter une glycemie en BDD
export default async function postData(data) {
  return axios({
    method: "post",
    url: "krat.es/72a87bea9ba019a97c17",
    headers: { "content-type": 'application/json' },
    mode: "cors",
    //data: data,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (erreur) {
      //Affichage de l'erreur
      //console.log(erreur);
    });
}
