#pragma strict

private var rb  : Rigidbody;
public var velocityTime : float;
public var overcomedTime : float;
public var actualVel : float;
private var rightRot : Quaternion;

function Start () {

	rb = GetComponent.<Rigidbody>();
	velocityTime = 1.2f;
	overcomedTime = Time.time + velocityTime;
	rightRot =  Quaternion.Euler(90, 0, 0);
	actualVel = Random.Range(-2.5f,2.3f); 
}

function Update () {
	
	
	rb.velocity = new Vector3(actualVel,0.0f,0.0f);
	
	if (Time.time > overcomedTime){
		
		actualVel = Random.Range(-1.8f,1.8f);
		
		overcomedTime = Time.time + velocityTime;
	}
	
	
	
	transform.position = new Vector3(Mathf.Clamp(transform.position.x, 1.6f, 5.59f), 
	 								Mathf.Clamp(transform.position.y, 7.14f, 11.19f),
	 								Mathf.Clamp(transform.position.z, -12.08f, -5.34f));
	 								
	 								
	
	if (transform.rotation != rightRot ){
	 
	 	transform.rotation = Quaternion.Lerp(transform.rotation,rightRot,0.075f); 
	 	
	 }							
	 								
	 	
}