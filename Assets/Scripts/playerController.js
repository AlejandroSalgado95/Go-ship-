#pragma strict
public var Speed : float;
private var anim : Animator;
public var onGround : boolean;
public var acceleration : float;
public var sliding : float;
public var fastfall : float;
public var jump : float;
private var aud : AudioSource;
public var audClips : AudioClip[];



private var rightBtn : movementBtn;
private var leftBtn : movementBtn;
private var upBtn : movementBtn;
private var downBtn : movementBtn;

private var HMove : float;
private var VMove : float;
private var MovePerSecond : Vector3;

private var rb  : Rigidbody;
private var gc : gameController;
private var rightRot : Quaternion;

public var Something1Hit : float;
public var Something2Hit : float;
public var motorBoatHit : float;
public var Seagull3Hit : float;


private var checkSound : int;

function Start () {
	rightBtn = GameObject.FindWithTag("RightBtn").GetComponent.<movementBtn>();
	leftBtn = GameObject.FindWithTag("LeftBtn").GetComponent.<movementBtn>();
	upBtn = GameObject.FindWithTag("UpBtn").GetComponent.<movementBtn>();
	downBtn = GameObject.FindWithTag("DownBtn").GetComponent.<movementBtn>();
	gc = GameObject.FindWithTag("GameController").GetComponent.<gameController>();
	
	checkSound = 0;
	onGround = true;

	HMove = 0.0f;
    VMove  = 0.0f;
    rb = GetComponent.<Rigidbody>();
	//anim = GetComponent.<Animator>();
	//Lag = 0.0f;
	
	aud = GetComponent.<AudioSource>();
	rightRot =  Quaternion.Euler(90, 0, 0);

}

function FixedUpdate ()
{

	
	if (rightBtn.active)
		HMove = Mathf.Lerp(HMove, 1.0f, acceleration);
	else
		HMove = Mathf.Lerp(HMove, 0, sliding);
	
	if (leftBtn.active)
		HMove = Mathf.Lerp(HMove, -1.0f, acceleration);
	else
		HMove = Mathf.Lerp(HMove, 0, sliding);
	
	if (downBtn.active && !onGround)
		VMove = Mathf.Lerp(VMove,-1.0f,fastfall);
	else
		VMove = 0.0f;
	
	
	if (upBtn.active && onGround){
	
		rb.AddForce(Vector3.forward * jump, ForceMode.Impulse);
		upBtn.active = false;
		onGround = false;
		aud.clip = audClips[0];
    	aud.Play();
	
	}
	
	
	MovePerSecond = new Vector3(HMove,0.0f,VMove) * Speed * Time.deltaTime; 
	transform.position += MovePerSecond;
	
	transform.position = new Vector3(Mathf.Clamp(transform.position.x, -15.65f, 3.38f), 
	 								 Mathf.Clamp(transform.position.y, 7.14f, 11.19f),
	 								 Mathf.Clamp(transform.position.z, -12.08f, -5.34f));
	

	 if (transform.position.z <= -12.08f){ 
	 	
	 	rb.useGravity = false; 
	 	transform.position.z = -12.08f;
	 
	 }	else {
	 	rb.useGravity = true; 
	 }
	 
	 
	 					 			 
	 if (transform.rotation != rightRot ){
	 
	 	transform.rotation = Quaternion.Lerp(transform.rotation,rightRot,0.075f); 
	 	
	 }					 
	
}


function OnCollisionEnter(col : Collision)
{
	if (col.collider.name == "Ground"){
		onGround = true;
		
		if (checkSound == 1){
		
			aud.clip = audClips[1];
	    	aud.Play();
	    }
	    
    	checkSound = 1;
	}
	
	if (col.gameObject.CompareTag("Ground")){
		onGround = true;
		Debug.Log("touched Ground");
	}
	
	if (col.collider.CompareTag("Enemy")){
	
		var knockback : Vector3 = transform.position - col.gameObject.transform.position;
		knockback = new Vector3 (knockback.x,0.0f,0.0f);
		knockback.Normalize();
		rb.velocity = Vector3.zero;
   		rb.angularVelocity = Vector3.zero; 
   		aud.clip = audClips[2];
    	aud.Play();
    	Debug.Log("HIT SOMETHING");
		
		if (col.collider.name == "motorBoatHitBox"){
		
			gc.DamagePlayer(20);
			rb.AddForce(knockback * motorBoatHit, ForceMode.Impulse);
			
		}else if (col.collider.name == "Seagull"){
			//NO ESTA ENTRANDO AQUI, QUIEN SABE POR QUE
			Debug.Log("HIT A SEAGULL");
			gc.DamagePlayer(10);
			rb.AddForce(knockback * Seagull3Hit, ForceMode.Impulse);
			
		} else if (col.collider.name == "Something2"){
			gc.DamagePlayer(10);
			rb.AddForce(knockback * Something2Hit, ForceMode.Impulse);
		
		} else{
			
			Debug.Log("HIT ANYTHING, A SEAGULL RIGHT NOW");
			gc.DamagePlayer(10);
			rb.AddForce(knockback * Seagull3Hit, ForceMode.Impulse);
		
		}
		
		
	}
}

function OnTriggerEnter(col : Collider){
	
	if (col.name == "Ground"){
		onGround = true;
		aud.clip = audClips[1];
    	aud.Play();
	}
	
	if (col.name == "BlastZone"){
		
		gc.DamagePlayer(9999);
		this.enabled = false;
	
	}
	
	/*
	if (col.CompareTag("Fish")){
	
		if (col.name == "Fish1"){
			gc.GotFish(1);
		}
		
		if (col.name == "Fish2"){
			gc.GotFish(2);
		}
		
		if (col.name == "Fish3"){
			gc.GotFish(3);
		}
	
	
	}*/

}






