#pragma strict

private var rb : Rigidbody;
public var speed : float;
public var gotFish : GameObject;
private var gc : gameController;
private var justOnce : boolean;


function Start () {
	gc = GameObject.FindWithTag("GameController").GetComponent.<gameController>();
	rb = GetComponent.<Rigidbody>();
	rb.velocity = new Vector3(0,0,speed);
	justOnce = true;
}

function Update () {
	
	rb.velocity = new Vector3(speed,0,0);
}



function OnTriggerEnter (other : Collider){

	if (other.gameObject.CompareTag("Player")){
		Instantiate(gotFish, transform.position, gotFish.transform.rotation);
		
		if (justOnce) {
		
			gc.GotFish(2);
		}
		
		justOnce = false;
		Destroy(gameObject);
	}
}