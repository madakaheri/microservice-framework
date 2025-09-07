sdk:
	node ./scripts/build-sdk/index.js
	cd service-client && npm run build

deploy:
	sam build
	sam deploy
	say デプロイが完了しました