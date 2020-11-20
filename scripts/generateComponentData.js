var fs = require('fs'); // comes with Node, file system reading
var path = require('path'); // comes with Node, for working with paths
var chalk = require('chalk'); // color commandline output
var parse = require('react-docgen').parse; // pull metadata out of our component's code
var chokidar = require('chokidar'); // watch files, run a function in a cross-platform way

var paths = {
  examples: path.join(__dirname, '../src', 'docs', 'examples'), // path to examples dir
  components: path.join(__dirname, '../src', 'components'), // path to component source code
  output: path.join(__dirname, '../config', 'componentData.js') // path to output metadata file
};

// check for a "--watch" flag, if it's enabled, use chokidar to watch our 
// examples dir for changes, else, just generate once
const enableWatchMode = process.argv.slice(2) == '--watch';
if (enableWatchMode) {
  // Regenerate component metadata when components or examples change.
  chokidar.watch([paths.examples, paths.components]).on('change', function(event, path) {
    generate(paths);
  });
} else {
  // Generate component metadata
  generate(paths);
}

function generate(paths) {
  var errors = [];
  // get a list of directories that are in out component's folder
  var componentData = getDirectories(paths.components).map(function(componentName) {
    try {
      return getComponentData(paths, componentName);
    } catch(error) {
      errors.push('An error occurred while attempting to generate metadata for ' + componentName + '. ' + error);
    }
  });
  // once get the array out directories data, write that output to our output file
  writeFile(paths.output, "module.exports = /* eslint-disable */ " + JSON.stringify(errors.length ? errors : componentData));
}


function getComponentData(paths, componentName) {
  // read the file and get the content out of that file
  var content = readFile(path.join(paths.components, componentName, componentName + '.js'));
  var info = parse(content); // parse comes with react-docgen
  return {
    name: componentName,
    description: info.description,
    props: info.props,
    code: content,
    examples: getExampleData(paths.examples, componentName) // store list of examples
  }
}

function getExampleData(examplesPath, componentName) {
  var examples = getExampleFiles(examplesPath, componentName);
  return examples.map(function(file) {
    var filePath = path.join(examplesPath, componentName, file);
    var content = readFile(filePath);
    var info = parse(content); // use react-docgen to get the metadata off of the examples we create
    return {
      // By convention, component name should match the filename.
      // So remove the .js extension to get the component name.
      name: file.slice(0, -3),
      description: info.description,
      code: content
    };
  });
}

function getExampleFiles(examplesPath, componentName) {
  var exampleFiles = [];
  try {
    exampleFiles = getFiles(path.join(examplesPath, componentName));
  } catch(error) {
    console.log(chalk.red(`No examples found for ${componentName}.`));
  }
  return exampleFiles;
}

function getDirectories(filepath) {
  return fs.readdirSync(filepath).filter(function(file) {
    return fs.statSync(path.join(filepath, file)).isDirectory();
  });
}

function getFiles(filepath) {
  return fs.readdirSync(filepath).filter(function(file) {
    return fs.statSync(path.join(filepath, file)).isFile();
  });
}

function writeFile(filepath, content) {
  fs.writeFile(filepath, content, function (err) {
    err ? console.log(chalk.red(err)) : console.log(chalk.green("Component data saved."));
  });
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}