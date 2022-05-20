import axios from "axios";

export default async function getUsers() {
  return axios({
    method: "get",
    url: "https://recrutement-practice-default-rtdb.firebaseio.com/users.json",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (erreur) {
      //Affichage de l'erreur
      console.log(erreur);
    });
}
