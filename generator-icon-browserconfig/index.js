var util = require('hexo-util');

hexo.extend.generator.register('browserconfig-generator', hexo_generator_icon_browserconfig);

function hexo_generator_icon_browserconfig() {

  // Hardcode this for now

  var icons = '<?xml version="1.0" encoding="utf-8"?>' +
    '<browserconfig>' +
    '  <msapplication>' +
    '    <tile>' +
    '      <square70x70logo src="/assets/images/icons/ms-icon-70x70.png"/>' +
    '      <square150x150logo src="/assets/images/icons/ms-icon-150x150.png"/>' +
    '      <square310x310logo src="/assets/images/icons/ms-icon-310x310.png"/>' +
    '      <TileColor>#ffffff</TileColor>' +
    '    </tile>' +
    '  </msapplication>' +
    '</browserconfig>';

  return {
    path: 'browserconfig.xml',
    data: icons
  };
}