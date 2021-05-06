<p align="center">
  <img width="307" height="192" src="https://github.com/Aleix88/Hypervideos/blob/main/readme-assets/hypervideos_header.png?raw=true">
</p>

------------

## Documentation
- [What is hypervideos.js?](#what-is-hypervideosjs)
- [How to use Hypervideos.js](#how-to-use-hypervideosjs)
- [Existing plugins list](#plugins-list)
- [Create your own plugin](#create-your-own-plugin)
- [Code style guide](#code-style-guide)
- [See the examples](#examples)
- [Hiper: Hypervideos graphical interface](#hiper-hypervideos-graphical-interface)

### What is Hypervideos.js?
Hypervideos.js is an easy way to create interactive videos and images for your website in a very simple way. You will be able to add diferent interactive elements in a given timestamp of the video. See the [examples](#examples) to a better undestanding of the concept.
Is compatible with video/images files and YouTube videos.

### How to use Hypervideos.js
Hypervideos is very easy to use. First of all download the hypervideo.min.js (is located in the distri directory) file and import it to your HTML. Here you can also import all the plugins that you will use ([check out the existing plugins](#plugins-list) or [create your own](#create-your-own-plugin)).
You should also create and import a JS file to setup your Hypervideo.

    <head>
            <script src="./hypervideo.min.js"></script>
            <script src="./SimpleLabel.js"></script> //This is a Plugin
            <script src="./main.js"></script>
    </head>


Next add a `<div>` in your html page. You should provide the div with the class "hypervideo" and some unique identifier.

    <div id="hypervideo_id" class="hypervideo"></div>

On your main.js file create a object to setup your Hypervideo parameters. The admited parameters are the following ones:

| Field | Type | Description |
| ------------- | ------------- | ------------- |
| id | string | Id of the `<div>` element on your HTML |
| src | string | Path to the image or video file. If is a video from YouTube provide the video identifier located on the video URL |
| type | string | Type of the media loaded. There are 3 possible types:<br/>**Hypervideo.VIDEO_TYPE** - for video files.<br/>**Hypervideo.IMAGE_TYPE** - for image files.<br/>**Hypervideo.YOUTUBE_TYPE** - for YouTube videos.<br/>
| videoTitle | string  | Title for the hypervideo  |
| size  | object  | Size of the hypervideo. Contains two fields:<br /> **width (number)** - Width in pixels.<br /> **height (number)** - Height in pixels.<br /> If the source provided is a video the size should have an aspect ratio of 16:9, if the ratio is not met, the video will be resized to match it.  |
| tags (OPTIONAL)| array of objects  | Each tag represents a "button" that will activate the interactive element. You can add as many tags as you want. Every tag is represented as an object, its fields are presented on the table below. |

Tags configuration object:

| Field | Type | Description |
| ------------- | ------------- | ------------- |
| position | object  | Position of the tag in the video/image. Contains two fields:<br /> **x (number)** - position x in % relative to the hypervideo container.<br /> **y (number)** - position y in %.  |
| timeConfig | object  | All the time parameters of the tag (*Ignore for images*). Contains two fields:<br/> **timestamp (number)** - time in seconds when the tag should appear.<br/> **duration (number)** - time in seconds of the tag duration on the video.   |
| color | string  | Color of the tag in hex format.  |
| plugin | object  | Configuration of the plugin that represents the interactive element in this tag. *In order to use a plugin you need to imported first.* Contains two fields: <br/>**name (string)** - class name of the plugin. <br/>**config** - configuration of the plugin. Check out the plugin documentation to use this field if needed.|

Configuration example:

    const config = {
        "src":"./assets/test_video.mp4",
        "id":"hypervideo_id",
        "type": Hypervideo.VIDEO_TYPE,
        "videoTitle": "My first hypervideo",
        "size": {
          "width": 200,
          "height": 200
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
                    "text": "Hi! I'm a label!"
                }
            }
          }
        ]
      };

Finally instantiate the Hypervideo class and call setupHypervideo function:

    document.addEventListener("DOMContentLoaded", () => {
    	const hypervideo = new Hypervideo(config);
    	hypervideo.setupHypervideo();
    })

Enjoy your Hypervideo!

## Plugins list
Plugins are the responsable of creating the interactive element when the user interact with a tag. You can create your own plugin or use one of this list:
- SimpleLabel - https://github.com/Aleix88/Hypervideo-SimpleLabel 
- Card - https://github.com/Aleix88/Hypervideo-Card
- Questionary - https://github.com/Aleix88/Hypervideo-Questionary
- Decision - https://github.com/Aleix88/Hypervideo-Decision

## Create your own plugin
You can also create your on plugins. To do this create a JS class with your Plugin name. The class should extend from Plugin (this class is imported with the Hypervideo.min.js).
The constructor of Plugin is empty so there's no need to overwrite it.

The plugin class has differents attributes that you can use (after onLoad method is called):

| Attribute | Type | Description |
| ------------- | ------------- | ------------- |
| config | object | Data that comes from the hypervideo configuration object. You can use this field to pass data from the main JS file. |
| container | HTMLElement | This element is the hypervideo container. You should only add your views here if they are smaller than the video size or if you want the user to activate other tags while this is also activated. |
| elementsContainer | HTMLElement | This element is the hypervideo elements container. This container is unique for this tag and it will fit all the browser screen. Users will not be able to interact with other elements if this container is active. |
| videoManager | object | Instance of the video controller. You can use the following functions: <br/> - play(void) <br/> - pause(void) <br/> - restartVideo(void) <br/> - isVideoPlaying(void) : bool <br/> - getVideoDuration(void) : Returns the duration in seconds <br/> - loadProgress(Number) - Load any part of the video by a given progress. Progress should be specified between 0 and 1. <br/> - seekTo(Number) - Load any time of the video. Time should be in seconds. <br/> - setVolume(Number) - Volume should be specified between 0 and 1.<br/>You can also get the video currentTime as an attribute. <br/> **This object will be null for images* |

The Plugin class has some methods that you could overrwrite (always calling super) to implement your plugin functionalities or call:

| Method | Parameters | Description |
| ------------- | ------------- | ------------- |
| onLoad | config, container, elementsContainer, videoManager | This function is called when the plugin and it's atributes are loaded. In this function you should create and setup all your views, but don't show them to the user yet, wait for an interaction with the tag. |
| tagWillAppear | void | This function is called when the tag is going to appear in the screen. |
| tagWillDisappear | void | This function is called when the tag is going to disappear from the screen. |
| onTagClick | event | This function is called when the user clicks on the tag. This may be a good place to show your views to the user. |
| onTagHover | event | This function is called when the user hovers on the tag. |
| onTagLeave | event | This function is called when the users move the cursor outside the tag. |
| fullScreenStateChanged | `true` if the video/image is now in fullscreen mode, `false` if is not in full screen | This function is called when video enters or exit the full screen mode. |
| showElementsContainer | void | DO NOT OVERWRITE THIS METHOD. You can call this method whenever you need to show the elements container. |
| hideElementsContainer | void | DO NOT OVERWRITE THIS METHOD. You can call this method whenever you need to hide the elements container. |

## Code style guide
In order to keep the code clean, the following guidelines must be followed:

1 - Each code statement must end in a semicolon.<br/>
2 - Private functions names must start with two lower bars. Ex: __myPrivateFunction().  

## Examples
Check out this example: https://aleix88.github.io/Hypervideos-example/

## Hiper: Hypervideos graphical interface
If you are not a programmer but you want to use this library check out Hiper, a multi-platform program to generate the Hypervideo code. - https://github.com/Aleix88/Hiper

# Team
The main development team is associated to Aleix Díaz's TFG and GRETEL Research Group, associated to [La Salle Campus Barcelona](https://www.salleurl.edu/en).
- Dr. Daniel Amo Filvà: daniel.amo@salle.url.edu - [Github](https://github.com/danielamof/)
- Aleix Díaz: aleix.diaz@students.salle.url.edu - [Github](https://github.com/Aleix88)

