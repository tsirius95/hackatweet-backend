function hashtagFinder (chaine) {

const motif = /#(\w+)/;

const resultat = chaine.match(motif);

if (resultat !== null) {
    console.log("Motif trouvé :", resultat[0]);
    console.log("Contenu du motif :", resultat[1]);
} else {
    console.log("Aucun motif trouvé.");
}
    return resultat[1]
}

module.exports = { hashtagFinder };