#pragma strict
public var Speed : float;
private var anim : Animator;
public var onGround : boolean;
public var acceleration : float;
public var sliding : float;
public var jump : float;


private var aud : AudioSource;

private var rightBtn : movementBtn;
private var leftBtn : movementBtn;
private var upBtn : movementBtn;

private var HMove : float;
private var VMove : float;
private var MovePerSecond : Vector3;

private var rb  : Rigidbody;
private var gc : gameController;
private var rightRot : Quaternion;

public var buoyHit : float;
public var sharkHit : float;
public var motorBoatHit : float;

function Start () {
	rightBtn = GameObject.FindWithTag("RightBtn").GetComponent.<movementBtn>();
	leftBtn = GameObject.FindWithTag("LeftBtn").GetComponent.<movementBtn>();
	upBtn = GameObject.FindWithTag("UpBtn").GetComponent.<movementBtn>();
	gc = GameObject.FindWithTag("GameController").GetComponent.<gameController>();

	onGround = true;

	HMove = 0.0f;
    VMove  = 0.0f;
    rb = GetComponent.<Rigidbody>();
	//anim = GetComponent.<Animator>();
	//Lag = 0.0f;
	
	//aud = GetComponent.<AudioSource>();
	rightRot =  Quaternion.Euler(90, 0, 0);
}

function FixedUpdate ()
{

	var HMove : float = Input.GetAxis("Horizontal");
	var VMove : float = Input.GetAxis("Vertical");
	
	if (HMove != 0 || VMove != 0){
			
		// Makes the player move Speed units per second
		MovePerSecond = new Vector3(HMove,0.0f,VMove) * Speed * Time.deltaTime; 
		transform.position += MovePerSecond; 
	}
		

	
	
	if (Input.GetKeyDown("space") && onGround){
	
		rb.AddForce(Vector3.forward * jump, ForceMode.Impulse);
		upBtn.active = false;
		onGround = false;
	
	}
	
	
	
	transform.position = new Vector3(Mathf.Clamp(transform.position.x, -8.65f, 3.38f), 
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
		
		if (col.collider.name == "Shark"){
		
			gc.DamagePlayer(10);
			rb.AddForce(knockback * sharkHit, ForceMode.Impulse);
			
		}else if (col.collider.name == "motorBoatHitBox"){
			gc.DamagePlayer(10);
			rb.AddForce(knockback * motorBoatHit, ForceMode.Impulse);
			
		} else if (col.collider.name == "Buoy"){
			gc.DamagePlayer(10);
			rb.AddForce(knockback * buoyHit, ForceMode.Impulse);
		}
	}
}

function OnTriggerEnter(col : Collider){
	
	if (col.name == "Ground"){
		onGround = true;
	}
	
	if (col.name == "BlastZone"){
		
		gc.DamagePlayer(9999);
		this.enabled = false;
	
	}

}