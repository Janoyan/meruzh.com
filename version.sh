#!/bin/bash

# Set the folder where you want to search for HTML files
folder_to_search="./articles"
timestamp=$(date +%s)
find "$folder_to_search" -type f -name "*.html" | while read -r file; do
  sed -i "" "s/\(jan_v=\)[^&\"]*/\1$timestamp/g" "$file"
  echo "Set 'jan_v' parameter in $file to timestamp $timestamp"
done
echo "Set 'jan_v' parameter in index.html to timestamp $timestamp"
sed -i "" "s/\(jan_v=\)[^&\"]*/\1$timestamp/g" "./index.html"
