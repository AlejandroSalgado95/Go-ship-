#pragma strict

private var rb : Rigidbody;
public var speed : float;
public var anim : Animator;
public var gotFish : GameObject;
private var gc : gameController;
private var justOnce : boolean;

function Start () {
	gc = GameObject.FindWithTag("GameController").GetComponent.<gameController>();
	rb = GetComponent.<Rigidbody>();
	rb.velocity = new Vector3(0,0,speed);
	//anim = GetComponent.<Animator>();
	justOnce = true;
	StartCoroutine(SwapAnimations());
}

function Update () {
	
	rb.velocity = new Vector3(speed,0,0);
}

function SwapAnimations(){

	while(true){
		
		var randomNum : int = Random.Range(1,11);
		anim.Play("jumping");
		
		/*
		if (randomNum <= 5){
		
			anim.Play("waddling");
		} else {
		
			anim.Play("jumping");

		}*/
		
		yield WaitForSeconds(Random.Range(1.2f,1.7f));
		
	}

}



function OnTriggerEnter (other : Collider){

	if (other.gameObject.CompareTag("Player")){
		Instantiate(gotFish, transform.position, gotFish.transform.rotation);	
		
		if (justOnce){
			
			gc.GotFish(3);
		}
		
		justOnce = false;
		Destroy(gameObject);
	}
}