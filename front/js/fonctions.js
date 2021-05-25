const canvas = document.getElementById('canvas1');
const divEcran = document.getElementById('ecran');

const getClickCoords = (elem, event) => { //renvoie les coords de l'event dans l'élément passé en paramètre
    const { top, left } = elem.getBoundingClientRect();
    const { clientX, clientY} = event;

    return {
        x: clientX - left,
        y: clientY - top
    };
};

const onClick = (e) => {
    let { x, y } = getClickCoords(canvas, e);

    let tmp = document.getElementById("canvas1");
    //console.log(x * ( 400 / tmp.getBoundingClientRect().width))
    x = Math.floor(x * ( 400 / tmp.getBoundingClientRect().width));
    y = Math.floor(y * ( 400 / tmp.getBoundingClientRect().width ));

    france.display(currentMap);
    affichage(matpxl, currentFiltre);

    let verifRegion = false;
    
    matriceRegions.forEach(region => {

        console.log("test");
        
        if(region.name == matpxl[x + y * 400].region){
            affBordure(region);
            
            const ctx2 = canvas.getContext('2d');
            let scannedImage = ctx2.getImageData(0, 0, canvas.width, canvas.height);
            let scannedData = scannedImage.data;
            for(let i = 0; i < 4*400*400; i += 4){
                if(matpxl[i/4].bordure == true && region.name == matpxl[i/4].region){
                    scannedData[i] = 255;
                    scannedData[i + 1] = 255;
                    scannedData[i + 2] = 255;
                }
            }
            scannedImage.data = scannedData;
            ctx2.putImageData(scannedImage, 0, 0);
            
            verifRegion = true;

            document.getElementById("actionh3").innerHTML = "Actions dans la region " + region.name;
            let ad="<div><h3 style='text-align:center;font-family:turfu; margin-bottom:3%;'>Info Régions "+region.name+"</h3> </br><i class=\"far fa-angry\"></i>Mécontentement : "+region.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+region.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+region.morts+"</br><i class=\"fas fa-users\"></i>Population : "+region.population+"</div>";
            document.getElementById("regionAff").innerHTML=ad;
        }
    });

    if (verifRegion == false) {
        france.display(currentMap);
        affichage(matpxl, currentFiltre);
        currentRegion = "";
        
        document.getElementById("actionh3").innerHTML = "Actions dans la region France";
        let ad="<p>Info Régions </br>France</br><i class=\"far fa-angry\"></i>Mécontentement : "+france.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+france.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+france.morts+"</br><i class=\"fas fa-users\"></i>Population : "+france.population+"</p>";
        document.getElementById("regionAff").innerHTML=ad;
    }
    console.log("Coordonnées  = " + x + ' ' + y);
    console.log(matpxl[x + y * 400].pop);
};

let currentRegion = "";
function affBordure(region){
    const ctx2 = canvas.getContext('2d');
    let scannedImage = ctx2.getImageData(0, 0, canvas.width, canvas.height);
    let scannedData = scannedImage.data;
    for(let i = 0; i < 4*400*400; i += 4){
        if(matpxl[i/4].bordure == true && region.name == matpxl[i/4].region){
            scannedData[i] = 255;
            scannedData[i + 1] = 255;
            scannedData[i + 2] = 255;
        }
    }
    scannedImage.data = scannedData;
    ctx2.putImageData(scannedImage, 0, 0);

    currentRegion = region;
    document.getElementById("actionh3").innerHTML = "Actions dans la region " + region.name;
    let ad="<div><h3 style='text-align:center;font-family:turfu; margin-bottom:3%;'>Infos Régions "+region.name+"</h3> </br><i class=\"far fa-angry\"></i>Mécontentement : "+region.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+region.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+region.morts+"</br><i class=\"fas fa-users\"></i>Population : "+region.population+"</div>";
    document.getElementById("regionAff").innerHTML=ad;
}



function affFrance(){
    document.getElementById("actionh3").innerHTML = "Actions dans la France";
    let ad="<div><h3 style='text-align:center;font-family:turfu; margin-bottom:3%;'>Infos France</h3> </br><i class=\"far fa-angry\"></i>Mécontentement : "+france.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+france.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+france.morts+"</br><i class=\"fas fa-users\"></i>Population : "+france.population+"</div>";
    document.getElementById("regionAff").innerHTML=ad;
}

const onClick2 = (e) => { 
    x1 = Math.floor(e.clientX);
    y1 = Math.floor(e.clientY);

    if ((x1 < 158 || x1 > 557) && x1 < 638 && y1 > 82 && (y1 < 262 || y1 > 561)){
        console.log("Coordonnées  = " + x1 + ' ' + y1);
        france.display(currentMap);
        affichage(matpxl, currentFiltre);
        currentRegion = "";

        document.getElementById("actionh3").innerHTML = "Actions dans la France";
        let ad="<p>Info Régions </br>France</br><i class=\"far fa-angry\"></i>Mécontentement : "+france.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+france.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+france.morts+"</br><i class=\"fas fa-users\"></i>Population : "+france.population+"</p>";
        document.getElementById("regionAff").innerHTML=ad;
    }
};

