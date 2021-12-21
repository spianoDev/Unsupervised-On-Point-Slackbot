######
# Send notification messages to a Slack channel by using Slack webhook
#
# input parameters:
#   $1 - message level: 'INFO' | 'WARN' | 'ERROR'
#   $2 - pretext
#   $3 - main text
######
#export $(grep SLACK_WEBHOOK_URL .env | xargs)

ENV_URL=$(grep SLACK_WEBHOOK_URL .env)
SLACK_WEBHOOK_URL=(${ENV_URL//=/ })
SLACK_CHANNEL='alerts'

send_notification() {
  local color='good'
  if [ $1 == 'ERROR' ]; then
    color='danger'
  elif [ $1 == 'WARN' ]; then
    color='warning'
  fi
  local message="payload={\"channel\": \"#$SLACK_CHANNEL\",\"attachments\":[{\"pretext\":\"$2\",\"text\":\"$3\",\"color\":\"$color\"}]}"

  curl -X POST --data-urlencode "$message" ${SLACK_WEBHOOK_URL[1]}
}

## sample call of this notification

send_notification 'WARN' "Possible Problem" "Go check the GitHub Action for mistakes..."
