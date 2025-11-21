<?php 
session_start ();
include("config.php");
include("sesionCheck.php");
ini_set("display_errors","on");
ini_set('upload_max_filesize', '5000M');
ini_set('post_max_size', '5500M');
ini_set('memory_limit', '8192M');
ini_set('max_input_time', 3600);
ini_set('max_execution_time', 3600);
set_time_limit(0);

function fSube(){
    fAlerta("fSube()");
    echo "fSube() escribio esto";
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge, chrome=1" />
    <title>Upload Your Video</title>
  </head>
  <body>

<!-- (A) UPLOAD BUTTON & FILE LIST -->
<form>
  <div id="list"></div>
  <input type="button" id="pick" value="Upload">
</form>
 
<!-- (B) LOAD PLUPLOAD FROM CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/plupload/3.1.5/plupload.full.min.js"></script>
<script>
// (C) INITIALIZE UPLOADER
window.onload = () => {
  // (C1) GET HTML FILE LIST
  var list = document.getElementById("list");
 
  // (C2) INIT PLUPLOAD
  var uploader = new plupload.Uploader({
    runtimes: "html5",
    browse_button: "pick",
    url: "2b-chunk.php",
    chunk_size: "10mb",
    init: {
      PostInit: () => { list.innerHTML = "<div>Ready</div>"; },
      FilesAdded: (up, files) => {
        plupload.each(files, (file) => {
          let row = document.createElement("div");
          row.id = file.id;
          row.innerHTML = `${file.name} (${plupload.formatSize(file.size)}) <strong></strong>`;
          list.appendChild(row);
        });
        uploader.start();
      },
      UploadProgress: (up, file) => {
        document.querySelector(`#${file.id} strong`).innerHTML = `${file.percent}%`;
      },
      Error: (up, err) => console.error(err)
    }
  });
  uploader.init();
};
</script>
  </body>
</html>