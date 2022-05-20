import axios from "axios";

export default async function getJobs() {
  return axios({
    method: "get",
    url: "https://recrutement-practice-default-rtdb.firebaseio.com/jobs.json",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (erreur) {
      //Affichage de l'erreur
      console.log(erreur);
    });
}
