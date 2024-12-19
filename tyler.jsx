(function () {
  var columns = prompt("Enter the number of tiles horizontally:", "3");
  var rows = prompt("Enter the number of tiles vertically:", "3");

  columns = parseInt(columns);
  rows = parseInt(rows);

  if (isNaN(columns) || isNaN(rows) || columns <= 0 || rows <= 0) {
    alert("Please enter valid positive numbers for columns and rows.");
    return;
  }

  var doc = app.activeDocument;
  var layer = doc.activeLayer;

  var originalLayer = layer.duplicate();

  var bounds = originalLayer.bounds;
  var layerWidth = bounds[2].as("px") - bounds[0].as("px"); // Right - Left in pixels
  var layerHeight = bounds[3].as("px") - bounds[1].as("px"); // Bottom - Top in pixels

  var scaleX = 100 / columns;
  var scaleY = 100 / rows;

  originalLayer.translate(-bounds[0].as("px"), -bounds[1].as("px"));

  originalLayer.resize(scaleX, scaleY, AnchorPosition.TOPLEFT);

  var layers = [originalLayer];
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < columns; col++) {
      if (row === 0 && col === 0) continue; // Skip the original layer

      var newLayer = originalLayer.duplicate();

      var offsetX = col * (layerWidth / columns - 4);
      var offsetY = row * (layerHeight / rows - 4);

      newLayer.translate(offsetX, offsetY);

      layers.push(newLayer);
    }
  }

  for (var i = layers.length - 1; i > 0; i--) {
    layers[i].merge();
  }

  alert("Tiles created with overlap, scaled, and merged successfully!");
})();
