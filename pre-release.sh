#!/bin/bash

# Set the folders where you want to search for HTML files
folders_to_search=("./articles" "./essay")
timestamp=$(date +%s)

for folder in "${folders_to_search[@]}"; do
  find "$folder" -type f -name "*.html" | while read -r file; do
    sed -i "" "s/\(jan_v=\)[^&\"]*/\1$timestamp/g" "$file"
    echo "Set 'jan_v' parameter in $file to timestamp $timestamp"
  done
done
echo "Set 'jan_v' parameter in index.html to timestamp $timestamp"
sed -i "" "s/\(jan_v=\)[^&\"]*/\1$timestamp/g" "./index.html"

node sitemap-generator.js
