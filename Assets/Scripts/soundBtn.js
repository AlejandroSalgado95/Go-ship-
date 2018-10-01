#pragma strict

class soundBtn extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler,  IPointerEnterHandler
{	
	
	private var touched : boolean = false;
	private var pointerID : int;
	private var aud : AudioSource;
	public var audClips : AudioClip[];

	
	function Start()
	{
		aud = GetComponent.<AudioSource>();
		//aud.clip = audClips[0];
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
    			
    	}
    }


}