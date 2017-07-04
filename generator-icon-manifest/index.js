var util = require('hexo-util');

hexo.extend.generator.register('manifest-generator', hexo_generator_icon_manifest);

function hexo_generator_icon_manifest(site) {

  // Hardcode this for now

  var icons = {
    'name': 'App',
    'icons': [
      {
        'src': '/assets/images/icons/android-icon-36x36.png',
        'sizes': '36x36',
        'type': 'image/png',
        'density': '0.75'
      },
      {
        'src': '/assets/images/icons/android-icon-48x48.png',
        'sizes': '48x48',
        'type': 'image/png',
        'density': '1.0'
      },
      {
        'src': '/assets/images/icons/android-icon-72x72.png',
        'sizes': '72x72',
        'type': 'image/png',
        'density': '1.5'
      },
      {
        'src': '/assets/images/icons/android-icon-96x96.png',
        'sizes': '96x96',
        'type': 'image/png',
        'density': '2.0'
      },
      {
        'src': '/assets/images/icons/android-icon-144x144.png',
        'sizes': '144x144',
        'type': 'image/png',
        'density': '3.0'
      },
      {
        'src': '/assets/images/icons/android-icon-192x192.png',
        'sizes': '192x192',
        'type': 'image/png',
        'density': '4.0'
      }
    ]
  };

  return {
    path: 'manifest.json',
    data: JSON.stringify(icons, null, '  ')
  };
}