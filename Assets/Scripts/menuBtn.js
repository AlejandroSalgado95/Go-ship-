#pragma strict

class menuBtn extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler,  IPointerEnterHandler
{	
	
	private var touched : boolean = false;
	private var pointerID : int;
	private var aud : AudioSource;
	public var audClips : AudioClip[];
	private var mc : menuController;

	
	function Start()
	{
		aud = GetComponent.<AudioSource>();
		//aud.clip = audClips[0];
		mc = GameObject.FindWithTag("MenuController").GetComponent.<menuController>();
	}
	
	public function OnPointerEnter(data : PointerEventData)
	{
		aud.clip = audClips[0];
    	aud.Play();
	
	}
	
	public function OnPointerDown (data : PointerEventData) 
	{
       if (!touched) 
       {
            touched = true;
            pointerID = data.pointerId;
        }
    }
   

    public function OnPointerUp (data: PointerEventData) 
    {
    	if (data.pointerId == pointerID)
    	{
    	
    			aud.clip = audClips[1];
    			aud.Play();
    			if (gameObject.name == "Play"){
    				
    				Debug.Log("Im a play button");
    				mc.ChangeScene(1);
    			
    			}else if (gameObject.name == "Shop"){
    			
    			    Debug.Log("Im a shop button");
    				mc.ChangeScene(2);
    			
    			}else if (gameObject.name == "Storage"){
    			
    			    Debug.Log("Im a storage button");
    				mc.ChangeScene(3);
    			
    			}else if (gameObject.name == "Credits"){
    				
    				Debug.Log("Im a credits button");
    				mc.ChangeScene(4);
    			
    			}
    	}
    }


}