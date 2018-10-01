#pragma strict

private var storedData : dataPersistance;
private var resources : gameResources;
private var obtainedPlayers : int[];

public var range : float = 100f;
public var pointedBoat : GameObject;
public var actualPoint : Vector3;
public var startPanel : GameObject;


function Start () {
	storedData = GameObject.FindWithTag("dataPersistance").GetComponent.<dataPersistance>();
	resources = GameObject.FindGameObjectWithTag("GameResources").GetComponent.<gameResources>();
	obtainedPlayers = storedData.obtainedPlayers;
	setUpGarden();
	backIn();
}

function Update () {
	
	/*
	// Create a ray from the mouse cursor on screen in the direction of the camera.
    var camRay : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);

    // Create a RaycastHit variable to store information about what was hit by the ray.
    var floorHit : RaycastHit;

    // Perform the raycast and if it hits something on the floor layer...
    if(Physics.Raycast (camRay, floorHit, camRayLength, floorMask))
    {
        // Create a vector from the player to the point on the floor the raycast from the mouse hit.
        var playerToMouse : Vector3  = floorHit.point - transform.position;

        // Ensure the vector is entirely along the floor plane.
        playerToMouse.y = 0f;

        // Create a quaternion (rotation) based on looking down the vector from the player to the mouse.
        var newRotation : Quaternion = Quaternion.LookRotation (playerToMouse);

        // Set the player's rotation to this new rotation.
        playerRigidbody.MoveRotation (newRotation);
    }*/
    
    
    
     var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	 var hit : RaycastHit;
     
     Debug.DrawRay(ray.origin, ray.direction * range, Color.green);

     
     if (Physics.Raycast (ray, hit, range)) {
		 
		 actualPoint = hit.point;
		 
         if (hit.collider.gameObject.tag == "Player" && Input.GetMouseButtonDown(0)) {
         
			Debug.Log("Hit a boat");
			
			pointedBoat = hit.collider.gameObject;
			
            

         }
     }
     
     if (pointedBoat != null){
		     	
		var pointedBoatTrans : Transform = pointedBoat.GetComponent.<Transform>();
		pointedBoatTrans.position = new Vector3(actualPoint.x,pointedBoatTrans.position.y,actualPoint.z);
		 
		if (Input.GetMouseButtonUp(0))
		{
			pointedBoat = null;
		}
	 }
		  
   

}

function setUpGarden(){
	
	Debug.Log("setting up obtainables");
	var offsetHorPos: Vector3 = new Vector3(4.3,0,0);
	var offsetVerPos: Vector3 = new Vector3(0,0,-6.17);
	var startingPos : Vector3 = new Vector3(-5.8,7.8,-13.54);
	var actualPos : Vector3 = new Vector3(-5.8,7.8,-13.54);
	
 	for(var i : int = 0; i < obtainedPlayers.Length; i++){
 		
 		Debug.Log("Obtainable number " + i.ToString());
 			
 		if (obtainedPlayers[i] == 1){
 			
 			Debug.Log("Got this one!");	
 			//var obtained : GameObject = Instantiate(resources.characters[i], new Vector3( Random.Range(-7.41f, 8.75f),10.14f, Random.Range(-14.46f, -6.2f)), Quaternion.identity);
 			var obtained : GameObject = Instantiate(resources.characters[i], actualPos, Quaternion.identity);
 			
 			if (actualPos.x < 3)
 			
 				actualPos += offsetHorPos;
 			
 			else {
 				
 				actualPos = startingPos;
 				actualPos -= offsetVerPos;
 				
 			}
			var obtainedScript : playerController = obtained.GetComponent.<playerController>();
			var obtainedTransform : Transform = obtained.GetComponent.<Transform>();
			var obtainedRB : Rigidbody = obtained.GetComponent.<Rigidbody>();
			var obtainedCollider : Collider = obtained.GetComponent.<Collider>();
			obtained.AddComponent(storagePlayer);
			obtainedScript.enabled = false;
			Destroy(obtainedScript);
			//obtainedCollider.isTrigger = true;
			//obtainedRB.useGravity = false;
			obtainedTransform.eulerAngles +=  new Vector3(90f,0,0);
			obtainedTransform.localScale *= 1.2;
 		}
    }


}

function backIn(){
	
	var startPanelImg : Image = startPanel.GetComponent.<Image>();
	while (startPanelImg.color.a > 0.5f){
		startPanelImg.color = Color32.Lerp(startPanelImg.color, new Color32(0,0,0,0),0.035f);
		yield;
	}
	
	startPanel.SetActive(false);

}

function BlackOut(){
	
	Debug.Log("Im in BlackOut");
	startPanel.SetActive(true);
	var startPanelImg : Image = startPanel.GetComponent.<Image>();
	var blackoutTime : float = Mathf.Repeat(Time.time,1.7f);
	while (/*panelImage.color != Color.black*/ blackoutTime < 1.5){
		startPanelImg.color = Color.Lerp(startPanelImg.color, /*new Color32(0,0,0,255)*/ Color.black,0.035f);
		blackoutTime = Mathf.Repeat(Time.time,1.7f);
		yield;
	}
	Debug.Log("Im OUT of BlackOut");

}

function BackToMenu(){
	
	StartCoroutine ( BlackOut() );
	Application.LoadLevel(0);
}