ASCIIDOCTOR = docker run -ti --rm -v "$(shell pwd):/documents/" asciidoctor/docker-asciidoctor asciidoctor

generate:
	${ASCIIDOCTOR} -a iconfont-name=fab resume.adoc
	cp resume.html ../index.html
