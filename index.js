var PATTERN = /\{\{[ ]*ID(?::([^ }]+))?[ ]*\}\}/g;


export default function replaceIds(template, generator) {

  var next = wrapCaching(wrapGenerator(generator));

  return template.replace(PATTERN, function(_, name) {
    return next(name);
  });
}


// helpers ///////////////////////

function wrapCaching(next) {

  var cache = {};

  return function(name) {

    if (!name) {
      return next();
    }

    if (name in cache) {
      return cache[name];
    } else {
      return (cache[name] = next());
    }
  };
}

function wrapGenerator(generator) {

  if (typeof generator === 'function') {
    return generator;
  }

  if (typeof generator.next === 'function') {
    return function() {
      return generator.next();
    };
  }

  throw new Error('unsupported generator');
}