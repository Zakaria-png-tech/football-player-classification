Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        // Removed dictDefaultMessage to rely on the HTML content
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        // let imageData = file.dataURL; // Not needed, file.dataURL is used directly below
        
        // var url = "http://127.0.0.1:5000/classify_image";
        var url = "api/classify_image"
        $.post(url, {
            image_data: file.dataURL
        },function(data, status) {
            
            console.log(data);
            
            // If the server returns no data (classification failure)
            if (!data || data.length==0) {
                $("#resultHolder").hide();
                $("#divClassTable").hide();         
                $("#error").show();
                
                // Signal failure to Dropzone and remove the file
                dz.emit("error", file, "Can't classify image. Classifier was not able to detect face and two eyes properly.");
                dz.removeFile(file);
                return;
            }
            
            // Removed the redundant 'players' array
            
            let match = null;
            let bestScore = -1;
            for (let i=0;i<data.length;++i) {
                let maxScoreForThisClass = Math.max(...data[i].class_probability);
                if(maxScoreForThisClass>bestScore) {
                    match = data[i];
                    bestScore = maxScoreForThisClass;
                }
            }
            
            if (match) {
                $("#error").hide();
                $("#resultHolder").show();
                $("#divClassTable").show();
                
                // *** FIX 1: Clean the class name (replace spaces with underscores) for the data-player lookup ***
                let matchClassName = match.class.replace(/ /g, '_');
                $("#resultHolder").html($(`[data-player="${matchClassName}"`).html());
                
                let classDictionary = match.class_dictionary;
                for(let personName in classDictionary) {
                    let index = classDictionary[personName];
                    
                    // Format the score to two decimal places
                    let proabilityScore = match.class_probability[index].toFixed(2);
                    
                    // *** FIX 2: Clean the person name (replace spaces with underscores) for the score table ID lookup ***
                    let cleanPersonName = personName.replace(/ /g, '_');
                    
                    let elementName = "#score_" + cleanPersonName;
                    $(elementName).html(proabilityScore);
                }

                // *** FIX 3: Manually signal success to Dropzone and remove the file to clear the "0 code" message ***
                dz.emit("success", file, data);
                dz.removeFile(file); 
            }
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();     
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});