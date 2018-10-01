#pragma strict
import UnityEngine.UI;
import System.Collections;

public var panel : GameObject;
private var panelImage : Image;
public var blackoutTime : float;
public var score : UI.Text;

public var startPanel : GameObject;
public var startPanelAnim : Animator;

private var storedData : dataPersistance;
private var resources : gameResources;
public var playerPos : Transform;
private var playerObj : GameObject;
private var selectedPlayer : int;

function Start () {
    
	storedData = GameObject.FindWithTag("dataPersistance").GetComponent.<dataPersistance>();
	resources = GameObject.FindGameObjectWithTag("GameResources").GetComponent.<gameResources>();
	selectedPlayer = storedData.selectedPlayer;
	playerObj = Instantiate(resources.characters[selectedPlayer], playerPos.position, playerPos.rotation);
	playerObj.active = false;
	var playerObjTrans : Transform = playerObj.GetComponent.<Transform>();
	playerObjTrans.localScale *= 1.3;
	//playerObj.AddComponent(randomMove);
	panelImage = panel.GetComponent.<Image>();
	score.text = storedData.maxScore.ToString("f2");
	startPanelAnim = startPanel.GetComponent.<Animator>();

	var playerScript : playerController = 	playerObj.GetComponent.<playerController>();
  	playerScript.enabled = false;
  	var playerAudio :AudioSource = playerObj.GetComponent.<AudioSource>();
  	playerAudio.enabled = false;
  	Destroy(playerAudio);
  	playerObj.active = true;
	//var playerTrans : Transform = playerObj.GetComponent.<Transform>();
	StartCoroutine(backIn());
}

function Update () {



}

function ChangeScene(sceneNumber : int){
	Debug.Log("Play function activated");
	StartCoroutine(blackOut(sceneNumber));
}



function blackOut(sceneNumber : int){
	
	
	Debug.Log("Im in BlackOut");
	startPanel.SetActive(true);
	var blackOutTime : float = Time.time + 0.5f;
	startPanelAnim.Play("blackOut");
	
	//blackoutTime = Mathf.Repeat(Time.time,3.1f);
	//while (/*panelImage.color != Color.black*/ blackoutTime < 2.6f){
	//	panelImage.color = Color.Lerp(panelImage.color, /*new Color32(0,0,0,255)*/ Color.black,0.085f);
	//	blackoutTime = Mathf.Repeat(Time.time,2.6f);
	//	yield;
	//}
	
	while (Time.time < blackOutTime){
		yield;
	}
	
	Debug.Log("Im OUT of BlackOut");
	Application.LoadLevel(sceneNumber);

}


function backIn(){
	
	var backInTime : float = Time.time + 0.5f;
	startPanelAnim.Play("backIn");
	

	while (Time.time < backInTime){
		yield;
	}
	
	/*
	var startPanelImg : Image = startPanel.GetComponent.<Image>();
	while (startPanelImg.color.a > 0.5f){
		startPanelImg.color = Color32.Lerp(startPanelImg.color, new Color32(0,0,0,0),0.035f);
		yield;
	}*/
	
	startPanel.SetActive(false);

}



