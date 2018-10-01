using UnityEngine;
#if UNITY_ADS
using UnityEngine.Advertisements;
#endif
using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;


public class advertiser : MonoBehaviour
{
	static advertiser keepOneForever;
	public bool toggle = true;
	public int playedTimes = 0;
	public bool timeForAdd = false;

	void Awake () {
		
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


	void Update ()
	{	
		// Retrieve the index of the scene in the project's build settings.

		Scene currentScene = SceneManager.GetActiveScene ();
		int buildIndex = currentScene.buildIndex;

		if (buildIndex == 1 && toggle) {

			playedTimes += 1;
			toggle = false;
			timeForAdd = true;

		} else if (buildIndex != 1) {

			toggle = true;
		}

		if (playedTimes % 3 == 0 && timeForAdd) {

			#if UNITY_ADS
			ShowRewardedAd();
			#endif
			timeForAdd = false;
		}

		
	}


	public void ShowRewardedAd()
	{	
		//1)video 2)rewardedVideo
		const string placementID = "video";

		#if UNITY_ADS
		if (Advertisement.IsReady(placementID))
		{
			var options = new ShowOptions { resultCallback = HandleShowResult };
			Advertisement.Show(placementID, options);
			//Advertisement.Show();
			Time.timeScale = 0;
		}
		#endif
	}

	#if UNITY_ADS
	private void HandleShowResult(ShowResult result)
	{
		switch (result)
		{
		case ShowResult.Finished:
			Debug.Log("The ad was successfully shown.");
			//
			// YOUR CODE TO REWARD THE GAMER
			// Give coins etc.
			Time.timeScale = 1;
			break;
		case ShowResult.Skipped:
			Debug.Log("The ad was skipped before reaching the end.");
			Time.timeScale = 1;
			break;
		case ShowResult.Failed:
			Debug.LogError("The ad failed to be shown.");
			Time.timeScale = 1;
			break;
		}
	}
	#endif

}

















/*
public class advertiser : MonoBehaviour
{
	public void ShowRewardedAd()
	{	
		//1)video 2)rewardedVideo
		if (Advertisement.IsReady("video"))
		{
			var options = new ShowOptions { resultCallback = HandleShowResult };
			Advertisement.Show("video", options);
		}
	}
	
	private void HandleShowResult(ShowResult result)
	{
		switch (result)
		{
		case ShowResult.Finished:
			Debug.Log("The ad was successfully shown.");
			//
			// YOUR CODE TO REWARD THE GAMER
			// Give coins etc.
			break;
		case ShowResult.Skipped:
			Debug.Log("The ad was skipped before reaching the end.");
			break;
		case ShowResult.Failed:
			Debug.LogError("The ad failed to be shown.");
			break;
		}
	}
}*/