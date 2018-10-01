#pragma strict
import UnityEngine.UI;
import System.Collections;

private var playerNumber : int;
public var playerLB : Image;

private var aud : AudioSource;
public var audClips : AudioClip[];

public var restartBtn : GameObject;
public var menuBtn : GameObject;
public var result1 : UI.Text;
public var result2 : UI.Text;
public var result3 : UI.Text;
public var finalScoreObj : GameObject;
private var finalScoreText : UI.Text;
public var scoredPoints : float;
private var keepScoring : boolean;

public var resultPanel : GameObject;
public var scoreText : UI.Text;
public var panel : GameObject;
private var panelImage : Image;
public var playerHealth : UI.Slider;
public var playerHealthReal : int;
public var HealthText : UI.Text;
public var startPos : Transform;
private var playerObj : GameObject;
private var playerCtrl : playerController;
public var resources : gameResources;
public var pauseBtn : Image;
private var paused : boolean;
public var pausePanel : GameObject;
public var enemiesSpawn : Transform[];
public var fishSpawn : Transform[];
public var enemyNumber : int;
public var usableEnemies : int;
public var fillArea : Image;

private var hitColor : Color32;
private var normalColor : Color32;

public var fish1Count : float;
public var fish2Count : float;
public var fish3Count : float;

public var fishTimeMin : float;
public var fishTimeMax : float;

private var storedData : dataPersistance;

private var checkSong : int ;

private var advertiser : advertiser;
public var motorboatIncSpeed : float;
public var buoyIncSpeed : float;
public var seagullIncSpeed : float;
public var spawnTime : float;

function Start () {

	
	spawnTime = 2.0f;
	motorboatIncSpeed = -3.0f;
	buoyIncSpeed = -1.0f;
	seagullIncSpeed = -3.0f;

	storedData = GameObject.FindWithTag("dataPersistance").GetComponent.<dataPersistance>();
	resources = GameObject.FindGameObjectWithTag("GameResources").GetComponent.<gameResources>();
	advertiser = GameObject.FindWithTag("AddsManager").GetComponent.<advertiser>();
	aud = GetComponent.<AudioSource>();
	aud.Play();
	checkSong = 0;
	playerHealthReal = playerHealth.value;
	pausePanel.SetActive(false);
	playerNumber = storedData.selectedPlayer;
	panelImage = panel.GetComponent.<Image>();
	playerObj = Instantiate (resources.characters[playerNumber], startPos.position, resources.characters[playerNumber].GetComponent.<Transform>().rotation);
	
	/*
	if (playerNumber == 6){
		Debug.Log("WELL I TRIED ROTATING THIS");
		var playerObjChildsTrans : Transform = playerObj.GetComponent.<Transform>().GetChild(0);
		playerObjChildsTrans.rotation = Quaternion.Euler(0,180,0);
	}*/
	
	playerLB.sprite = resources.characterSprites[playerNumber];
	playerCtrl = playerObj.GetComponent.<playerController>();
	HealthText.text = playerHealth.value.ToString() ;
	scoreText.text = "Score: 0";
	finalScoreText = finalScoreObj.GetComponent.<Text>();
	paused = false;
	hitColor = new Color32(203,91,58,255);
	normalColor = new Color32(58,203,71,255);
	fish1Count = 0;
	fish2Count = 0;
	fish3Count = 0;
	scoredPoints = 0.0f;
	keepScoring = true;
	StartCoroutine(backIn());
	StartCoroutine(SpawnEnemies());
	StartCoroutine(SpawnFish());
	
}

