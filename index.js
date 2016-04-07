var fs = require('fs')
  , oco = require('opencolor')
  , acoConverter = require('./aco.js')
  , lessConverter = require('./less.js')
  ;


var materialDesignConfig = {
    colorNameProcessor: function(colorName) {
      if(colorName.indexOf(' - Primary') !== -1) {
        colorName = colorName.replace(' - Primary', '');
      } 
      var nameParts = colorName.split(" ");
      var groupName = nameParts.slice(0, nameParts.length -1).join(" ");
      console.log(groupName);
      colorName = nameParts[nameParts.length - 1];
      return {
        colorName: colorName,
        groupName: groupName
      }
    }
  };

var acoPalette = acoConverter(fs.readFileSync('Material Palette.aco'), materialDesignConfig);
var ocoStringOfAco = oco.render(acoPalette);

fs.writeFileSync('Material Palette.oco', ocoStringOfAco, 'utf-8');

var lessPalette = lessConverter(fs.readFileSync('bootstrap-variables.less', 'utf-8'));
var ocoStringOfLess = oco.render(lessPalette);

fs.writeFileSync('bootstrap-variables.oco', ocoStringOfLess, 'utf-8');