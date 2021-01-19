document.addEventListener("DOMContentLoaded", () => {

  const tagsJSON = `{
    "videoTitle": "Video title",
    "size": {
      "width": 564,
      "height": 846
    },
    "tags": [
      {
        "position": {
          "x": 50,
          "y": 20
        },
        "timeConfig": {
          "timestamp": 1,
          "duration": 10
        },
        "color": "#fcba03",
        "plugin": {
            "name": "SimpleLabel",
            "config": {
                "text": "Això es un  <strong>text </strong> de prova per mirar si funciona!"
            }
        }
      },
      {
        "position": {
          "x": 80,
          "y": 10
        },
        "timeConfig": {
          "timestamp": 2,
          "duration": 4
        },
        "color": "#cc5a45",
        "plugin": {
            "name": "SimpleLabel",
            "config": {
                "text": "This is a text for the <a href=\\\"www.google.es\\\">label</a>"
            }
        }
      },
      {
        "position": {
          "x": 10,
          "y": 30
        },
        "timeConfig": {
          "timestamp": 4,
          "duration": 10
        },
        "plugin": {
            "name": "Questionary",
            "config": {
                "title": "Quin dels següents llibre està escrit per Brandon Sanderson?",
                "subtitle": "Elegeix la resposta que creguis correcte",
                "correctAnswer": "Nacidos de la bruma: El imperio final",
                "wrongAnswers": [
                  "El nombre del viento",
                  "Juego de tronos",
                  "El hobbit"
                ]
            }
        }
      },
      {
        "position": {
          "x": 50,
          "y": 50
        },
        "timeConfig": {
          "timestamp": 2,
          "duration": 10
        },
        "color": "#45ccbe",
        "plugin": {
            "name": "Card",
            "config": {
            }
        }
      }
    ]
  }`;

  const hypervideo = new Hypervideo("H9vevyszht4", Hypervideo.YOUTUBE_TYPE, "hypervideo_123");
  const hypervideo2 = new Hypervideo("../TestVideos/video_test.mp4", Hypervideo.VIDEO_TYPE, "hypervideo_2");
  const hyperimage = new Hypervideo("../TestImages/nature.jpg", Hypervideo.IMAGE_TYPE, "hyperimage");
  hypervideo.setupHypervideo(tagsJSON);
  hypervideo2.setupHypervideo(tagsJSON);
  hyperimage.setupHypervideo(tagsJSON);

    


})