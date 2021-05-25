let france = new Pays(imgRegions, imgPropa, imgSatellite, 0, 0, 0, 0, 0);

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

let villes = [];
//ici creation des villes

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


    let a = initPopulation(matpxl, dataFrance, matriceRegions, villes);
    matpxl = clone(a.map);
    dataFrance = a.dataPays;
    matriceRegions = clone(a.regions);

    a = apparitionVirus(5, matpxl, dataFrance, matriceRegions);
    matpxl = clone(a.map);
    dataFrance = a.dataPays;
    matriceRegions = clone(a.regions);

    affichage(matpxl, "population");

    let cmpt = 0;
    setInterval(() => {
        a = propagation(matpxl, dataFrance, matriceRegions);
        matpxl = clone(a.map);
        dataFrance = a.dataPays;
        matriceRegions = clone(a.regions);

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

//%*r/255*pop/surf
