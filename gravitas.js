//Zach Teutsch
//Array test Javascript
//January 26th, 2017



var can = document.getElementById("myCanvas");
var cont = can.getContext("2d");

//orbit center variables (OC)

/*var xOC = 350;
var yOC = 350;
var radiusOC = 30;
var massOC = 2000; */

 //createOrbitCenter();

//planet variables

var Planets = [];

setInterval(generate, 20);

function generate()
{



blankIt();

for(i = 0; i < Planets.length; i++)
{

    //xPositions[i] += xSpeeds[i];
   // yPositions[i] += ySpeeds[i];

   if(walls){
   WallCollision(i);
    }

//  BallCollision();

  if(Planets[i].fixed == false){
    Planets[i].xposition += Planets[i].xspeed;
    Planets[i].yposition += Planets[i].yspeed;
  }


   // xSpeeds[i] += getXAcceleration(xPositions[i], yPositions[i]);
  //  ySpeeds[i] += getYAcceleration(xPositions[i], yPositions[i]);
    Planets[i].xspeed += getXAcceleration(Planets[i].xposition, Planets[i].yposition, i);
    Planets[i].yspeed += getYAcceleration(Planets[i].xposition, Planets[i].yposition, i);




    //createOrbitCenter();
    cont.beginPath();
    cont.fillStyle = "orange";
    cont.arc(Planets[i].xposition, Planets[i].yposition, Planets[i].radius, 0, 2 *Math.PI);
    cont.stroke();

    //console.log("Planet" + i + " - " + Planets[i].xposition + " , " + Planets[i].yposition);




  }
}

var planetXpos = 475;
var planetYpos = 0;
var planetXspeed = -2.5;
var planetYspeed = 2.5;
var planetMass = .01;

var walls = false;

function toggleWalls(){

  walls = !walls;

}

var c;
var v = false;



function toggleContinualAdding(){

  v = !v;

  if(v == false){
    clearInterval(c);
  }else{
    c = setInterval(addCustomPlanet, 200);
  }




}

function check(){

  console.log(planetMass);
}

setInterval(check, 1000);


function savePlanet(){

  planetXpos = document.getElementById("iXP").value * 1;
  planetYpos = document.getElementById("iYP").value * 1;

  planetXspeed = document.getElementById("iXS").value * 1;
  planetYspeed = document.getElementById("iYS").value * 1;

  planetMass = document.getElementById("iMS").value * 1;

  if(planetXpos > 950){

    document.getElementById("iXP").value = 950;
    planetXpos = 950;


  }else if(planetXpos < 0){

    document.getElementById("iXP").value = 0;
    planetXpos = 0;

  }


  if(planetYpos > 750){

    document.getElementById("iYP").value = 750;
    planetYpos = 750;


  }else if(planetYpos < 0){

    document.getElementById("iYP").value = 0;
    planetYpos = 0;

  }

  if(planetMass > 3000){

    document.getElementById("iMS").value = 3000;
    planetMass = 3000;

  }else if(planetMass < .000001){

    document.getElementById("iMS").value = .000001;
    planetMass = .000001;


  }


}

function addCustomPlanet(){

  var newP = new Planet(planetXpos, planetYpos, planetXspeed, planetYspeed,
    planetMass, false);

  Planets.push(newP);

}


function addPlanet()
{


  xPos = 950 * Math.random();
  yPos = 750 * Math.random();
  Xspeed = 4 *  Math.random();
  Yspeed = 4 * Math.random();
  Mass = 3000 * Math.random();
  fixState = false;

  var p = new Planet(xPos, yPos, Xspeed, Yspeed, Mass, fixState);

  Planets.push(p);





}

function addFixedPlanet(){

  var p = new Planet(475, 375, 0, 0, 4500, true);

  Planets.push(p);

}


 function addBigPlanet()
{
  var p = new Planet(130, 475, 2.5, 2.5, 2000, false);

  Planets.push(p);
}


function addSmallPlanet()
{
  var p = new Planet(700, 400, 3, 3.3, 4500, false);

  Planets.push(p);
}

