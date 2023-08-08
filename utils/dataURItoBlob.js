export default function dataURItoBlob(dataURI) {
  //conver base64/URL encoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  //separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  //write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}
// export default function dataURItoBlob(dataURI) {
// // Get the base64/URL encoded data component and convert it to raw binary data held in a string
// const byteString = atob(dataURI.split(',')[1]);

// // Extract the MIME type from the data URI
// const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

// // Convert the byte string into an ArrayBuffer
// const byteArray = new Uint8Array(byteString.length);
// for (let i = 0; i < byteString.length; i++) {
// byteArray[i] = byteString.charCodeAt(i);
// }

// // Create a new blob object using the ArrayBuffer
// return new Blob([byteArray], { type: mimeString });
// }