function Update () {

	if (playerHealth.value <= 0){
		
		keepScoring = false;
		LoseGame();
		if (checkSong == 0)
		{
				aud.clip = audClips[1];
    			aud.Play();
    			checkSong = 1;
    	}
	
	}
	
	if (keepScoring)
		scoredPoints = Time.timeSinceLevelLoad;

	scoreText.text = "Score: " + scoredPoints.ToString("f2");
	
	if (Time.timeSinceLevelLoad > 20.0f){
	
		spawnTime = 1.8f;
		motorboatIncSpeed = 3.5f;
		buoyIncSpeed = 1.5f;
		seagullIncSpeed = 3.5f;
	
	} else if (Time.timeSinceLevelLoad > 40.0f){
			
			spawnTime = -1.6f;
			motorboatIncSpeed = -4.0f;
			buoyIncSpeed = -2.0f;
			seagullIncSpeed = -4.0f;
	
	} else if (Time.timeSinceLevelLoad > 60.0f){
		
			spawnTime = -1.4f;
			motorboatIncSpeed = -4.50f;
			buoyIncSpeed = -2.5f;
			seagullIncSpeed = -4.5f;
	
	
	}else if (Time.timeSinceLevelLoad > 80.0f){
			
			spawnTime = -0.8f;
			motorboatIncSpeed = -5.5f;
			buoyIncSpeed = -3.0f;
			seagullIncSpeed = -5.5f;
	
	
	} else if (Time.timeSinceLevelLoad > 100.0f){
			
			spawnTime = -0.6f;
			motorboatIncSpeed = -6.5f;
			buoyIncSpeed = -3.2f;
			seagullIncSpeed = -6.5f;
	
	
	}

}


function backIn(){
	
	while (panelImage.color.a > 0.5f){
		panelImage.color = Color32.Lerp(panelImage.color, new Color32(0,0,0,0),0.035f);
		yield;
	}
	
	panel.SetActive(false);

}

function BlackOut(){
	
	Debug.Log("Im in BlackOut");
	panel.SetActive(true);
	var startPanelImg : Image = panel.GetComponent.<Image>();
	var blackoutTime : float = Mathf.Repeat(Time.time,1.7f);
	while (/*panelImage.color != Color.black*/ blackoutTime < 1.5){
		startPanelImg.color = Color.Lerp(startPanelImg.color, /*new Color32(0,0,0,255)*/ Color.black,0.035f);
		blackoutTime = Mathf.Repeat(Time.time,1.7f);
		yield;
	}
	Debug.Log("Im OUT of BlackOut");

}


public function DamagePlayer( damage : int)
{
	//playerHealth.value -= damage;
	playerHealthReal = playerHealthReal - damage; 
	yield LerpDamage(playerHealthReal);
}

function LerpDamage(newHealth : int)
{	
	
	while (playerHealth.value > newHealth)
	{
		playerHealth.value -= 1f;
		fillArea.color = hitColor;
		playerLB.sprite = resources.characterSpritesHurt[playerNumber];
		HealthText.text = playerHealth.value.ToString();
		yield;
	}
	fillArea.color = normalColor;
	playerLB.sprite = resources.characterSprites[playerNumber];

}

function LoseGame(){

	playerCtrl.enabled = false;
	resultPanel.SetActive(true);
	/*
	storedData.fishesAmount[0] += fish1Count;
	storedData.fishesAmount[1] += fish2Count;
	storedData.fishesAmount[2] += fish3Count;*/
	
	if (scoredPoints > storedData.maxScore)
		storedData.maxScore = scoredPoints;
	
	storedData.Save();
	
	
	yield ObtainedStuff(Time.time);


}