function removeLastPlanet(){

  Planets.pop();
  
}

 class Planet

 {
  constructor(x, y, xs, ys, m, bl)
  {
     this.xposition = x;
     this.yposition = y;
     this.xspeed = xs;
     this.yspeed = ys;
     this.mass = m;

     this.radius = 3 + m / 100;

  /*   if(m < 10){

       this.radius = 3;

     }else if(m < 100){

       this.radius = 8;

     }else if(m < 400){

       this.radius = 10;

     }else if(m < 800){

       this.radius = 14;

     }else if(m < 1500){

       this.radius = 18;

     }else if(m < 3000){

       this.radius = 22;

     }else if(m < 4500){

       this.radius = 25;

     }else if(m < 6000){

       this.radius = 38;

     }

*/

     this.fixed = bl;

  }




}


function blankIt(){

  cont.fillStyle = "white";
  cont.fillRect(0, 0, can.width, can.height);

}

function createOrbitCenter(){

  cont.beginPath();
  cont.fillStyle = "orange";
  cont.arc(xOC, yOC, radiusOC, 0, 2*Math.PI);
  cont.fill();


}
/*
function getDistanceFromCenter(pX, pY){
  var distanceX = Math.abs(xOC - pX);
  var distanceY = Math.abs(yOC - pY);
  var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  return distance;
}
function getXDistanceFromCenter(pX){
  return Math.abs(xOC - pX);
}
function getYDistanceFromCenter(pY){
  return Math.abs(xOC - pY);
} */

function getXAcceleration(pX, pY, arrayPos)
{

 /* var distanceX = xOC - pX;
  var distanceY = yOC - pY;

  var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

  var acceleration = massOC/Math.pow(distance, 2);


  return (distanceX/distance) * acceleration; */
  var Xforce = 0;
  for(g = 0; g < Planets.length; g++)
  {
   if(g != arrayPos)
   {
     var distanceX = Planets[g].xposition - pX;
     var distanceY = Planets[g].yposition - pY;
     var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
     var MassProduct = Planets[g].mass * Planets[arrayPos].mass;
     var TForce = MassProduct/Math.pow(distance, 2);
     var f = distanceX/distance * TForce;
      Xforce += f;
    }
  }


  return Xforce/Planets[arrayPos].mass;

}
// * Planets[arrayPos].Mass
function getYAcceleration(pX, pY, arrayPos)
{

  /*var distanceX = xOC - pX;
  var distanceY = yOC - pY;

  var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

  var acceleration = massOC/Math.pow(distance, 2); */
  var Yforce = 0;
  for(g = 0; g < Planets.length; g++)
  {
   if(g != arrayPos)
   {
     var distanceX = Planets[g].xposition - pX;
     var distanceY = Planets[g].yposition - pY;
     var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
     var MassProduct = Planets[g].mass * Planets[arrayPos].mass;
     var TForce = MassProduct/Math.pow(distance, 2);
     var f = distanceY/distance * TForce;

      Yforce += f;
    }
  }

  return Yforce/Planets[arrayPos].mass;


}



function WallCollision(i)
{
 var r = Planets[i].radius;

if(Planets[i].xposition + r > can.width && Planets[i].xspeed > 0
  || Planets[i].xposition - r < 0 && Planets[i].xspeed < 0)
  Planets[i].xspeed = -Planets[i].xspeed;

if (Planets[i].yposition + r > can.height && Planets[i].yspeed > 0
  || Planets[i].yposition -r < 0 && Planets[i].yspeed < 0)
  Planets[i].yspeed = -Planets[i].yspeed;


}


/* function BallCollision(){

  for(a = 0; a < Planets.length; a++){

    for(b = 0; b < Planets.length; b++){

      if(a != b){
        var radiusSum = Planets[a].radius + Planets[b].radius;

        var distanceXB = Planets[a].xposition - Planets[b].xposition;
        var distanceYB = Planets[a].yposition - Planets[b].yposition;

        var distanceBtwn = Math.sqrt(Math.pow(distanceXB, 2)
          + Math.pow(distanceYB, 2));

        if(distanceBtwn < radiusSum){

          if(Planets[a].mass >= Planets[b].mass){

            Planets[a].mass += Planets[b].mass;

            Planets[a].radius = 3 + Planets[a].mass / 100;

            Planets.slice(b, 1);

          }else if(Planets[a].mass < Planets[b].mass){

            Planets[b].mass += Planets[a].mass;

            Planets[b].radius = 3 + Planets[b].mass / 100;

            Planets.slice(a, 1);



          }



        }



        }

        break;
      }




    }



  }

  */
