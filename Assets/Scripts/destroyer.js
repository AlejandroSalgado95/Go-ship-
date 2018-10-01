#pragma strict

function Start () {

}

function OnCollisionEnter(col : Collision)
{
	if (col.collider.tag != "Player" && col.collider.name != "Ground"){
		Destroy(col.gameObject);
	}
}

function OnTriggerEnter(col : Collider){
	
	if (col.tag != "Player" && col.name != "Ground"){
		
		Destroy(col.gameObject);
	}
	
}