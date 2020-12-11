document.addEventListener("DOMContentLoaded", () => {

  const tagsJSON = `{
    "tags": [
      {
        "id": "tag_1",
        "position": {
          "x": 50,
          "y": 20
        },
        "timeConfig": {
          "timestamp": 30,
          "duration": 10
        }
      },
      {
        "id": "tag_2",
        "position": {
          "x": 50,
          "y": 40
        },
        "timeConfig": {
          "timestamp": 10,
          "duration": 4
        }
      }
    ]
  }`;

  const hypervideo = new Hypervideo("https://www.youtube.com/embed/60YxSMN-Hxo", Hypervideo.YOUTUBE_TYPE, "hypervideo_123");
  const hypervideo2 = new Hypervideo("../TestVideos/video_test.mp4", Hypervideo.VIDEO_TYPE, "hypervideo_2");
  hypervideo.setupHypervideo(tagsJSON);
  //hypervideo2.setupHypervideo(tagsJSON)

    


})