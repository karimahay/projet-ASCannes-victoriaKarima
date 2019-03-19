/*SEARCH*/



// variables globales
var item = database[0] ;

// On attend le chargement complet de la page
window.onload=function()
{

  // initialisation du composant de table
  var table = new Vue({
      el: '#maintable',
      data: database 
  }) ;


  // initialisation du composant de fiche perso
  var app = new Vue({
      el: '#details',
      data : database 
  }) ;

  // quand on clique sur un element on maj la fiche personnelle
  $( ".item" ).on( "click", function() {
    item = database[$(this).attr("id")] ;
    app.$forceUpdate();
  });

jQuery(document).ready(function()
{
   // On cache la zone de texte
   jQuery('#details').hide();
   // toggle() lorsque le lien avec l'ID #toggler est cliqué
   jQuery('#maintable').click(function()
  {
      jQuery('#details').toggle(400);
      return false;
   });
});
  // // calcul des statistiques
  // for (i=0 ; i < database.length ; i++)
  // {
  //   stat1 ++;
  //   if (database[i].gender == "male") stat2 ++ ;
  //   if (database[i].gender == "female") stat3 ++ ;
  //   stat4 = stat4 + database[i].age ;
  // }
  // stat4 = Math.round(stat4 / stat1)+" ans";

  // // initialisation du composant de stats
  // var stat = new Vue({
  //     el: '#stats'
  // }) ;

}


/*LISTE ADHERENTS*/
// var monVue = new Vue({
//     el:"#content",
//     data: {
//         database,
//         titres :{
//             Nom : "nom",
//             Entreprise : "entreprise",
//             Age: "age"
//         },
//         search:""
//     },
//     computed:{
//         filtreNom() {
//           return this.database.filter(adherent => {
//             return adherent.name.toLowerCase().includes(this.search.toLowerCase())
//           })
//         }
//     }
// })

// variables globales

  /*POP UP*/
// On attend que la page soit chargée 
// var app = new Vue({
//   el: '#details',
//   });


// $( ".item" ).on( "click", function() {
//     item = database[$(this).attr("id")] ;
//     app.$forceUpdate();
//   });

// jQuery(document).ready(function()
// {
//    // On cache la zone de texte
//    jQuery('#clickBas').hide();
//    // toggle() lorsque le lien avec l'ID #toggler est cliqué
//    jQuery('#demo').click(function()
//   {
//       jQuery('#clickBas').toggle(400);
//       return false;
//    });
// });

  /*STATISTIQUE*/

// calcul % d'hommes et de femmes
var femmes = 0;
    var hommes = 0;
    for (var i = 0; i < database.length; i++) {
        var genederNombre = database[i].gender;
      
        if (genederNombre === "male") {
            hommes++;    
        }
        else {
          femmes++;
        } 
    }

    var moyHomme = Math.ceil(100*hommes)/database.length;
    var moyfemme = Math.ceil(100*femmes)/database.length;

// calcul moyenne d'age par Gender
    
    var accumulationH = 0;
    var accumulationF = 0;
    var j = 0;
    var a = 0;
    for (var i = 0; i < database.length; i++) {
        var agecount = database[i].age;
        var genre = database[i].gender;
        if (genre === "female") {
            accumulationF = accumulationF+database[i].age;
            j++;
        }
        else {
              accumulationH = accumulationH+database[i].age;
              a++
        }   
      }

 var moyAgefemme = Math.ceil(accumulationF/j);
 var moyAgeHomme = Math.ceil(accumulationH/a);
 var moyAgeTotale = (moyAgefemme+moyAgeHomme)/2;

 // Calcul nombre de femme ayant la moyenne d'age des Femmes

var nombreF = 0;
var nombreInf =0;
var nombreSup =0;
for (var i = 0; i < database.length; i++) {
  var C = database[i].age;
  if ((C > moyAgeTotale)) {
    nombreSup++;
  }
  else  {
    nombreInf++;
  }
  }

// Themes begin
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
// Themes end

// Graphe de moyenne d'age par Gender
var chart = am4core.create("chartdivAge", am4charts.PieChart3D);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.legend = new am4charts.Legend();

chart.data = [{
    "country": ">" +moyAgeTotale+ "ans",
    "litres": nombreSup
  },
     {
    "country": "<"+moyAgeTotale+ "ans",
    "litres": nombreInf
  }];

var series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "litres";
series.dataFields.category = "country";

// % d'Hommes Femmes
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.PieChart3D);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.legend = new am4charts.Legend();

chart.data = [{
    country: "Hommes ",
    litres: moyHomme
    },    
    {
    country: "Femmes ",
    litres: moyfemme
    }];

var series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "litres";
series.dataFields.category = "country";

/*BACK TO TOP*/

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("back-to-top").style.display = "block";
  } else {
    document.getElementById("back-to-top").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


