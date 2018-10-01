#pragma strict
import UnityEngine.UI;
import System.Collections;

public var characters : GameObject[];
public var characterSprites : Sprite[];
public var characterSpritesHurt : Sprite[];
public var sprites : Sprite[];
public var enemies : GameObject[];
public var fishes : GameObject[];
public var Other : GameObject[];

static var keepOneForever : gameResources;

function Awake () {

	if (keepOneForever == null)
	{
	    DontDestroyOnLoad (gameObject);
		keepOneForever = this;
	}
	else
	{
		Destroy(gameObject);
	}
	
}