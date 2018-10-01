#pragma strict

private var storedData : dataPersistance;
private var resources : gameResources;
private var obtainedPlayers : int[];
private var actualObjPlayers : int[];
private var actualObjSize : int;


public var startPanel : GameObject;
public var obtainedPos : Transform;

function Start () {

	storedData = GameObject.FindWithTag("dataPersistance").GetComponent.<dataPersistance>();
	resources = GameObject.FindGameObjectWithTag("GameResources").GetComponent.<gameResources>();
	
	
	actualObjPlayers = new int[10];
	actualObjSize = 0;
	obtainedPlayers = storedData.obtainedPlayers;
	checkWhatYouHave();
	StartCoroutine(spawnWhatYouHave());
	
	
	StartCoroutine(backIn());
}

function Update () {

}

function BackToMenu(){
	
	StartCoroutine ( BlackOut() );
	Application.LoadLevel(0);
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

function backIn(){
	
	var startPanelImg : Image = startPanel.GetComponent.<Image>();
	while (startPanelImg.color.a > 0.5f){
		startPanelImg.color = Color32.Lerp(startPanelImg.color, new Color32(0,0,0,0),0.035f);
		yield;
	}
	
	startPanel.SetActive(false);

}

function checkWhatYouHave(){

	for(var i : int = 0; i < obtainedPlayers.Length; i++){
	
			if (obtainedPlayers[i] == 1){
			
				actualObjPlayers[actualObjSize] = i;
				actualObjSize++;
			}
	
	}


}

function spawnWhatYouHave(){

		while (true) 
		{
			var obtainedNumber : int = Random.Range(0,actualObjSize);
			var actualNumber : int = actualObjPlayers[obtainedNumber];
			var waitTime : float = Random.Range(5.3f,6.5f);
			var obtainedPlayer : GameObject = Instantiate(resources.characters[actualNumber], obtainedPos.position, obtainedPos.rotation);
			var obtainedScript : playerController = obtainedPlayer.GetComponent.<playerController>();
			var obtainedRB : Rigidbody = obtainedPlayer.GetComponent.<Rigidbody>();
			var obtainedCollider : Collider = obtainedPlayer.GetComponent.<Collider>();
			obtainedScript.enabled = false;
			Destroy(obtainedScript);
			obtainedCollider.isTrigger = true;
			obtainedRB.useGravity = false;
			obtainedRB.velocity = new Vector3(-2.5f,0,0);
			//obtainedPlayer.AddComponent(buoy);
			yield WaitForSeconds (waitTime); //To make this function pause without pausing the entire game, you need to make this function a coroutine, and coroutines have some very specific considerations: 
		
		}


}

