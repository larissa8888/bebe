song="";
estatus="";
objects=[];

function preload()
{
    song=loadSound("shrek.mp3");
}

function setup()
{
    canvas=createCanvas(380 , 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380 , 380)
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: dectectando objetos";
}

function modelLoaded()
{
    console.log("modelo cargado");
    estatus= true ;
  }


function draw()
{
    image(video, 0, 0 ,380, 380);

    if(estatus!="")
    {

        r= random(255);
        g=random(255);
        b=random(255);
          objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: objeto detectado";
            document.getElementById("number_of_objects").innerHTML = "número de objetos detectados:" + objects.length;


            fill(r, g, b);
            porcent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + porcent + "%" , objects[i].x , objects[i].y );

            noFill();
            stroke(r, g, b)
            rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "Se encontró el bebé";
                song.stop();

            }else
            {
                document.getElementById("number_of_objects").innerHTML = "No se encontró el bebé";
                song.play();

            }
            
        }
        if(objects.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "No se encontró el bebé";
            song.play();
        }
    }

}

function gotResult(error, results)
{
 if(error)
 {
    console.error(error)
 }
 console.log(results);

 objects=results ;
}