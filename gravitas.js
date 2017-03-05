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


function generate()
{

//addBigPlanet();

blankIt();

for(i = 0; i < Planets.length; i++)
{

    //xPositions[i] += xSpeeds[i];
   // yPositions[i] += ySpeeds[i];

    Planets[i].xposition += Planets[i].xspeed;
    Planets[i].yposition += Planets[i].yspeed;


   // xSpeeds[i] += getXAcceleration(xPositions[i], yPositions[i]);
  //  ySpeeds[i] += getYAcceleration(xPositions[i], yPositions[i]);
    Planets[i].xspeed += getXAcceleration(Planets[i].xposition, Planets[i].yposition, i);
    Planets[i].yspeed += getYAcceleration(Planets[i].xposition, Planets[i].yposition, i);
   
    //createOrbitCenter();
    cont.beginPath();
    cont.fillStyle = "orange";
    cont.arc(Planets[i].xposition, Planets[i].yposition, Planets[i].radius, 0, 2 *Math.PI);
    cont.fill();

    console.log("Planet" + i + " - " + Planets[i].xposition + " , " + Planets[i].yposition);




  }
}

function addPlanet()
{
  
  xPos = 45;
  yPos = 600;
  Xspeed = -2;
  Yspeed = 0;
  Mass = .03;
  Radius = 2;

  var p = new Planet(xPos, yPos, Xspeed, Yspeed, Mass, Radius);

  Planets.push(p);





}

 function addBigPlanet()
{
  var p = new Planet(375, 375, 0, 0, 5000, 40);

  Planets.push(p);
} 


function addSmallPlanet()
{
  var p = new Planet(700, 400, -2, -3, .03, 2);

  Planets.push(p);
}

 class Planet 
 
 {
  constructor(x, y, xs, ys, m, r)
  {
     this.xposition = x;
     this.yposition = y;
     this.xspeed = xs;
     this.yspeed = ys;
     this.mass = m;
     this.radius= r;

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