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
          "timestamp": 1,
          "duration": 10
        },
        "color": "#fcba03"
      },
      {
        "id": "tag_2",
        "position": {
          "x": 80,
          "y": 10
        },
        "timeConfig": {
          "timestamp": 2,
          "duration": 4
        },
        "color": "#cc5a45"
      },
      {
        "id": "tag_1",
        "position": {
          "x": 10,
          "y": 30
        },
        "timeConfig": {
          "timestamp": 4,
          "duration": 10
        }
      },
      {
        "id": "tag_1",
        "position": {
          "x": 50,
          "y": 50
        },
        "timeConfig": {
          "timestamp": 2,
          "duration": 10
        },
        "color": "#45ccbe"
      }
    ]
  }`;

  const hypervideo = new Hypervideo("H9vevyszht4", Hypervideo.YOUTUBE_TYPE, "hypervideo_123");
  const hypervideo2 = new Hypervideo("../TestVideos/video_test.mp4", Hypervideo.VIDEO_TYPE, "hypervideo_2");
  hypervideo.setupHypervideo(tagsJSON);
  hypervideo2.setupHypervideo(tagsJSON)

    


})