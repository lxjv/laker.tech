#!/usr/bin/env bash

SUBCMD=$1
OPTION=$2
SLUG=$3

POST_DIR="src/content/blog/"

echo "Zeppelin v3.0.0"

if [ -z "$SUBCMD" ]; then
    SUBCMD=$(gum choose "post" "deploy" "quit") || echo "gum broke or not installed"
fi

if [[ $SUBCMD == "post" ]]; then
    if [ -z "$OPTION" ]; then
        OPTION=$(gum choose "new" "edit" "stats" "quit") || echo "gum broke or not installed"
    fi

    if [[ $OPTION == "new" ]]; then
	    echo "Creating a new post"

	    POST_SLUG=$(gum input --placeholder "post slug") || echo "gum broke or not installed"

    	cp ./src/cdn/template/post.md "$POST_DIR"/"$(date +"%Y")"/"$SLUG".md

	$EDITOR "$POST_DIR"/"$(date +"%Y")"/"$SLUG".md

    elif [[ $OPTION == "edit" ]]; then
	    EDIT_THIS=$(gum file $POST_DIR) || echo "gum broke or not installed"
	    $EDITOR "$EDIT_THIS"

    elif [[ $OPTION == "stats" ]]; then
	    echo "zeppelin stats"

	    POST_COUNT=$(find "$POST_DIR"/**.md | wc -l | tr -d ' ')

	    echo "There are $POST_COUNT posts!"
    else

    echo "error: most likely you escaped out of selecting an option"
    exit 1
    fi

elif [[ $SUBCMD == "deploy" ]]; then
   /opt/sites/laker.tech/deploy.sh

elif [[ $SUBCMD == "rollback" ]]; then
   /opt/sites/laker.tech/deploy.sh rollback

else
    echo quitting!
fi