canvas.addEventListener('click', onClick);
divEcran.addEventListener('click', onClick2);

function initPopulation(map, dataPays, regions, villes){
    let maxReached = 0;
    console.log(dataPays);
    while(maxReached < 13){
        maxReached = 0;
        const x = Math.floor(Math.random() * map.length);
        if(map[x].region != ""){
            regions.forEach(e => {
                if(map[x].region == e.name) {
                    if((e.population + 100) < e.populationMax){
                        map[x].pop += 100;
                        e.population += 100;
                        dataPays.population += 100
                    }
                }
            });
        }
        regions.forEach(e => {
            if((e.population + 100) > e.populationMax){
                maxReached++;
            }
        });
    }
    console.log(dataPays);
    return {map, dataPays, regions}
}

function apparitionVirus(nbFoyer, map, dataPays, regions){
    for(let i = 0; i < nbFoyer; i++){
        const x = Math.floor(Math.random() * map.length);
        if(map[x].region != "" && map[x].pop > 0){
            map[x].contamines += 1;
            regions.forEach(e => {
                if(map[x].region == e.name){
                    e.contamines += 1;
                }
            });
            dataPays.contamines += 1;
            console.log("Apparition d'un cas en : " + map[x].region + " " + x%400 + " " + Math.floor(x/400));
        } else {
            i--;
        }
    }
    return {map, dataPays, regions};
}

function affichage(map, type){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let scannedData = scannedImage.data;
    //console.log(scannedData);
    let max = 0;
    if(type == "population"){
        for(let i = 0; i < map.length; i++){
            if(map[i].pop > max){
                max = map[i].pop;
            }
        }
        if(max > 0){
            for(let i = 0; i < canvas.width * canvas.height * 4; i += 4){
                scannedData[i + 2] += Math.floor(((map[i/4].pop / max) * 255) * ((255-scannedData[i + 2])/255));
            }
        }
    } else if( type == "contamines"){
        for(let i = 0; i < map.length; i++){
            if(map[i].contamines > max){
                max = map[i].contamines;
            }
        }
        if(max > 0){
            for(let i = 0; i < canvas.width * canvas.height * 4; i += 4){
                scannedData[i] += Math.floor(((map[i/4].contamines / max) * 255) * ((255-scannedData[i])/255));
            }
        }
    } else if(type == "morts"){
        for(let i = 0; i < map.length; i++){
            if(map[i].morts > max){
                max = map[i].morts;
            }
        }
        if(max > 0){
            for(let i = 0; i < canvas.width * canvas.height * 4; i += 4){
                scannedData[i + 1] += Math.floor(((map[i/4].morts / max) * 255) * ((255-scannedData[i + 1])/255));
            }
        }
    }
    
    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0);
}

function propagation(map, dataPays, regions /* + MUTATEURS */){
    console.log("propagation");
        for(let i = 0; i < map.length; i++){
            if((map[i].contamines > 0) && (i > 0) && ((i % 400) > 0)){
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93){
                    if(map[i-400].contamines < map[i-400].pop && map[i-400].region != ""){
                        regions.forEach(elem => {
                            if(map[i - 400].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i-400].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93){
                    if(map[i-1].contamines < map[i-1].pop && map[i-1].region != ""){
                        regions.forEach(elem => {
                            if(map[i - 1].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i-1].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93){
                    if(map[i+1].contamines < map[i+1].pop && map[i+1].region != ""){
                        regions.forEach(elem => {
                            if(map[i + 1].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i+1].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93){
                    if(map[i+400].contamines < map[i+400].pop && map[i+400].region != ""){
                        regions.forEach(elem => {
                            if(map[i + 400].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i+400].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45){
                    if(map[i-401].contamines < map[i-401].pop && map[i-401].region != ""){
                        regions.forEach(elem => {
                            if(map[i - 401].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i-401].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45){
                    if(map[i-399].contamines < map[i-399].pop && map[i-399].region != ""){
                        regions.forEach(elem => {
                            if(map[i - 399].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i-399].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45){
                    if(map[i+399].contamines < map[i+399].pop && map[i+399].region != ""){
                        regions.forEach(elem => {
                            if(map[i + 399].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i+399].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45){
                    if(map[i+401].contamines < map[i+401].pop && map[i+401].region != ""){
                        regions.forEach(elem => {
                            if(map[i + 401].region == elem.name){
                                elem.contamines += 1;
                            }
                        });
                        map[i+401].tmpcontamines += 1;
                        dataPays.contamines += 1;
                    }
                }
            }
        }
        for(let i = 0; i < map.length; i++){
            map[i].contamines += map[i].tmpcontamines;
            map[i].tmpcontamines = 0;
        }
        
    return {map, dataPays, regions};
}

function clone(base){
    let newArray = [];
    for(let i = 0; i < base.length; i++){
        newArray[i] = base[i];
    }
    return newArray;
}