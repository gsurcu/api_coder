const generarHtmlArchivos = (files) => {
  let html = '';
  files.map((file, index) => {
    let filePath = `${file.destination.split('public/')[1]}/${file.filename}`;
    const linkHtml = `<a href="http://localhost:8080/${filePath}">${file.fieldname}-${index+1}</a><br/>`;
    html += linkHtml
  })
  return html;
}

module.exports = {
  generarHtmlArchivos,
}