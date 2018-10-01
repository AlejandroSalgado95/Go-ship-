#pragma strict

private var rb : Rigidbody;
public var speed : float;
public var gc : gameController;

function Start () {
	gc = GameObject.FindWithTag("GameController").GetComponent.<gameController>();
	rb = GetComponent.<Rigidbody>();
	checkVelocity();
	
	rb.velocity = new Vector3(0,0,speed);
	
}

function Update () {
	
	rb.velocity = new Vector3(speed,0,0);
}


function checkVelocity(){

	if (gameObject.name == "Seagull"){
	
		speed = gc.seagullIncSpeed;
	
	}else if (gameObject.name == "motorBoat"){
	
		speed = gc.motorboatIncSpeed;
	
	}else if (gameObject.name == "TinyLightBuoy2"){ 
	
	
		speed = gc.buoyIncSpeed;
	
	}


}