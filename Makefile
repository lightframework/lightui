scp:
	@scp root@43.142.31.138:/root/code/aiops/app/sys/cmd/api/desc/sys.json ./swagger

docker-build:
	@docker build -t ccr.ccs.tencentyun.com/lightwan_ops/lightops-ui-nginx ./docker

docker-push:
	@docker push ccr.ccs.tencentyun.com/lightwan_ops/lightops-ui-nginx:latest
build:
        @rm -rf /usr/share/nginx/html/*
        @cp -r docker/dist/* /usr/share/nginx/html/
	@npm run build
push:
	@npm run build
	@docker build -t ccr.ccs.tencentyun.com/lightwan_ops/lightops-ui-nginx ./docker
	@docker push ccr.ccs.tencentyun.com/lightwan_ops/lightops-ui-nginx:latest
