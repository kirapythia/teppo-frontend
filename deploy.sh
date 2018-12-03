#!/bin/bash

set -euo pipefail

ENV="${1:-dev}"

echo "Environment: $ENV"

# Build frontend
npm install
npm run build

# Copy files to S3 bucket
aws s3 sync build s3://teppo-static-${ENV}/ \
  --acl public-read \
  --profile voltti-${ENV}
