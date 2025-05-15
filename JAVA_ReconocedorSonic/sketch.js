let videoSonic
let videoSuperSonic
let videoShadow
let bandera = 0
// Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = './model/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(620, 260);
    // videos extra
  videoSonic = createVideo("./images/Sonic.mp4");
  videoSonic.hide()
  videoSonic.loop()


  videoSuperSonic = createVideo("./images/SuperSonic.mp4");
  videoSuperSonic.hide()
  videoSuperSonic.loop()

  videoShadow = createVideo("./images/Shadow.mp4");
  videoShadow.hide()
  videoShadow.loop()

    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2-150, height - 4);

    if (label=='Sonic The Hedgehog') {
      text("Sonic The Hedgehog es un heroe indomable el cual ama la velocidad y los Chilidogs, constantemente se encuentra enfrentando al Dr. Eggman y demas entidades que amenacen la integridad del planeta y de los que ama.", width/2+30 , height/2-125,280);
      image(videoSonic,  width/2+90, height/2+15, 150, 110);
      if (bandera!=1) {
      videoSonic.play()
      videoShadow.stop()
      videoSuperSonic.stop()
      bandera=1
      }
    } else if (label=='Super Sonic') {
       text("Super Sonic es el estado al que accede Sonic cuando transforma su voluntad en deseo al utilizar las 7 esmeraldas del caos, usualmente solo hace uso de este poder cuando la amenaza es demasiado grande.", width/2+40 , height/2-125,250);
      image(videoSuperSonic, width/2+90, height/2+15, 150, 110);
      if (bandera!=2) {
      videoSuperSonic.play()
      videoSonic.stop()
      videoShadow.stop()
      bandera=2
      }
      } else if (label=='Shadow The Hedgehog') {
      text("Shadow The Hedgehog es un ser solitario el cual solia vivir constantemente atormentado por su pasado, hasta que decidio aceptarlo y convertirse en alguien mas fuerte que vivira por los que ya no estan aqui.", width/2+40, height/2-125,250);
      image(videoShadow, width/2+90, height/2+15, 150, 110);
      if (bandera!=3) {
      videoShadow.play()
      videoSuperSonic.stop()
      videoSonic.stop() 
      bandera=3
      }
    }
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }

