#!/usr/bin/env bash

SUBCMD=$1
OPTION=$2
POST_DIR="src/content/blog"

echo "Zeppelin v3.0.0"

posts () {
    if [ -z "$OPTION" ]; then 
        OPTION=$(gum choose "new" "edit" "stats" "quit")
    fi

    if [[ $OPTION == "new" ]]; then
	    echo "Creating a new post"
	    POST_SLUG=$(gum input --placeholder "post slug") || echo "gum broke or not installed"
    	cp ./assets/text/templates/post.md $POST_DIR/$(date +"%Y")/$POST_SLUG.md
	    $EDITOR $POST_DIR/"$(date +"%Y")"/$POST_SLUG.md

    elif [[ $OPTION == "stats" ]]; then
	    POST_COUNT=$(find "$POST_DIR"/**.md | wc -l | tr -d ' ')
	    echo "There are $POST_COUNT posts!"
    else
        exit 1
    fi
}

if [ -z "$SUBCMD" ]; then
    SUBCMD=$(gum choose "post" "deploy" "quit") || echo "gum broke or not installed"
fi

if [[ $SUBCMD == "post" ]]; then
    posts

elif [[ $SUBCMD == "deploy" ]]; then
   /opt/sites/laker.tech/deploy.sh

elif [[ $SUBCMD == "rollback" ]]; then
   /opt/sites/laker.tech/deploy.sh rollback

else
    echo quitting!
fi
