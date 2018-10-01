import UnityEngine.EventSystems;

class movementBtn extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler
{

	//public var aClip : AudioClip[];
	//private var aSource : AudioSource;
	private var touched : boolean;
	public var active : boolean;
	private var pointerID : int;
	
	function Start()
	{
		//aSource = GetComponent.<AudioSource>();
		touched = false;
		active = false;
	}


	
	public function OnPointerDown(data: PointerEventData)
	{
        if (!touched)
        {
            active = true;
            pointerID = data.pointerId;
            touched = true;
        }		/*
		aSource.clip = aClip[2];
		aSource.Play();*/
	}
	
	
	public function OnPointerUp(data: PointerEventData)
	{
		if (data.pointerId == pointerID){
			active = false;
			touched = false;
		}
		/*
		aSource.clip = aClip[2];
		aSource.Play();*/
	}
	
	
}