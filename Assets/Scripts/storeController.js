#pragma strict
import UnityEngine.UI;
import System.Collections;

public var startPanel : GameObject;
public var characterButtons: GameObject[];
public var playerPos : Transform;
private var playerObj : GameObject;
private var actualMark : GameObject;

private var playerNumber : int;
private var fishesAmount : int[]; 
private var obtainedPlayers : int[];

public var fish1Text : UI.Text;
public var fish2Text : UI.Text;
public var fish3Text : UI.Text;
public var selectText : UI.Text;

private var storedData : dataPersistance;
private var resources : gameResources;
public var locks : GameObject[];
public var costObj : GameObject;
public var fish1CostText : UI.Text;
public var fish2CostText : UI.Text;
public var fish3CostText : UI.Text;
public var neededScore : UI.Text;


function Start () {
	storedData = GameObject.FindWithTag("dataPersistance").GetComponent.<dataPersistance>();
	resources = GameObject.FindGameObjectWithTag("GameResources").GetComponent.<gameResources>();
	
	playerNumber = storedData.selectedPlayer;
	fishesAmount = storedData.fishesAmount;
	obtainedPlayers = storedData.obtainedPlayers;
	
	fish1Text.text = "x " + fishesAmount[0].ToString();
	fish2Text.text = "x " + fishesAmount[1].ToString();
	fish3Text.text = "x " + fishesAmount[2].ToString();
	
	playerObj = Instantiate(resources.characters[playerNumber], playerPos.position, playerPos.rotation);
	var playerScript : playerController = 	playerObj.GetComponent.<playerController>();
  	playerScript.enabled = false;
  	costObj.active = false;
  	SelectPlayer();
  	checkLocks();
  	StartCoroutine(backIn());
}


