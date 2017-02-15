//FUNCION PARA CALCULAR DISTANCIA DE Levenshtein RECIBE 2 CADENAS
var levDist = function(s, t) {
    var d = [];
    var n = s.length;
    var m = t.length;
    if (n == 0) return m;
    if (m == 0) return n;
    for (var i = n; i >= 0; i--) d[i] = [];
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);
        for (var j = 1; j <= m; j++) {
            if (i == j && d[i][j] > 4) return n;
            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1;
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;
            if (b < mi) mi = b;
            if (c < mi) mi = c;
            d[i][j] = mi;
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    return d[n][m];
}

//EJEMPLO DE USO DE FUNCION
var cadena1 = 'Cuanto debo del credito directo';
var cadena2 = 'Consultar credito directo';
var distancia_levenshtein = levDist(cadena1.toLowerCase(),cadena2.toLowerCase());
var longitud_maxima = 0;
if(cadena1.length>cadena2.length){  
  longitud_maxima = cadena1.length;
}else{
  longitud_maxima = cadena2.length;
}
var porcentaje_similitud = Math.round(((longitud_maxima - distancia_levenshtein) / longitud_maxima) * 100);
console.log('Distancia: '+distancia_levenshtein);
console.log('Porcentaje de similitud: '+porcentaje_similitud);