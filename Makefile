sdk:
	node ./scripts/build-sdk/index.js
	cd service-client && npm run build

doc:
	# docs はmakeの予約語なため doc にしています。
	node ./scripts/build-docs/index.js

deploy:
	sam build
	sam deploy
	say デプロイが完了しました