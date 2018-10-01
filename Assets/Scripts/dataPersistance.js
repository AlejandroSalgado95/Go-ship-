#pragma strict
import System;
import System.Runtime.Serialization.Formatters.Binary;
import System.IO;


static var keepOneForever : dataPersistance;
public var maxScore : float;
public var selectedPlayer : int;
public var fishesAmount : int[]; 
public var obtainedPlayers : int[]; 




function Awake () {

	if (keepOneForever == null)
	{
	    DontDestroyOnLoad (gameObject);
		keepOneForever = this;
		Load();
	}
	else
	{
		Destroy(gameObject);
	}
	
	//File.Delete(Application.persistentDataPath + "/playerInfo.dat");
}

function Start () {
	
	
}

function Save(){

	    var bf : BinaryFormatter = new BinaryFormatter();
	    var file : FileStream = File.Create(Application.persistentDataPath + "/playerInfo.dat");
	     
	    var data : PlayerData = new PlayerData();
	    
		data.selectedPlayer = selectedPlayer ;		
		data.fishesAmount = fishesAmount;
		data.obtainedPlayers = obtainedPlayers;
		data.maxScore = maxScore;
		
     
	    bf.Serialize(file, data);
	    file.Close();
 }
 
function Load(){
     
     if(File.Exists(Application.persistentDataPath + "/playerInfo.dat"))
     {
         var bf : BinaryFormatter = new BinaryFormatter();
         var file : FileStream = File.Open(Application.persistentDataPath + "/playerInfo.dat", FileMode.Open);
        ////////////////THIS IS THE LINE THE ERROR APPEARS ON/////////////
         var data : PlayerData =  bf.Deserialize(file) as PlayerData;
       //////////////////////////////////////////////////////////////////
         file.Close();
         
		selectedPlayer = data.selectedPlayer;
		maxScore = data.maxScore;
        fishesAmount = data.fishesAmount;
		obtainedPlayers = data.obtainedPlayers;
		
     }
     else
     {
		selectedPlayer = 0;  
		obtainedPlayers = new int[7];   	
     	fishesAmount  = new int[3];
     	
     	maxScore = 0.0f;
     	fishesAmount[0] = 0;
     	fishesAmount[1] = 0;
     	fishesAmount[2] = 0;
     	
     	obtainedPlayers[0] = 1;
     	obtainedPlayers[1] = 0;
     	obtainedPlayers[2] = 0;
     	obtainedPlayers[3] = 0;
     	obtainedPlayers[4] = 0;
     	obtainedPlayers[5] = 0;
     	obtainedPlayers[6] = 0;

     	
     	
     }
 }
 

class PlayerData extends System.Object{
    
    public var selectedPlayer : int;
    public var maxScore : float;
	public var obtainedPlayers : int[];
	public var fishesAmount : int[];
	
}
