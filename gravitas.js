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

    console.log("Planet" + i + " - " + Planets[i].xposition + " , " + Planets[i].yposition);




  }
}

var planetXpos = 375;
var planetYpos = 0;
var planetXspeed = -2.5;
var planetYspeed = 2.5;
var planetMass = .01;

var walls = false;

function toggleWalls(){

  walls = !walls;

}


function updatePlanets(){

  planetXpos = document.getElementById("iXP").value;
  planetYpos = document.getElementById("iYP").value;

  planetXspeed = document.getElementById("iXS").value;
  planetYspeed = document.getElementById("iYS").value;

  planetMass = document.getElementById("iMS").value;

}


function addPlanet()
{


  xPos = planetXpos;
  yPos = planetYpos;
  Xspeed = planetXspeed;
  Yspeed = planetYspeed;
  Mass = planetMass;
  Radius = 8;
  fixState = false;

  var p = new Planet(xPos, yPos, Xspeed, Yspeed, Mass, Radius, fixState);

  Planets.push(p);





}

function addFixedPlanet(){

  var p = new Planet(375, 375, 0, 0, 4000, 40, true);

  Planets.push(p);

}


 function addBigPlanet()
{
  var p = new Planet(375, 0, 2.5, 2.5, 4000, 40, false);

  Planets.push(p);
}


function addSmallPlanet()
{
  var p = new Planet(700, 400, 3, 3.3, 4500, 8, false);

  Planets.push(p);
}

 class Planet

 {
  constructor(x, y, xs, ys, m, r, bl)
  {
     this.xposition = x;
     this.yposition = y;
     this.xspeed = xs;
     this.yspeed = ys;
     this.mass = m;
     this.radius = r;
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

/*function BallCollision(i)
{

 var Tr = Planets[g].radius + Planets[i].radius;
for(var g = 0; g < Planets.length; g++)
{
  if(g != i)
  {

    var distanceX = Planets[g].xposition - Planets[i];
    var distanceY = Planets[g].yposition - i;
    var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    if(distance < Tr)
    {

    }


  }

}



}


} */
