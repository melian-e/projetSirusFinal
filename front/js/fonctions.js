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

    socket.emit('json', '');    
    
    let { x, y } = getClickCoords(canvas, e);

    //console.log(x * ( 400 / tmp.getBoundingClientRect().width))
    x = Math.floor(x * ( 400 / canvas.getBoundingClientRect().width));
    y = Math.floor(y * ( 400 / canvas.getBoundingClientRect().width ));

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
            let ad="<div><h3 style='text-align:center;font-family:turfu; margin-bottom:3%;'>Infos Régions "+region.name+"</h3> </br><i class=\"far fa-angry\"></i>Mécontentement : "+region.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+region.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+region.morts+"</br><i class=\"fas fa-users\"></i>Population : "+region.population+"</div>";
            document.getElementById("regionAff").innerHTML=ad;
        }
    });

    if (verifRegion == false) {
        france.display(currentMap);
        affichage(matpxl, currentFiltre);
        currentRegion = "";
        
        document.getElementById("actionh3").innerHTML = "Actions dans la region France";
        let ad="<div><h3 style='text-align:center;font-family:turfu; margin-bottom:3%;'>Infos France</h3></br><i class=\"far fa-angry\"></i>Mécontentement : "+france.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+france.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+france.morts+"</br><i class=\"fas fa-users\"></i>Population : "+france.population+"</div>";
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
    let { x, y } = getClickCoords(canvas, e);

    //console.log(x * ( 400 / tmp.getBoundingClientRect().width))
    x = Math.floor(x * ( 400 / canvas.getBoundingClientRect().width));
    y = Math.floor(y * ( 400 / canvas.getBoundingClientRect().width));

    x1 = Math.floor(e.clientX);
    y1 = Math.floor(e.clientY);


    if (((x < 0  || x > 398) || (y < 0 || y > 398)) && x1 < divEcran.getBoundingClientRect().width/2 && y1 > 82 ){
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

function initPopulation(map, dataPays, regions){
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
            map[x].contamines += 10;
            regions.forEach(e => {
                if(map[x].region == e.name){
                    e.contamines += 10;
                }
            });
            dataPays.contamines += 10;
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
                max = Math.floor(map[i].pop);
            }
        }
        if(max > 0){
            for(let i = 0; i < canvas.width * canvas.height * 4; i += 4){
                scannedData[i + 2] += Math.floor(((map[i/4].pop / max) * 255) * ((255-scannedData[i + 2])/255));
                if(map[i/4].pop > 0 && (scannedData[i + 2] > 10 && scannedData[i + 2] < 150)){
                    scannedData[i + 2] += 40;
                }
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
                if(map[i/4].contamines > 0 && (scannedData[i] > 10 && scannedData[i] < 150)){
                    scannedData[i] += 40;
                }
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
                if(map[i/4].morts > 0 && (scannedData[i] > 10 && scannedData[i] < 150)){
                    scannedData[i] += 40;
                }
            }
        }
    }
    
    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0);
}

