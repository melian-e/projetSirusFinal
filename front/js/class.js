class Pays{
    constructor(imageRegions, imagePropa, imageSatellite, mecontentement, contamines, morts, population, recovered) {
        this.imageRegions = imageRegions;
        this.imagePropa = imagePropa;
        this.imageSatellite = imageSatellite;
        this.mecontentement = mecontentement;
        this.contamines = contamines;
        this.morts = morts;
        this.population = population;
        this.recovered = recovered;
    }
    display(img){
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let scannedImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return this.matrice(scannedImg.data);
    }



    matrice(img){
        let matrice = [];

        for (let i = 0; i < 400*400*4; i+=4){
            let data = new Object();

            data.pop = 0;
            data.contamines = 0;
            data.tmpcontamines = 0;
            data.morts = 0;
            data.gueris = 0;
            
            if(img[i] == 220 && img[i+1] == 41 && img[i+2] == 22){
                data.region = "Hauts-de-France";
            }
            else if(img[i] == 225 && img[i+1] == 126 && img[i+2] == 48){
                data.region = "Grand Est";
            }
            else if(img[i] == 240 && img[i+1] == 142 && img[i+2] == 85){
                data.region = "Île-de-France";
            }
            else if(img[i] == 230 && img[i+1] == 41 && img[i+2] == 22){
                data.region = "Bourgogne-Franche-Comté";
            }
            else if(img[i] == 235 && img[i+1] == 189 && img[i+2] == 144){
                data.region = "Centre-Val de Loire";
            }
            else if(img[i] == 225 && img[i+1] == 41 && img[i+2] == 22){
                data.region = "Pays de la Loire";
            }
            else if(img[i] == 249 && img[i+1] == 142 && img[i+2] == 85){
                data.region = "Bretagne";
            }
            else if(img[i] == 230 && img[i+1] == 126 && img[i+2] == 48){
                data.region = "Normandie";
            }
            else if(img[i] == 255 && img[i+1] == 142 && img[i+2] == 85){
                data.region = "Nouvelle-Aquitaine";
            }
            else if(img[i] == 235 && img[i+1] == 126 && img[i+2] == 48){
                data.region = "Auvergne-Rhône-Alpes";
            }
            else if(img[i] == 215 && img[i+1] == 41 && img[i+2] == 22){
                data.region = "Occitanie";
            }
            else if(img[i] == 245 && img[i+1] == 142 && img[i+2] == 85){
                data.region = "Provence-Alpes-Côte d'Azur";
            }
            else if(img[i] == 240 && img[i+1] == 189 && img[i+2] == 144){
                data.region = "Corse";
            }
            else{
                data.region = "";
            }

            
            if(((i/4) > 400) && (((i/4) % 400) > 0)){
                if(matrice[i/4 - 400].region != data.region){
                    matrice[i/4 - 400].bordure = true;
                    data.bordure = true;
                } else if(matrice[i/4 - 1].region != data.region){
                    matrice[i/4 - 1].bordure = true;
                    data.bordure = true;
                } else {
                    data.bordure = false;
                }
            }
            
            
            matrice.push(data);
        }

        return matrice;
    }
}

class Region{
    constructor(name, color, mecontentement, contamines, morts, population, populationMax, recovered){
        this.name = name;
        this.color = color;
        this.mecontentement = mecontentement;
        this.contamines = contamines;
        this.morts = morts;
        this.population = population;
        this.populationMax = populationMax;
        this.recovered = recovered;
    }

}

class Ville{
    constructor(rayon, densite, x, y, population){
        this.rayon = rayon;
        this.densite = densite;
        this.x = x;
        this.y = y;
        this.population = population;
    }
    
}