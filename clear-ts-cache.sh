#!/bin/bash
rm -rf ./node_modules/.cache
find . -name "*.tsbuildinfo" -delete
npm run build -- --clean
