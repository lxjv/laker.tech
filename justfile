# build site
build:
  echo "Now building Zeppelin!"
  npx @11ty/eleventy

# start 11ty dev server
start:
  echo "Starting Zeppelin's dev server now!"
  ELEVENTY_ENV=dev npx @11ty/eleventy --serve

# delete public/ and start 11ty dev server
purge:
  echo "Purging build folder and starting Zeppelin's dev server!"
  rm -rf ./public
  ELEVENTY_ENV=dev npx @11ty/eleventy --serve

# prints 11ty's debug info but doesnt build
debug:
  DEBUG=Eleventy* npx @11ty/eleventy --dryrun

# deploy to eclipse
deploy:
  ssh eclipse /opt/sites/laker.tech/deploy.sh

