function lancerJeu() {
    let choix = choisirPhrasesOuMots()    
    let score = 0
    let nbMotsProposes = 0

    if (choix === "mots") {
        score = lancerBoucleDeJeu(listeMots)
        nbMotsProposes = listeMots.length
    }
    else {
        score = lancerBoucleDeJeu(listePhrases)
        nbMotsProposes = listePhrases.length
    }

    afficherResultat(score, nbMotsProposes)
}

lancerJeu()