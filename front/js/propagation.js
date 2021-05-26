let france = new Pays(imgRegions, imgPropa, imgSatellite, 0, 0, 0, 0, 0);
const mecontMax = 100000;
let boolEndGame = false

let matriceRegions = [];
matriceRegions.push(new Region("Hauts-de-France", "rgb(0, 162, 217)", 0, 0, 0, 0, 5975757, 0));
matriceRegions.push(new Region("Grand Est", "rgb(135, 68, 255)", 0, 0, 0, 0, 5522476, 0));
matriceRegions.push(new Region("Île-de-France", "rgb(232, 55, 121)", 0, 0, 0, 0, 12324261, 0));
matriceRegions.push(new Region("Bourgogne-Franche-Comté", "rgb(255, 200, 0)", 0, 0, 0, 0, 2784858, 0));
matriceRegions.push(new Region("Centre-Val de Loire", "rgb(255, 254, 32)", 0, 0, 0, 0, 2561451, 0));
matriceRegions.push(new Region("Pays de la Loire", "rgb(117, 189, 55)", 0, 0, 0, 0, 3837166, 0));
matriceRegions.push(new Region("Bretagne", "rgb(0, 91, 255)", 0, 0, 0, 0, 3371158, 0));
matriceRegions.push(new Region("Normandie", "rgb(255, 106, 0)", 0, 0, 0, 0, 3305218, 0));
matriceRegions.push(new Region("Nouvelle-Aquitaine", "rgb(192, 40, 246)", 0, 0, 0, 0, 6039092, 0));
matriceRegions.push(new Region("Auvergne-Rhône-Alpes", "rgb(255, 62, 0)", 0, 0, 0, 0, 8090442, 0));
matriceRegions.push(new Region("Occitanie", "rgb(255, 199, 112)", 0, 0, 0, 0, 5985697, 0));
matriceRegions.push(new Region("Provence-Alpes-Côte d'Azur", "rgb(217, 237, 20)", 0, 0, 0, 0, 5088998, 0));
matriceRegions.push(new Region("Corse", "rgb(255, 165, 121)", 0, 0, 0, 0, 349269, 0));

let dataFrance = new Object();
dataFrance.mecontentement = france.mecontentement;
dataFrance.contamines = france.contamines;
dataFrance.morts = france.morts;
dataFrance.population = france.population;
dataFrance.recovered = france.recovered;

let matpxl;
document.addEventListener('DOMContentLoaded', function() {
    matpxl = france.display(imgRegions);
    console.log(matpxl);


    let a = initPopulation(matpxl, dataFrance, matriceRegions);
    matpxl = clone(a.map);
    dataFrance = a.dataPays;
    matriceRegions = clone(a.regions);

    a = apparitionVirus(1, matpxl, dataFrance, matriceRegions);
    matpxl = clone(a.map);
    dataFrance = a.dataPays;
    matriceRegions = clone(a.regions);

    affichage(matpxl, "population");

    let randomdeplacement = 250;
    let cmpt = 0;
    let boucle = setInterval(() => {
        a = mecontentement(matriceRegions, dataFrance);
        if(a.boolEndGame == true){
            clearInterval(boucle);
        }
        matriceRegions = clone(a.regions)
        dataFrance = a.dataf
        a = propagation(matpxl, dataFrance, matriceRegions);
        matpxl = clone(a.map);
        dataFrance = a.dataPays;
        matriceRegions = clone(a.regions);

        if((cmpt + 1) % randomdeplacement == 0){
            randomdeplacement = Math.floor(Math.random() * 1000 + 300);
            a = deplacement(matpxl, dataFrance, matriceRegions);
            matpxl = clone(a.map);
            dataFrance = a.dataPays;
            matriceRegions = clone(a.regions);

        }

        france.mecontentement = dataFrance.mecontentement;
        france.population = dataFrance.population;
        france.morts = dataFrance.morts;
        france.recovered = dataFrance.recovered;
        france.contamines = dataFrance.contamines;

        if(cmpt%1 == 0){
            france.display(currentMap);
            affichage(matpxl, currentFiltre);
            if(currentRegion != ""){
                affBordure(currentRegion);
            }
            else {
                affFrance();
            }
        }
        
        cmpt++;

    }, 100);
    
});

function mecontentement(regions, dataf){
    let sum = 0 ;
    regions.forEach(region => {
    
        for(let i = 0; i <= 12;i++){
            if (region.action[i] == true){
                region.mecontentement += jsonSave.cartes[i].mecontentement
            }
            
            if(i==12){
                region.mecontentement-= Math.floor(Math.random() * 100) + 200 ;
            }
            if(region.mecontentement < 0){
                region.mecontentement = 0;
            }
        }

        sum+= region.mecontentement;
    });

    sum = Math.floor(((sum*100)/dataf.population)*100)/100

    dataf.mecontentement = sum

    if((sum>80 && boolEndGame == false) || (dataf.contamines> dataf.population*0.6 && boolEndGame == false)){
        let minuteur = hr + " h " + min + " min "+ sec + " s";
        let message;
        if (sum>1){
            message  = "La population en à marre des mesures de restrictions et décide de se révolter"
        }
        else{
            message ="Une trop grande partie de la population est contaminé, l'économie est en chute libre, les usines sont à l'arrêt, il sera difficile de revenir à une situation normale"
        }
        
        swal({title: minuteur, 
            text: message, 
            button: "Retourner à l'accueil"}).then(()=> document.location.href="../html/index.html" )

        document.getElementById("ecran").setAttribute("style","visibility:hidden;")
        boolEndGame = true;
    }

    return {regions, dataf, boolEndGame}
}

//%*r/255*pop/surf
