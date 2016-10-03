/**
 Dron module `dron-ava-es`*
*/
function installPackages() {
	return this.run('installNpmPackages', {
		devDependencies: [
			'ava',
			'babel-register',
			'babel-preset-es2015',
			'babel-preset-stage-0',
			//'babel-plugin-transform-runtime',
			'babel-plugin-espower'
		],
		save: true
	});
}

function createFiles() {
	/**
	 * Create tests directory
	 */
	this.touch('tests').mkdir();
	/**
	 * Patch .babelrc
	 */
	var babelrc = this.touch('.babelrc'),
	babelrcJson={};
	if (babelrc.exists()) {
		babelrcJson=babelrc.require();
	}
	Object.assign(babelrcJson, 
		{
		  "presets": [
		    "es2015",
		    "stage-0"
		  ],
		  "plugins": [
		    "espower"//,
		    //"transform-runtime"
		  ]
		}
	);
	babelrc.write(JSON.stringify(babelrcJson));
	return installPackages;
}

function dronAvaEs() {
	return this.run('ensurePackage')
	.then(function(package) {
		package.ava = {
		    "require": [
		      "babel-register"
		    ],
		    "babel": {
		      "presets": [
		        "es2015",
		        "stage-0"
		      ]
		    }
		};
		this.touch('package.json').write(JSON.stringify(package));
		return createFiles;
	}.bind(this))
}

module.exports = function factory(argv) {
	return dronAvaEs;
}