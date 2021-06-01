var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed;
var lastFeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  
  if(lastFeed > 12){
    fill("BLACK");
    text("Last Fed : " + (lastFeed-12) + " PM", 400 ,30) ; 
  }
  else if(lastFeed === 12){
    fill("BLACK");
    text("Last Fed : 12 PM", 400 ,30);
  }
  else if(lastFeed === 0 ){
    fill("BLACK");
    text("Last Fed : 12 AM" , 400 ,30);
  }
  else{
    fill("BLACK");
    text("Last Fed : " + lastFeed + " AM", 400 ,30);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  if(foodS>0){
    foodS = foodS-1
  }
  foodObj.updateFoodStock(foodS);

  lastFeed = hour() ;

  database.ref('/').set({
    Food:foodS,
    lastFed: lastFeed
  }) 

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