function propagation(map, dataPays, regions /* + MUTATEURS */){
    console.log("propagation");

    let chanceContamination = 5;
    let chanceMort = 0.001;
    let chanceGuerison = 0.003;
    if(dataPays.contamines > 10000){
        chanceMort *= 2;
    }

        for(let i = 0; i < map.length; i++){
            chanceContamination = 5;
            matriceRegions.forEach(e => {
                if(e.name == map[i].region){
                    if(e.action[0] == true && e.action[5] == true){
                        chanceContamination -= 1;
                    } else if(e.action[0] == true){
                        chanceContamination -= 1;
                    } else if(e.action[5] == true){
                        chanceContamination -= 0.15;
                    }
                    if(e.action[1] == true && e.action[3] == true){
                        chanceContamination -= 0.25;
                    } else if(e.action[1] == true){
                        chanceContamination -= 0.15;
                    } else if(e.action[3] == true){
                        chanceContamination -= 0.1;
                    }
                    if(e.action[2] == true){
                        chanceContamination -= 0.3;
                    }
                    if(e.action[0] == false && e.action[5] == false && e.action[6] == true){
                        chanceContamination -= 0.05;
                    }
                    if(e.action[0] == false && e.action[5] == false && e.action[7] == true){
                        chanceContamination -= 0.05;
                    }
                    if(e.action[0] == false && e.action[5] == false && e.action[10] == true){
                        chanceContamination -= 0.02;
                    }
                    if(e.action[0] == false && e.action[5] == false && e.action[11] == true){
                        chanceContamination -= 0.03;
                    }
                    if(e.action[0] == false && e.action[5] == false && e.action[12] == true){
                        chanceContamination -= 0.08;
                    }
                }
            });


            if((map[i].contamines > 0) && (i > 0) && ((i % 400) > 0)){
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93 && (Math.random() * 100 < chanceContamination)){
                    if((map[i-400].contamines + Math.floor(map[i - 400].pop / 1000)) < map[i-400].pop && map[i-400].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i - 400].region == elem.name){
                                    if((map[i].region != map[i - 400].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i - 400].pop / 1000);
                                            map[i-400].tmpcontamines += 1 + Math.floor(map[i - 400].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i - 400].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i - 400].pop / 1000);
                                        map[i-400].tmpcontamines += 1 + Math.floor(map[i - 400].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i - 400].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93 && (Math.random() * 100 < chanceContamination)){
                    if((map[i-1].contamines + Math.floor(map[i - 1].pop / 1000)) < map[i-1].pop && map[i-1].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i - 1].region == elem.name){
                                    if((map[i].region != map[i - 1].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i - 1].pop / 1000);
                                            map[i-1].tmpcontamines += 1 + Math.floor(map[i - 1].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i - 1].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i - 1].pop / 1000);
                                        map[i-1].tmpcontamines += 1 + Math.floor(map[i - 1].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i - 1].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93 && (Math.random() * 100 < chanceContamination)){
                    if((map[i+1].contamines + Math.floor(map[i + 1].pop / 1000)) < map[i+1].pop && map[i+1].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i + 1].region == elem.name){
                                    if((map[i].region != map[i + 1].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i + 1].pop / 1000);
                                            map[i+1].tmpcontamines += 1 + Math.floor(map[i + 1].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i + 1].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i + 1].pop / 1000);
                                        map[i+1].tmpcontamines += 1 + Math.floor(map[i + 1].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i + 1].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 93 && (Math.random() * 100 < chanceContamination)){
                    if((map[i+400].contamines + Math.floor(map[i + 400].pop / 1000)) < map[i+400].pop && map[i+400].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i + 400].region == elem.name){
                                    if((map[i].region != map[i + 400].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i + 400].pop / 1000);
                                            map[i+400].tmpcontamines += 1 + Math.floor(map[i + 400].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i + 400].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i + 400].pop / 1000);
                                        map[i+400].tmpcontamines += 1 + Math.floor(map[i + 400].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i + 400].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45 && (Math.random() * 100 < chanceContamination)){
                    if((map[i-401].contamines + Math.floor(map[i - 401].pop / 1000)) < map[i-401].pop && map[i-401].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i - 401].region == elem.name){
                                    if((map[i].region != map[i -401].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i - 401].pop / 1000);
                                            map[i-401].tmpcontamines += 1 + Math.floor(map[i - 401].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i - 401].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i - 401].pop / 1000);
                                        map[i-401].tmpcontamines += 1 + Math.floor(map[i - 401].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i - 401].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45 && (Math.random() * 100 < chanceContamination)){
                    if((map[i-399].contamines + Math.floor(map[i - 399].pop / 1000)) < map[i-399].pop && map[i-399].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i - 399].region == elem.name){
                                    if((map[i].region != map[i -399].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i - 399].pop / 1000);
                                            map[i-399].tmpcontamines += 1 + Math.floor(map[i - 399].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i - 399].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i - 399].pop / 1000);
                                        map[i-399].tmpcontamines += 1 + Math.floor(map[i - 399].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i - 399].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45 && (Math.random() * 100 < chanceContamination)){
                    if((map[i+399].contamines + Math.floor(map[i + 399].pop / 1000)) < map[i+399].pop && map[i+399].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i + 399].region == elem.name){
                                    if((map[i].region != map[i +399].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i + 399].pop / 1000);
                                            map[i+399].tmpcontamines += 1 + Math.floor(map[i + 399].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i + 399].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i + 399].pop / 1000);
                                        map[i+399].tmpcontamines += 1 + Math.floor(map[i + 399].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i + 399].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
                if((Math.random() * 100) * ((map[i].contamines / map[i].pop) / 2 + 0.5) > 45 && (Math.random() * 100 < chanceContamination)){
                    if((map[i+401].contamines + Math.floor(map[i + 401].pop / 1000)) < map[i+401].pop && map[i+401].region != ""){
                        regions.forEach(elem => {
                            regions.forEach(elem2 => {
                                if(map[i].region == elem2.name && map[i + 401].region == elem.name){
                                    if((map[i].region != map[i +401].region) && (elem.action[4] != elem2.action[4])){
                                        if(Math.random() * 100 > 5){
                                            elem.contamines += 1 + Math.floor(map[i + 401].pop / 1000);
                                            map[i+401].tmpcontamines += 1 + Math.floor(map[i + 401].pop / 1000);
                                            dataPays.contamines += 1 + Math.floor(map[i + 401].pop / 1000);
                                        }
                                    } else {
                                        elem.contamines += 1 + Math.floor(map[i + 401].pop / 1000);
                                        map[i+401].tmpcontamines += 1 + Math.floor(map[i + 401].pop / 1000);
                                        dataPays.contamines += 1 + Math.floor(map[i + 401].pop / 1000);
                                    }
                                }
                            });
                        });
                    }
                }
            }
            if(Math.random() < chanceMort && map[i].contamines > 0){
                regions.forEach(elem => {
                    if(map[i].region == elem.name){
                        
                        map[i].morts += 1 + 30*Math.floor(elem.contamines / (elem.population));
                        map[i].contamines -= 1 + 30*Math.floor(elem.contamines / (elem.population));
                        map[i].pop -= 1 + 30*Math.floor(elem.contamines / (elem.population));

                        elem.contamines -= 1 + 30*Math.floor(elem.contamines / (elem.population));
                        elem.morts += 1 + 30*Math.floor(elem.contamines / (elem.population));
                        elem.population -= 1 + 30*Math.floor(elem.contamines / (elem.population));

                        dataPays.contamines -= 1 + 30*Math.floor(elem.contamines / (elem.population));
                        dataPays.population -= 1 + 30*Math.floor(elem.contamines / (elem.population));
                        dataPays.morts += 1 + 30*Math.floor(elem.contamines / (elem.population));
                    }
                });
            }
            if(Math.random() < chanceGuerison && map[i].contamines > 0){
                regions.forEach(elem => {
                    if(map[i].region == elem.name){
                        
                        map[i].recovered += 1 + 10*Math.floor(elem.contamines / (elem.population));
                        map[i].contamines -= 1 + 10*Math.floor(elem.contamines / (elem.population));

                        elem.recovered += 1 + 10*Math.floor(elem.contamines / (elem.population));

                        dataPays.recovered += 1 + 10*Math.floor(elem.contamines / (elem.population));
                        dataPays.contamines -= 1 + 10*Math.floor(elem.contamines / (elem.population));
                        
                        elem.contamines -= 1 + 10*Math.floor(elem.contamines / (elem.population));
                    }
                });
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