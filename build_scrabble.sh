#!/usr/bin/env bash

DIR="$(dirname $0)"
BUILD_DIR="$DIR/src/scrabble/dist";
TARGET_DIR="$DIR/scrabble";

if [[ "$1" == "--prod" ]]; then
  PROD=1;
  echo "building scrabble... (PROD)";
else
  echo "building scrabble...";
fi

# check build dir exists
if [[ ! -d $BUILD_DIR ]]; then
  echo "Error: '$BUILD_DIR' does not exist (has scrabble been built?)";
  exit 1;
fi

# delete target dir if exists
if [[ -d $TARGET_DIR ]]; then
  rm -r $TARGET_DIR;
  echo "cleared $TARGET_DIR";
fi

# copy
cp -r $BUILD_DIR $TARGET_DIR;

# process index.html
INDEX_FILE="$TARGET_DIR/index.html";
if [[ -e $INDEX_FILE ]]; then
  sed -i 's/\/assets\//\/scrabble\/assets\//g' $INDEX_FILE;
  sed -i 's/\/favicon.ico/.\/favicon.ico/g' $INDEX_FILE
  echo "processed $INDEX_FILE";
else
  echo "Warning: $INDEX_FILE does not exist";
fi

# process js files
if [[ -z $PROD ]]; then
  for TARGET_FILE in $TARGET_DIR/assets/index-*.js; do
    sed -i 's/\/assets\//\/scrabble\/assets\//g' $TARGET_FILE;
    echo "processed $TARGET_FILE";
  done;
fi;

echo "done";
