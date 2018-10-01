#pragma strict

private var aud : AudioSource;
public var audClips : AudioClip[];
public var onGround : boolean;
public var checkSound : int;
public var checkSound2: int;

function Start () {
	
	checkSound = 0;
	checkSound2 = 0;
	onGround = true;
	aud = GetComponent.<AudioSource>();
	audClips = new AudioClip[3];
	audClips[0] = Resources.Load.<AudioClip>("Audio/jump2");
	audClips[1] = Resources.Load.<AudioClip>("Audio/splash");
	audClips[2] = Resources.Load.<AudioClip>("Audio/hitWood2");
}

function Update () {

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
	
	/*
	if (col.collider.CompareTag("Player")){

		if (checkSound2 == 1){
			
			if (audClips[2] != null){
				aud.clip = audClips[2];
	    		aud.Play();
			}
	    }
	    
	    checkSound2 = 1;
	
	}*/
	
}

/*
function OnTriggerEnter(col : Collider){
	
	if (col.name == "Ground"){
		onGround = true;
		aud.clip = audClips[1];
    	aud.Play();
	}
	
}*/