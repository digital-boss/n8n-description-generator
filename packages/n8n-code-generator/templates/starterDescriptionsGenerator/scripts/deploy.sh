#!/usr/bin/env bash

set -e  # exit when any command fails
source scripts/.env-deploy

npm run build
output=$(npm pack)
curl -u $user:$password -T $output $host/webhook/upload-package?name=$output
rm $output
