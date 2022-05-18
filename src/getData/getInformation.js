import axios from "axios";

export default async function getInformation() {
  return axios({
    method: "get",
    url: "https://recrutement-practice-default-rtdb.firebaseio.com/informations.json",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (erreur) {
      //Affichage de l'erreur
      console.log(erreur);
    });
}
