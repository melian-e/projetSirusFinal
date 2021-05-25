let pic1
let back                                                                            //initialisation des variables images

let number = 100;                                                                   //nombre de virus
let min = 40000;                                                                    //initialisation du min, precedente et d'id pour l'ordre d'apparition des virus (dans l'ordre croissant taille)
let id;
let pres

let posX = new Array()                                                              //initialisation des variables qui paramètre les virus
let CposX = new Array()
let posY = new Array()
let CposY = new Array()
let rot = new Array()
let Crot = new Array()
let taille = new Array()


for (let i = 0 ; i < number ; i++){                                                 //initialisation a 0 des paramètre
    posX[i] = 0
    CposX[i] = 0
    posY[i] = 0
    CposY[i] = 0
    rot[i] = 0
    Crot[i] = 0
    taille[i] = 0
}


function preload() {                                                                //chargement des photos (plusieur virus car flou pas opti dont plusieur images floutee)
    pic1 = loadImage("../style/asset/virus.png")
    pic2 = loadImage("../style/asset/virus2.png")
    pic3 = loadImage("../style/asset/virus3.png")
    pic4 = loadImage("../style/asset/virus4.png")
    pic5 = loadImage("../style/asset/virus5.png")
    back = loadImage("../style/asset/backflou.jpg")

}


function setup() {
    createCanvas(displayWidth, displayHeight);                                      //setup du canvas aux de l'ecran

}

function draw() {                                                                   //rafraichissement 60 fois par seconde 
    background(back);                                                               //mise en place du background (si pas rafraichi, les images font des traines)


    for(let i = 0; i < number ; i++){                                               //parcourt de tous les virus
        if(Crot[i] == 0){                                                           //si vitesse de rotation = 0 alors virus pas paramétré
            Crot[i] = random(0.005,0.01);                                           //vitesse de rotation

            if(random(10) < 5){                                                     //random afin de déterminer les coord de spawn des virus (toujours sur les bords)
                posY[i] = random(displayHeight)

                if (random(10) < 5){
                    posX[i] = displayWidth+200                                      //position en dehors du canvas pour qu'on ne voit pas le spawn des virus
                }
                else{
                    posX[i] = -200
                }
            }
            else{
                posX[i] = random(displayWidth)

                if(random(10) < 5){
                    posY[i] = displayHeight+200;
                }
                else{
                    posY[i] = -200
                }
            }

            taille[i] = random(50,300)                                              //taille du virus

            if (taille[i] < 150){
                CposX[i] = random(-0.5,0.5);                                          // vitesse en x du virus (si -, vers la gauche, si + vers la droite)
                CposY[i] = random(-0.75,0.75);                                          // vitesse en y du virus (si -, vers la haut, si + vers la bas)    
       
            }
            else{
                CposX[i] = random(-1.75,1.75);                                          // vitesse en x du virus (si -, vers la gauche, si + vers la droite)
                CposY[i] = random(-1.75,1.75);                                          // vitesse en y du virus (si -, vers la haut, si + vers la bas)    
            }
            }

    }

    for (let i = 0; i<number;i++){                                                  //affichage de toutes les images
        for (let j = 0; j < number; j++) {                                          //determine l'ordre d'apparition des images afin que les petites soit derriere les grandes
            if (taille[j] < min && i!=0 && taille[j] > pres){
                min = taille[j]
                id = j
            }
            else if (taille[j] < min && i==0){
                min = taille[j]
                id = j
            }
        }
        pres= min
        min = 40000

        push()                                                                      //permet, avec pop de gerer l'affiche de toutes les images 
        translate(posX[id], posY[id]);                                              //translation des images car si l'on modifiait les coord de l'image, il y aurait des problèmes avec la rotation
        rotate(rot[id]);                                                            //rotation de l'image
        imageMode(CENTER)                                                           //origine de l'image au centre et non en haut à gauche

        if(taille[id] > 250){                                                       //affichage de l'image, une image différente en fonction de la taille afin d'appliquer un flou
            image(pic1, 0, 0, taille[id], taille[id])
        }
        else if(taille[id] < 250  && taille[id] > 200){
            image(pic2, 0, 0, taille[id], taille[id])
        }
        else if(taille[id] < 200  && taille[id] > 150){
            image(pic3, 0, 0, taille[id], taille[id])
        }
        else if(taille[id] < 150  && taille[id] > 100){
            image(pic4, 0, 0, taille[id], taille[id])
        }
        else {
            image(pic5, 0, 0, taille[id], taille[id])
        }


        posX[id] += CposX[id]                                                       //incremente la position en x pour faire avancer
        posY[id] += CposY[id]                                                       //incremente la position en y pour faire avancer
        rot[id] += Crot[id]                                                         //incremente la rotation

        pop()

    }

    for(let i = 0; i < number ; i++){
        if(posX[i] > (displayWidth+200) || posX[i] < -200 || posY[i] > (displayHeight+200) || posY[i] < -200){          //si un virus a atteint le bout du canvas, on le reinitialise
            posX[i] = 0;
            CposX[i] = 0;
            posY[i] = 0;
            CposY[i] = 0;
            rot[i] = 0;
            Crot[i] = 0
            taille[i] = 0
        }
    }

}