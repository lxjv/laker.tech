#!/usr/bin/env bash

SUBCMD=$1
OPTION=$2
POST_DIR="src/content/blog"

editorselect() { # handler for choosing an editor
	EDIT_UNF=$(gum choose "nvim" "code" "emacs" "hx")
	if [[ $EDIT_UNF == "code" ]]; then
		EDIT="code -r"
	elif [[ $EDIT_UNF == "emacs" ]]; then
		echo "lol no"
		exit 1
	else
		EDIT="$EDIT_UNF"
	fi
	$EDIT "$1"
}

postnew() {
	POST_SLUG=$(gum input --placeholder "post slug")
	if [ -z $POST_SLUG ]; then
		gum log --level error "Invalid / null input"
		exit 1
	fi

    cp ./assets/text/templates/post.md $POST_DIR/"$(date +"%Y")"/"$POST_SLUG.md"
	gum confirm "edit now?" && editorselect $POST_DIR/"$(date +"%Y")"/"$POST_SLUG.md"
}

poststats() {
	POST_COUNT=$(find $POST_DIR -type f -name "*.md" | wc -l | tr -d ' ')
    gum style \
	--border-foreground 212 --border double \
	--align center --width 25 --margin "1 2" --padding "1 1" \
	"There are $POST_COUNT posts!"
}

deploy() {
	if [[ $HOSTNAME == "eclipse" ]]; then
		just deploy
	elif [[ $HOSTNAME == "Aestrea.local" ]]; then
		echo "sshing to eclipse"
		ssh eclipse /opt/sites/laker.tech/deploy.sh
	else
		echo "nice try ;)"
	fi	
}

if [ -z "$SUBCMD" ]; then
    SUBCMD_FMT=$(gum choose "Create a new post" "Show post stats" "Deploy to Eclipse" "quit") || echo "gum broke or not installed"
	if [[ $SUBCMD_FMT == "Create a new post" ]]; then
		SUBCMD=post
	elif [[ $SUBCMD_FMT == "Show post stats" ]]; then
		SUBCMD=stats
	elif [[ $SUBCMD_FMT == "Deploy to Eclipse" ]]; then
		SUBCMD=deploy
	fi
fi

if [[ $SUBCMD == "post" ]]; then
    postnew
elif [[ $SUBCMD == "stats" ]]; then
	poststats
elif [[ $SUBCMD == "deploy" ]]; then
	deploy
else
    gum log --level error "Invalid / no input"
fi