function ObtainedStuff(myTime : float){
	
	var f1 : float = 0;
	var f2 : float = 0;
	var f3 : float = 0;
	
    var someTime1: float = myTime + 1.45;
	var someTime2: float = myTime + 1.55;
	var someTime3: float = myTime + 1.65;
	
	while(Time.time < (myTime + 1.35))
	{
		yield;
	}
	
	while(Time.time < someTime1){
		result1.text = "x " + fish1Count.ToString();
		yield;
	}
	
	while(Time.time < someTime2){
		result2.text = "x " + fish2Count.ToString();
		yield;
	}
	
	while(Time.time < someTime3){
		result3.text = "x " + fish3Count.ToString();
		yield;
	}
	
	
	/*
	while(f1 < (fish1Count - 0.1f)){
		f1 = Mathf.Lerp(f1, fish1Count ,0.2f);
		result1.text = "x " + f1.ToString("0");
		yield;
	}
	
	while(f2 < (fish2Count - 0.1f)){
		f2 = Mathf.Lerp(f2, fish2Count ,0.2f);
		result2.text = "x " + f2.ToString("0");
		yield;
	}
	
	while(f3 < (fish3Count - 0.1f)){
		f3 = Mathf.Lerp(f3, fish3Count ,0.2f);
		result3.text = "x " + f3.ToString("0");
		yield;
	}*/
	
	finalScoreText.text = scoredPoints.ToString("f2");
	finalScoreObj.SetActive(true);
	
	var myTime2 = Time.time + 0.5f;
	
	while(Time.time < myTime2)
	{
		yield;
	}
	
	restartBtn.SetActive(true);
	menuBtn.SetActive(true);

}

function TogglePause(){

	if (paused){
		pausePanel.SetActive(false);
		pauseBtn.sprite = resources.sprites[1];
		paused = false;
		Time.timeScale = 1;
		
	} else {
		pausePanel.SetActive(true);
		pauseBtn.sprite = resources.sprites[0];
		paused = true;
		Time.timeScale = 0;
	
	}	

}


function SpawnEnemies(){

		while (true) 
		{
			enemyNumber = Random.Range(0,usableEnemies);
			//var waitTime : float = Random.Range(0.7f,1.5f);
			Instantiate(resources.enemies[enemyNumber], enemiesSpawn[enemyNumber].position, enemiesSpawn[enemyNumber].rotation);
			yield WaitForSeconds (spawnTime); //To make this function pause without pausing the entire game, you need to make this function a coroutine, and coroutines have some very specific considerations: 
		
		}


}



function SpawnFish(){

		while (true) 
		{
			var randomNum : int = Random.Range(1,11);
			if (randomNum >= 1 && randomNum <= 5){
			
				Instantiate(resources.fishes[0], fishSpawn[0].position, fishSpawn[0].rotation);

			} else if (randomNum >= 6 && randomNum <= 8){
				
				Instantiate(resources.fishes[1], fishSpawn[0].position, fishSpawn[0].rotation);

			} else if (randomNum >= 9 && randomNum <= 10){
				
				Instantiate(resources.fishes[2], fishSpawn[0].position, fishSpawn[0].rotation);

			}
			
			var waitTime : float = Random.Range(fishTimeMin,fishTimeMax);
			yield WaitForSeconds (waitTime); 
		
		}


}

function GotFish(fishType : int ){
		
		Debug.Log("GOT A FISH!");
		
	if (fishType == 1){
		
		fish1Count += 1;
		storedData.fishesAmount[0] += 1;
		
	} else if (fishType == 2){
		
		fish2Count += 1;
		storedData.fishesAmount[1] += 1;
	
	}else if (fishType == 3){
	
		fish3Count += 1;
		storedData.fishesAmount[2] += 1;
	}

}

function BackToMenu(){
	
	StartCoroutine( BlackOut() );
	Application.LoadLevel(0);

}

function Restart(){

	Application.LoadLevel(1);
	
	//if (advertiser != null){
	
		advertiser.playedTimes += 1;
		/*if (advertiser.playedTimes % 3 == 0)
			TogglePause();*/
		advertiser.timeForAdd = true;
		
	//}
}




/*	
public function Scored( points : int)
{
	yield LerpScore(points);	
}

function LerpScore( points : int)
{	
	var TempScore : int = pointsCounter;
	pointsCounter += points;
	while( TempScore < pointsCounter)
	{
		TempScore += 1;
		ScoreText.text = "Puntos: " + TempScore.ToString();
		yield;
	}
	if (TempScore >= 100)
		YouWon();
}*/