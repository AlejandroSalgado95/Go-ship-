#pragma strict

public var render : Renderer;

function Start () {
	
	StartCoroutine(makeItDissapear());
}

function makeItDissapear(){
	
	while (render.material.color.a > 0.0f){
		render.material.color = Color32.Lerp(render.material.color, new Color32(0,0,0,0),0.13f);
		yield;
	} 
	
	Destroy(gameObject);


}