#!/bin/sh

cd "$(dirname "$0")"
python build.py --include node-webgl --include extras --output node.three.js/three.js
