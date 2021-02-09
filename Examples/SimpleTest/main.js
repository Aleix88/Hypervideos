document.addEventListener("DOMContentLoaded", () => {
  const video = {
    "videoTitle": "Video title",
    "size": {
      "width": 50,
      "height": 400
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
  };
  const tagsJSON = {
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
                  "El hobbit",
                  "Juego de tronos",
                  "El hobbit",
                  "Juego de tronos",
                  "El hobbit",
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
                "title": "Landscape photography",
                "description": "When most people start out taking landscape photos, they think they need to get a wide angle lens in order to capture the whole landscape. When I bought my first DSLR, I was one of those people. I made sure I had a wide angle lens because I knew I mostly wanted to photograph landscapes from my adventures, and that’s what everyone told me I required to get the job done.",
                "imageSrc": "../TestImages/nature.jpg",
                "backgroundColor": "#F2D5A0",
                "titleColor": "rgb(138 104 43)",
                "descriptionColor": "rgb(138 104 43)",
                "button": {
                  "title": "Read Post",
                  "href": "https://www.google.es", 
                  "backgroundColor": "red",
                  "textColor": "blue"
                }
            }
        }
      }
    ]
  };
  const hypervideo = new Hypervideo("H9vevyszht4", Hypervideo.YOUTUBE_TYPE, "hypervideo_123");
  const hypervideo2 = new Hypervideo("../TestVideos/f.mp4", Hypervideo.VIDEO_TYPE, "hypervideo_2");
  const hyperimage = new Hypervideo("../TestImages/nature.jpg", Hypervideo.IMAGE_TYPE, "hyperimage");
  hypervideo.setupHypervideo(video);
  hypervideo2.setupHypervideo(video);
  hyperimage.setupHypervideo(tagsJSON);
})