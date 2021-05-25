socket.emit('json', '');                                    //demande au server de l'envoie du JSON des actions

socket.on('jsonaction', json =>{                            //reception JSON
    //console.table(json.cartes)

    document.getElementById("action").innerHTML = document.getElementById("action").innerHTML + "<h3 style='text-align:center;margin-bottom:7%; font-family:turfu;' id='actionh3'>Actions dans la region </h3>"
    for (let i=0; i<json.cartes.length; i++){
        let id = json.cartes[i].id
        document.getElementById("action").innerHTML = document.getElementById("action").innerHTML + "<div class='listeningaction'><a onclick='supression("+id+")'><img src='../style/asset/flechecote.png' style='width:3%;' id='"+id+"img'>  " + json.cartes[i].titre +  "</a><input type='checkbox' class='apple-switch' style='position:relative; float:right; margin-top:-1%; margin-right:2%;' onclick='repCheckbox("+id+")' id='"+id+"check'><br><div style='display:none;' id='"+id+"'>"+ json.cartes[i].resume+ "</div></div>"   
    }
                                                            //ecriture dans l'html des infosmations du JSON
    
});

let genre = 'map'
document.getElementById("filtres").innerHTML += "<h3 style='text-align:center; margin-bottom:5%; font-family: turfu;'>Filtres de la map</h3>"
document.getElementById("filtres").innerHTML += "<div style='margin-left:2%; margin-bottom:1%;' class='listeningaction'>Map des régions<input type='checkbox' id='map1' onclick='checkfiltres(genre,1)' class='apple-switch' style='position:relative; float:right; margin-right:2%;' checked disabled></div></br>"
document.getElementById("filtres").innerHTML += "<div style='margin-left:2%' class='listeningaction'>Map neutre<input type='checkbox' id='map2' onclick='checkfiltres(genre,2)' class='apple-switch' style='position:relative; float:right; margin-right:2%;' ></div></br>"
document.getElementById("filtres").innerHTML += "<div style='margin-left:2%' class='listeningaction'>Map vue satellite<input type='checkbox' id='map3' onclick='checkfiltres(genre,3)' class='apple-switch' style='position:relative; float:right; margin-right:2%;' ></div>" 

let genre2 = 'filtre'
document.getElementById("filtres").innerHTML += "<p style='border-top: solid; margin-left:10%; margin-right:10%;border-width: 2px;'></p><div style='margin-left:2%' class='listeningaction'>Population<input type='checkbox' id='filtre1' onclick='checkfiltres(genre2,1)' class='apple-switch' style='position:relative; float:right; margin-right:2%;' checked disabled></div></br>"
document.getElementById("filtres").innerHTML += "<div style='margin-left:2%' class='listeningaction'>Contaminés<input type='checkbox' id='filtre2' onclick='checkfiltres(genre2,2)' class='apple-switch' style='position:relative; float:right; margin-right:2%;' ></div></br>"
document.getElementById("filtres").innerHTML += "<div style='margin-left:2%' class='listeningaction'>Décédés<input type='checkbox' id='filtre3' onclick='checkfiltres(genre2,3)' class='apple-switch' style='position:relative; float:right; margin-right:2%;' ></div>" 

function supression(id){                                    //fait apparaitre ou disparaitre le resume d'une action
    if(window.getComputedStyle(document.getElementById(id), null).getPropertyValue("display") == "none"){
        document.getElementById(id).setAttribute("style", "display:block; margin-left:5%;")
        document.getElementById(id+'img').setAttribute("src", "../style/asset/flechebas.png");
    }
    else{
        document.getElementById(id).setAttribute("style", "display:none;")
        document.getElementById(id+'img').setAttribute("src", "../style/asset/flechecote.png");
    }
}

function repCheckbox(id){                                   //message si checkbox est coche
    if(document.getElementById(id).checked == true){
    }
    
}

let currentMap = imgRegions;
let currentFiltre = "population";
function checkfiltres(genre, id){                          //regarde si un autre filtre est selectionne et deselectionne celui qui est selectionne lors d'un changement de filtre
    let id2
    let id3

    document.getElementById(genre+id).setAttribute("disabled", "")
    let canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    if(id == 1){
        id2 = 2
        id3 = 3
        if(genre == 'map'){
            france.display(imgRegions);
            currentMap = imgRegions;
            affichage(matpxl, currentFiltre);
        }
        if(genre == 'filtre'){
            france.display(currentMap);
            affichage(matpxl, "population");
            currentFiltre = "population";
        }
    }
    else if(id == 2){
        id2 = 1
        id3 = 3
        if(genre == 'map'){
            france.display(imgPropa);
            currentMap = imgPropa;
            affichage(matpxl, currentFiltre);
        }
        if(genre == 'filtre'){
            france.display(currentMap);
            affichage(matpxl, "contamines");
            currentFiltre = "contamines";
        }
    }
    else{
        id2 = 1
        id3 = 2
        if(genre == 'map'){
            france.display(imgSatellite);
            currentMap = imgSatellite;
            affichage(matpxl, currentFiltre);
        }
        if(genre == 'filtre'){
            france.display(currentMap);
            affichage(matpxl, "morts");
            currentFiltre = "morts";
        }
    }

    if(document.getElementById(genre+id).checked == true){
        document.getElementById(genre+id2).checked = false
        document.getElementById(genre+id3).checked = false
        document.getElementById(genre+id2).removeAttribute("disabled", "")
        document.getElementById(genre+id3).removeAttribute("disabled", "")
    }


}

let hauteurfenetre = window.innerHeight;
document.body.style.backgroundSize = "auto " + hauteurfenetre + "px";
let cvns = document.getElementById('canvas1');
cvns.style.height = hauteurfenetre * 0.73 + "px";
cvns.style.width = hauteurfenetre * 0.73 + "px";
cvns.style.left = hauteurfenetre * 0.098 + "px";
cvns.style.top = hauteurfenetre * 0.17 + "px";