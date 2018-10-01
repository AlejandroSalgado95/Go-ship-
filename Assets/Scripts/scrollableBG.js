#pragma strict

public var scrollSpeed : float;
public var backgroundSize : float;

private var startPosition : Vector3;

function Start ()
{
    startPosition = transform.position;
}

function Update ()
{
        var newPosition : float = Mathf.Repeat(Time.time * scrollSpeed, backgroundSize);
        transform.position = startPosition + Vector3.left * newPosition;
}