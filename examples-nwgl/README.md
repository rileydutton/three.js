THREE.js Examples for node-webgl
================================

This folder contains some examples of three.js + node-webgl, for building desktop apps using a popular js 3D library.

For now, as there is no distinct node.three.js package, you should link it here manually (from root folder):

```shell
cd utils/build/node.three.js
npm install
npm link
cd ../../../examples-nwgl/
npm link node.three.js
```

And run any example:

`node example-light-hemisphere.js`

Thanks @mrdoob for such a great work on this library!