function hashtagFinder (chaine) {
// Chaîne de caractères contenant le motif que vous souhaitez extraire
//var chaine = "Ceci est un exemple de #quelquechose dans une chaîne de caractères.";

// Utilisation d'une expression régulière pour trouver le motif "#quelquechose"
const motif = /#(\w+)/; // Cette expression régulière recherche une chaîne commençant par "#" suivie d'un ou plusieurs caractères alphanumériques (\w+)

// Exécution de la recherche dans la chaîne de caractères
const resultat = chaine.match(motif);

// Vérification si le motif a été trouvé
if (resultat !== null) {
    // Le motif a été trouvé, affichage du résultat
    console.log("Motif trouvé :", resultat[0]); // resultat[0] contient la chaîne correspondant au motif entier (y compris le "#quelquechose")
    console.log("Contenu du motif :", resultat[1]); // resultat[1] contient le contenu de "#quelquechose" (sans le "#")
} else {
    // Le motif n'a pas été trouvé
    console.log("Aucun motif trouvé.");
}
    return resultat
}

module.exports = { hashtagFinder };