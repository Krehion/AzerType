/*********************************************************************************
 *
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu.
 *
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
  // Récupération de la zone dans laquelle on va écrire le score
  let spanScore = document.querySelector(".zoneScore span");
  // Ecriture du texte
  let affichageScore = `${score} / ${nbMotsProposes}`;
  // On place le texte à l'intérieur du span.
  spanScore.innerText = affichageScore;
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier,
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerText = proposition;
}

/**
 * Cette fonction construit et affiche l'email.
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score.
 */
function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, c'est ${nom}. Je viens de réaliser le score ${score} sur le site d'AzerType !`;
  location.href = mailto;
}

/**
 * Cette fonction vérifie que le nom renseigné est valide
 * critère : 2 caractères minimum
 * @param {string} nom
 * @throws {Error}
 */
function validerNom(nom) {
  if (nom.length < 2) {
    throw new Error("Le nom est trop court");
  }
}

/**
 * Cette fonction vérifie que l'email renseigné est valide
 * critère : format d'email
 * @param {string} email
 * @throws {Error}
 */
function validerEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    // le ! inverse le test
    throw new Error("Renseignez un e-mail valide");
  }
}

/**
 * Cette fonction affiche un message d'erreur dans la popup
 * @param {string} message
 */
function afficherMessageErreur(message) {
  let spanErreurMessage = getElementById("erreurMessage"); // vérifie que l'élément n'existe pas déjà

  if (!spanErreurMessage) {
    // s'il n'existe pas, on le crée
    let popup = document.querySelector(".popup");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreurMessage";

    popup.append(spanErreurMessage);
  }

  spanErreurMessage.innerText = message;
}

/**
 * Cette fonction vérifie la validité du formulaire
 */
function gererFormulaire(scoreEmail) {
  try {
    let baliseNom = document.getElementById("nom");
    let nom = baliseNom.value;
    validerNom(nom);

    let baliseEmail = document.getElementById("email");
    let email = baliseEmail.value;
    validerEmail(email);

    afficherMessageErreur(""); // affiche une chaîne vide dans le message d'erreur

    afficherEmail(nom, email, scoreEmail);
  } catch (erreur) {
    // Gère l'erreur
    afficherMessageErreur(erreur.message);
  }
}

/**
 * Cette fonction lance le jeu.
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
  // Initialisations
  initAddEventListenerPopup();
  let score = 0;
  let i = 0;
  let listeProposition = listeMots;

  let btnValider = document.getElementById("btnValider");
  let inputSaisie = document.getElementById("inputSaisie");

  afficherProposition(listeProposition[i]);

  // Gestion de l'événement click sur le bouton "valider"
  btnValider.addEventListener("click", () => {
    if (inputSaisie.value === listeProposition[i]) {
      score++;
    }
    i++;
    afficherResultat(score, i);
    inputSaisie.value = "";
    if (listeProposition[i] === undefined) {
      afficherProposition("Le jeu est fini");
      btnValider.disabled = true;
    } else {
      afficherProposition(listeProposition[i]);
    }
  });

  // Gestion de l'événement change sur les boutons radio
  let listeBtnRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      // Si c'est le premier élément qui a été modifié, alors nous voulons
      // jouer avec la listeMots.
      if (event.target.value === "1") {
        listeProposition = listeMots;
      } else {
        // Sinon nous voulons jouer avec la liste des phrases
        listeProposition = listePhrases;
      }
      // Et on modifie l'affichage en direct.
      afficherProposition(listeProposition[i]);
    });
  }

  // Gestion de l'envoi du formulaire de partage
  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let scoreEmail = `${score} / ${i}`;
    gererFormulaire(scoreEmail);
  });

  afficherResultat(score, i);
}
