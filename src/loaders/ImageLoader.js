/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ImageLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.ImageLoader.prototype = {

	constructor: THREE.ImageLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var cached = THREE.Cache.get( url );

		if ( cached !== undefined ) {

			onLoad( cached );
			return;

		}

		var image = new WebGL.Image();

		image.onload = function ( event ) {

			THREE.Cache.add( url, this );

			if ( onLoad ) onLoad( this );
			
			scope.manager.itemEnd( url );

		};

		// TODO: all these are not supported in node-webgl

		// if ( onProgress !== undefined ) {

		// 	image.addEventListener( 'progress', function ( event ) {

		// 		onProgress( event );

		// 	}, false );

		// }

		// if ( onError !== undefined ) {

		// 	image.onerror = function ( event ) {

		// 		onError( event );

		// 	};

		// }

		image.src = url;

		scope.manager.itemStart( url );

		return image;

	},

	setCrossOrigin: function ( value ) {

		// Is meaningless in node-webgl

	}

}