function ChangeShowingPlayer(number : int){

	Destroy(playerObj);
	playerObj = Instantiate(resources.characters[number], playerPos.position, playerPos.rotation);
	var playerScript : playerController = 	playerObj.GetComponent.<playerController>();
  	playerScript.enabled = false;
  	playerNumber = number;
  	if (obtainedPlayers[playerNumber] == 1){
  		
  		selectText.text = "Select";
  		costObj.active = false;

  		
  		
  	} else{
  		
  		selectText.text = "Buy!";
  		costObj.active = true;
  		if (playerNumber == 1){
  			
  			fish1CostText.text = "x 5";
			fish2CostText.text = "x 3" ;
			fish3CostText.text = "x 2" ;
			neededScore.text = " x 10.0";
			
  		
  		}else if (playerNumber == 2){
  		
   			fish1CostText.text = "x 10";
			fish2CostText.text = "x 6";
			fish3CostText.text = "x 4" ;
			neededScore.text = " x 20.0";
  		
  		}else if (playerNumber == 3){
  		
   			fish1CostText.text = "x 15";
			fish2CostText.text = "x 9" ;
			fish3CostText.text = "x 6" ;
			neededScore.text = " x 40.0";
  		
  		}else if (playerNumber == 4){
  		
   			fish1CostText.text = "x 25";
			fish2CostText.text = "x 17" ;
			fish3CostText.text = "x 13" ;
			neededScore.text = " x 70.0";
  		
  		}else if (playerNumber == 5){
  		
   			fish1CostText.text = "x 35";
			fish2CostText.text = "x 25" ;
			fish3CostText.text = "x 20" ;
			neededScore.text = " x 100.0";
  		
  		}else if (playerNumber == 6){
  		
   			fish1CostText.text = "x 50";
			fish2CostText.text = "x 38" ;
			fish3CostText.text = "x 32" ;
			neededScore.text = " x 140.0";
  		
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

function SelectPlayer(){
	
	if (obtainedPlayers[playerNumber] == 1){
	
		if (actualMark != null)
			Destroy(actualMark);
			
		actualMark = Instantiate(resources.Other[0],Vector3.zero,Quaternion.identity);
		var parentTrans : RectTransform = characterButtons[playerNumber].GetComponent.<RectTransform>();
		var childTrans : RectTransform = actualMark.GetComponent.<RectTransform>();
		childTrans.SetParent(parentTrans, false);
		costObj.active = false;
		
		storedData.selectedPlayer = playerNumber;
		storedData.Save();
		
		
		
	} else {
	
		if (playerNumber == 1){
		
			if (fishesAmount[0] >= 5 && fishesAmount[1] >= 3 && fishesAmount[2] >= 2 && storedData.maxScore >= 10.0){
				
				fishesAmount[0] -= 5;
				fishesAmount[1] -= 3;
				fishesAmount[2] -= 2;
				storedData.obtainedPlayers[1] = 1;
				selectText.text = "Select";
				storedData.Save();
				fish1Text.text = "x " + fishesAmount[0].ToString();
				fish2Text.text = "x " + fishesAmount[1].ToString();
				fish3Text.text = "x " + fishesAmount[2].ToString();
				costObj.active = false;
				var lockAnim: Animator = locks[1].GetComponent.<Animator>();
				lockAnim.Play("opened");

				//StartCoroutine ( reduceFishes() );
			}
			
		} else if (playerNumber == 2){
			
			if (fishesAmount[0] >= 10 && fishesAmount[1] >= 6 && fishesAmount[2] >= 4 && storedData.maxScore >= 20.0){
				
				fishesAmount[0] -= 10;
				fishesAmount[1] -= 6;
				fishesAmount[2] -= 4;
				selectText.text = "Select";
				storedData.obtainedPlayers[2] = 1;
				storedData.Save();
				fish1Text.text = "x " + fishesAmount[0].ToString();
				fish2Text.text = "x " + fishesAmount[1].ToString();
				fish3Text.text = "x " + fishesAmount[2].ToString();
				costObj.active = false;
				var lockAnim2: Animator = locks[2].GetComponent.<Animator>();
				lockAnim2.Play("opened");
				//StartCoroutine ( reduceFishes() );
			}
			
		} else if (playerNumber == 3){
		
			if (fishesAmount[0] >= 15 && fishesAmount[1] >= 9 && fishesAmount[2] >= 6 && storedData.maxScore >= 40.0){
				
				fishesAmount[0] -= 15;
				fishesAmount[1] -= 9;
				fishesAmount[2] -= 6;
				selectText.text = "Select";
				storedData.obtainedPlayers[3] = 1;
				storedData.Save();
				fish1Text.text = "x " + fishesAmount[0].ToString();
				fish2Text.text = "x " + fishesAmount[1].ToString();
				fish3Text.text = "x " + fishesAmount[2].ToString();
				costObj.active = false;
				var lockAnim3: Animator = locks[3].GetComponent.<Animator>();
				lockAnim3.Play("opened");
				//StartCoroutine ( reduceFishes() );
			}
		
		}else if (playerNumber == 4){
			
			if (fishesAmount[0] >= 25 && fishesAmount[1] >= 17 && fishesAmount[2] >= 13 && storedData.maxScore >= 70.0){
				
				fishesAmount[0] -= 20;
				fishesAmount[1] -= 12;
				fishesAmount[2] -= 8;
				selectText.text = "Select";
				storedData.obtainedPlayers[4] = 1;
				storedData.Save();
				fish1Text.text = "x " + fishesAmount[0].ToString();
				fish2Text.text = "x " + fishesAmount[1].ToString();
				fish3Text.text = "x " + fishesAmount[2].ToString();
				costObj.active = false;
				var lockAnim4: Animator = locks[4].GetComponent.<Animator>();
				lockAnim4.Play("opened");
				//StartCoroutine ( reduceFishes() );
			}
			
		}
		else if (playerNumber == 5){
			
			if (fishesAmount[0] >= 35 && fishesAmount[1] >= 25 && fishesAmount[2] >= 20 && storedData.maxScore >= 100.0){
				
				fishesAmount[0] -= 25;
				fishesAmount[1] -= 15;
				fishesAmount[2] -= 10;
				selectText.text = "Select";
				storedData.obtainedPlayers[5] = 1;
				storedData.Save();
				fish1Text.text = "x " + fishesAmount[0].ToString();
				fish2Text.text = "x " + fishesAmount[1].ToString();
				fish3Text.text = "x " + fishesAmount[2].ToString();
				costObj.active = false;
				var lockAnim5: Animator = locks[5].GetComponent.<Animator>();
				lockAnim5.Play("opened");
				//StartCoroutine ( reduceFishes() );
			}
			
		}
		else if (playerNumber == 6){
			
			if (fishesAmount[0] >= 50 && fishesAmount[1] >= 38 && fishesAmount[2] >= 32 && storedData.maxScore >= 140.0){
				
				fishesAmount[0] -= 30;
				fishesAmount[1] -= 18;
				fishesAmount[2] -= 12;
				selectText.text = "Select";
				storedData.obtainedPlayers[6] = 1;
				storedData.Save();
				fish1Text.text = "x " + fishesAmount[0].ToString();
				fish2Text.text = "x " + fishesAmount[1].ToString();
				fish3Text.text = "x " + fishesAmount[2].ToString();
				costObj.active = false;
				var lockAnim6: Animator = locks[6].GetComponent.<Animator>();
				lockAnim6.Play("opened");
				//StartCoroutine ( reduceFishes() );
			}
			
		}
	
	}

}

function BackToMenu(){
	
	StartCoroutine ( BlackOut() );
	Application.LoadLevel(0);
}


function checkLocks(){

	for(var i : int = 0; i < obtainedPlayers.Length; i++){
		
		if (obtainedPlayers[i] == 1){
			
			Destroy(locks[i]);
		
		
		}
	
	}

}

function reduceFishes(){
	
	/*
	while(f1 < (fish1Count - 0.15f)){
	    
		f1 = Mathf.Lerp(f1, fish1Count ,0.2f);
		result1.text = "x " + f1.ToString("0");
		yield;
	}*/

}

