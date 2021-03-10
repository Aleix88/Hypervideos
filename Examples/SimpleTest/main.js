
const youtubeConfig = {
    "src":"aRgqQe-8zYk",
    "id":"hypervideo_youtube",
    "type": Hypervideo.YOUTUBE_TYPE,
    "videoTitle": "Hypervideo from youtube",
    "size": {
        "width": 640,
        "height": 360
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
            "color": "#fc9403",
            "plugin": {
                "name": "SimpleLabel",
                "config": {
                    "text": "Hi! I'm a label! <a href=\"https://www.google.es\"> Also anchor links</a>"
                }
            }
        },
        {
            "position": {
                "x": 80,
                "y": 60
            },
            "timeConfig": {
                "timestamp": 2,
                "duration": 10
            },
            "color": "#fc9403",
            "plugin": {
                "name": "Questionary",
                "config": {
                    "title": "Is this the most awesome js library?",
                    "subtitle": "Choose the correct answer",
                    "correctAnswer": "Yeah! This is the most awesome library!",
                    "wrongAnswers": [
                      "This is a random answer!",
                      "Hi! I'm a random answer too!"
                    ]
                }
            }
        },
        {
            "position": {
                "x": 40,
                "y": 55
            },
            "timeConfig": {
                "timestamp": 4,
                "duration": 10
            },
            "color": "#ffffff",
            "plugin": {
                "name": "Card",
                "config": {
                    "title": "Landscape photography",
                    "description": "When most people start out taking landscape photos, they think they need to get a wide angle lens in order to capture the whole landscape. When I bought my first DSLR, I was one of those people. I made sure I had a wide angle lens because I knew I mostly wanted to photograph landscapes from my adventures, and that’s what everyone told me I required to get the job done.",
                    "imageSrc": "./assets/nature.jpg",
                    "backgroundColor": "#F2D5A0",
                    "titleColor": "rgb(138 104 43)",
                    "descriptionColor": "rgb(138 104 43)",
                    "button": {
                      "title": "Read Post",
                      "href": "https://www.google.es", 
                      "backgroundColor": "rgb(138 104 43)",
                      "textColor": "white"
                    }
                }
            }
        }
    ]
};

const videoConfig = {
    "src":"./assets/video.mp4",
    "id":"hypervideo_file",
    "type": Hypervideo.VIDEO_TYPE,
    "videoTitle": "Hypervideo from a file",
    "size": {
        "width": 640,
        "height": 360
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
            "color": "#fc9403",
            "plugin": {
                "name": "SimpleLabel",
                "config": {
                    "text": "Hi! I'm a label! <a href=\"https://www.google.es\"> Also anchor links</a>"
                }
            }
        },
        {
            "position": {
                "x": 80,
                "y": 60
            },
            "timeConfig": {
                "timestamp": 2,
                "duration": 10
            },
            "color": "#fc9403",
            "plugin": {
                "name": "Questionary",
                "config": {
                    "title": "Is this the most awesome js library?",
                    "subtitle": "Choose the correct answer",
                    "correctAnswer": "Yeah! This is the most awesome library!",
                    "wrongAnswers": [
                      "This is a random answer!",
                      "Hi! I'm a random answer too!"
                    ]
                }
            }
        },
        {
            "position": {
                "x": 40,
                "y": 55
            },
            "timeConfig": {
                "timestamp": 4,
                "duration": 10
            },
            "color": "#ffffff",
            "plugin": {
                "name": "Card",
                "config": {
                    "title": "Landscape photography",
                    "description": "When most people start out taking landscape photos, they think they need to get a wide angle lens in order to capture the whole landscape. When I bought my first DSLR, I was one of those people. I made sure I had a wide angle lens because I knew I mostly wanted to photograph landscapes from my adventures, and that’s what everyone told me I required to get the job done.",
                    "imageSrc": "./assets/nature.jpg",
                    "backgroundColor": "#F2D5A0",
                    "titleColor": "rgb(138 104 43)",
                    "descriptionColor": "rgb(138 104 43)",
                    "button": {
                      "title": "Read Post",
                      "href": "https://www.google.es", 
                      "backgroundColor": "rgb(138 104 43)",
                      "textColor": "white"
                    }
                }
            }
        }
    ]
};

const imageConfig = {
    "src":"./assets/test_image.jpg",
    "id":"hyperimage",
    "type": Hypervideo.IMAGE_TYPE,
    "videoTitle": "Hypervideo from an image",
    "size": {
        "width": 400,
        "height": 266
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
            "color": "#fc9403",
            "plugin": {
                "name": "SimpleLabel",
                "config": {
                    "text": "Hi! I'm a label! <a href=\"https://www.google.es\"> Also anchor links</a>"
                }
            }
        },
        {
            "position": {
                "x": 80,
                "y": 60
            },
            "timeConfig": {
                "timestamp": 2,
                "duration": 10
            },
            "color": "#fc9403",
            "plugin": {
                "name": "Questionary",
                "config": {
                    "title": "Is this the most awesome js library?",
                    "subtitle": "Choose the correct answer",
                    "correctAnswer": "Yeah! This is the most awesome library!",
                    "wrongAnswers": [
                      "This is a random answer!",
                      "Hi! I'm a random answer too!"
                    ]
                }
            }
        },
        {
            "position": {
                "x": 40,
                "y": 55
            },
            "timeConfig": {
                "timestamp": 4,
                "duration": 10
            },
            "color": "#ffffff",
            "plugin": {
                "name": "Card",
                "config": {
                    "title": "Landscape photography",
                    "description": "When most people start out taking landscape photos, they think they need to get a wide angle lens in order to capture the whole landscape. When I bought my first DSLR, I was one of those people. I made sure I had a wide angle lens because I knew I mostly wanted to photograph landscapes from my adventures, and that’s what everyone told me I required to get the job done.",
                    "imageSrc": "./assets/nature.jpg",
                    "backgroundColor": "#F2D5A0",
                    "titleColor": "rgb(138 104 43)",
                    "descriptionColor": "rgb(138 104 43)",
                    "button": {
                      "title": "Read Post",
                      "href": "https://www.google.es", 
                      "backgroundColor": "rgb(138 104 43)",
                      "textColor": "white"
                    }
                }
            }
        }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    console.log(youtubeConfig)
    const youtubeHypervideo = new Hypervideo(youtubeConfig);
    const fileHypervideo = new Hypervideo(videoConfig);
    const hyperimage = new Hypervideo(imageConfig);
    youtubeHypervideo.setupHypervideo(youtubeConfig);
    fileHypervideo.setupHypervideo();
    hyperimage.setupHypervideo();
});